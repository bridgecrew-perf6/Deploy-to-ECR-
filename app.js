const mariadb = require('mariadb');
const express = require('express');
const app = express(); //Create Express Application on the app variable
const bodyParser = require('body-parser');
require('dotenv').config();

// middleware

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//  routes

// app.get('/', (req, res) => {
//   res.status(200).send('creating an api')
// });

app.get('/user', (req, res) => {
  res.status(200).send('creating an api2')
});

//Give data to the server
const users = [
  {name: 'Foo Barrigton', id: 1},
  {name: 'Jane Doerty', id: 2},
  {name: 'John Douglas', id: 3},
  {name: 'Merryweather', id: 4},
  {name: 'Snowly', id: 5}
  ]
  
  //Read Request Handlers
  // Display the Message when the URL consist of '/'
  
  app.get('/', (req, res) => {
      res.send('creating new API!');
      });
      // Display the List Of users when URL consists of api/interns
      app.get('/api/interns', (req,res)=> {
      res.send(users);
      });
      // Display the Information Of Specific Customer when you mention the id.
      app.get('/api/interns/:id', (req, res) => {
      const newintern = users.find(c => c.id === parseInt(req.params.id));
      
      //If there is no valid users ID, then display an error with the following message
      if (!newintern) res.status(404).send('error');
      res.send(newintern);
      });
  //  creating a post request handler adding new information- to the server
      app.post('/api/interns', (req, res) => {
      const newintern = { 
           id: users.length + 1,
           name: req.body.name      
      }
      users.push(newintern);
      console.log(req.body.name);
      res.send(req.body.name)
      });
// const userRouter = require('./routes/user');
// app.use('/user', userRouter);

console.log('next to dockerize the app and push to ECR on AWS')
// //PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));
