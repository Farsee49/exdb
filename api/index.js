const express = require('express');
const apiRouter = express.Router();
const usersRouter = require('./users');
const postsRouter = require('./posts');
const path = require('path');


const chalk = require('chalk');


// apiRouter.use('*', (req, res, next) => {
//     console.log(chalk.redBright("Request for API: GRANTED"));
//     res.send('API: GRANTED');
//     next();
   
// });

apiRouter.use('/users', usersRouter);
apiRouter.use('/posts', postsRouter);




module.exports = apiRouter;