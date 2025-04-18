const express = require('express');
const controllers = require('../controllers/contollers');

const router = express.Router();

// router.get('/', (req, res) => {
//   res.send('Hello World!');
// });

router.get('/users', controllers.getTopUsers);

router.get('/posts', controllers.getPosts);

module.exports = router;