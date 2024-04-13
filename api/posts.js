const express = require('express');
const postsRouster = express.Router();

postsRouster.use('*', (req, res, next) => {
    console.log('Request for API: GRANTED');
    res.send('POSTS: GRANTED');
    next();
});





module.exports = postsRouster;