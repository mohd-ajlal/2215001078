const axios = require('axios');

const BASE_URL = 'http://20.244.56.144/evaluation-service'; 

const AUTH_CREDENTIALS = {
    clientID: process.env.AUTH_CLIENT_ID,
    clientSecret: process.env.AUTH_CLIENT_SECRET,
    email: process.env.AUTH_EMAIL,
    name: process.env.AUTH_NAME,
    rollNo: process.env.AUTH_ROLL_NO,
    accessCode: process.env.AUTH_ACCESS_CODE
  };
  

let authToken = null;

const apiService = {
  async getAuthToken() {
    try {
      if (authToken) {
        return authToken;
      }
      
      console.log('Attempting to get auth token...');
      const response = await axios.post(`${BASE_URL}/auth/getToken`, AUTH_CREDENTIALS);
      console.log('Auth token response:', response.data);
      authToken = response.data.access_token;
      return authToken;
    } catch (error) {
      console.error('Error getting auth token:', error.message);
      if (error.response) {
        console.error('Error details:', error.response.data);
        console.error('Status code:', error.response.status);
      }
      throw error;
    }
  },

  async fetchUsers() {
    try {
      const token = await this.getAuthToken();
      console.log('Fetching users...');
      const response = await axios.get(`${BASE_URL}/users`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data.users;
    } catch (error) {
      console.error('Error fetching users:', error.message);
      if (error.response) {
        console.error('Error details:', error.response.data);
        console.error('Status code:', error.response.status);
      }
      throw error;
    }
  },

  async fetchPostsForUser(userId) {
    try {
      const token = await this.getAuthToken();
      console.log(`Fetching posts for user ${userId}...`);
      const response = await axios.get(`${BASE_URL}/users/${userId}/posts`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data.posts;
    } catch (error) {
      console.error(`Error fetching posts for user ${userId}:`, error.message);
      if (error.response) {
        console.error('Error details:', error.response.data);
        console.error('Status code:', error.response.status);
      }
      throw error;
    }
  },

  async fetchCommentsForPost(postId) {
    try {
      const token = await this.getAuthToken();
      console.log(`Fetching comments for post ${postId}...`);
      const response = await axios.get(`${BASE_URL}/posts/${postId}/comments`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data.comments;
    } catch (error) {
      console.error(`Error fetching comments for post ${postId}:`, error.message);
      if (error.response) {
        console.error('Error details:', error.response.data);
        console.error('Status code:', error.response.status);
      }
      throw error;
    }
  }
};

const controllers = {
  async getTopUsers(req, res) {
    try {
      const startTime = Date.now();
      const users = await apiService.fetchUsers();
      
      const usersWithCommentCounts = [];
      
      for (const [userId, userName] of Object.entries(users)) {
        const posts = await apiService.fetchPostsForUser(userId);
        let totalComments = 0;
        
        for (const post of posts) {
          const comments = await apiService.fetchCommentsForPost(post.id);
          totalComments += comments.length;
        }
        
        usersWithCommentCounts.push({
          id: userId,
          name: userName,
          totalComments: totalComments,
          postCount: posts.length
        });
      }
      
      const topUsers = usersWithCommentCounts
        .sort((a, b) => b.totalComments - a.totalComments)
        .slice(0, 5);
      
      res.json({
        topUsers,
        executionTime: `${Date.now() - startTime}ms`
      });
    } catch (error) {
      console.error('Error in getTopUsers:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async getPosts(req, res) {
    try {
      const startTime = Date.now();
      const type = req.query.type || 'popular';
      
      if (type !== 'popular' && type !== 'latest') {
        return res.status(400).json({ 
          error: 'Invalid type parameter. Use "popular" or "latest".' 
        });
      }
      
      const users = await apiService.fetchUsers();
      let allPosts = [];
      
      for (const userId of Object.keys(users)) {
        const userPosts = await apiService.fetchPostsForUser(userId);
        allPosts = [...allPosts, ...userPosts];
      }
      
      if (type === 'popular') {
        let maxComments = 0;
        let postsWithCommentCounts = [];
        
        for (const post of allPosts) {
          const comments = await apiService.fetchCommentsForPost(post.id);
          const commentCount = comments.length;
          
          postsWithCommentCounts.push({
            ...post,
            commentCount,
            userName: users[post.userid]
          });
          
          if (commentCount > maxComments) {
            maxComments = commentCount;
          }
        }
        
        const mostCommentedPosts = postsWithCommentCounts
          .filter(post => post.commentCount === maxComments);
        
        res.json({
          posts: mostCommentedPosts,
          executionTime: `${Date.now() - startTime}ms`
        });
      } else {
        const latestPosts = allPosts
          .sort((a, b) => b.id - a.id)
          .slice(0, 5)
          .map(post => ({
            ...post,
            userName: users[post.userid]
          }));
        
        res.json({
          posts: latestPosts,
          executionTime: `${Date.now() - startTime}ms`
        });
      }
    } catch (error) {
      console.error('Error in getPosts:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

module.exports = controllers;
