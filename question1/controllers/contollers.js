const axios = require('axios');

const BASE_URL = 'http://20.244.56.144/evaluation-service';

const CACHE_TTL = 2 * 60 * 1000;
const cache = {
  users: {
    data: null,
    lastFetched: null
  },
  posts: {
    data: {},
    lastFetched: {}
  },
  comments: {
    data: {},
    lastFetched: {}
  }
};

function isCacheValid(lastFetched) {
  return lastFetched && (Date.now() - lastFetched) < CACHE_TTL;
}
