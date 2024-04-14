const express = require('express');
const usersRouter = express.Router();
const chalk = require('chalk');
const path = require('path');
const { getAllUsers, createUser, getUserById, updateUser, deleteUser } = require('../db');




usersRouter.use('*', (req, res, next) => {
    
    console.log('Request for API: GRANTED');
    // res.send('USERS: GRANTED');
   
    next();
});
// usersRouter.use((req, res, next) => {
//     console.log(chalk.redBright("<____Body Logger START____>"));
//     console.log(chalk.magentaBright("Object:",req.body));
//     console.log('URL:',req.url);
//     console.log(chalk.redBright("<_____Body Logger END_____>"));
//     next();
//   });

usersRouter.get('/', async (req, res, next) => {
    try {
        const users = await getAllUsers();
        console.log(users);
        //res.send(users); 
        res.render('users/showUsers.ejs', { users });
    } catch (error) {
        next(error);
    }
})





module.exports = usersRouter;
