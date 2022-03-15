const mariadb = require('mariadb');
const express = require('express');
const app = express(); //Create Express Application on the app variable
const bodyParser = require('body-parser');
require('dotenv').config();

// middleware

app.use(express.json());
app.use(express.urlencoded({extended:false}));

//  routes

app.get('/', (req, res) => {
  res.status(200).send('creating an api')
});

// const userRouter = require('./routes/user');
// app.use('/user', userRouter);


// //PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}..`));

