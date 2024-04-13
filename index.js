

require('dotenv').config();

const express = require('express');
const server = express();
const PORT = process.env.PORT || 3795;
const path = require('path');
const cors = require('cors');
const {client} = require('./db');
const morgan = require('morgan');
const methodOverride = require('method-override');
const chalk = require('chalk');

const bodyParser = require('body-parser');
const apiRouter = require('./api');




server.set('views', path.join(__dirname, 'views'))
server.set('view engine', 'ejs')

server.use(bodyParser.json());
server.use(morgan('dev'));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(methodOverride('_method'));

// server.use('*', (req, res, next) => {
//     console.log(chalk.redBright("Request for API: GRANTED"));
//     next();
// });
server.use('/api', apiRouter);





  server.listen(PORT, () => {
    console.log(chalk.redBright(`SERVER ENGAGED ON PORT: ${chalk.yellowBright(PORT)}`))
  });

  
try{
     client.connect();
     console.log('DATABASE ONLINE!!!!')
   }catch(error){
        console.error('DATABASE OFFLINE!!!!')
};
 
server.use((req, res, next) => {
    console.log(chalk.redBright("<____Body Logger START____>"));
    console.log(chalk.magentaBright("Object:",req.body));
    console.log('URL:',req.url);
    console.log(chalk.redBright("<_____Body Logger END_____>"));
    next();
  });
