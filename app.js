const express = require('express');
const app = express(); //Create Express Application on the app variable
const bodyParser = require('body-parser');
const mysql = require('mysql');
require('dotenv').config();

// middleware

//Body parser library to convert JSON to javascript object
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));

// DB initiation connecting for a mySQL DB instance
const connection = mysql.createConnection({
  host: '40.113.135.20',
  user: 'root',
  password: 'password',
  database: 'userdb',
});

connection.connect((err) => {
  if (err) {
    return console.error('error: ' + err.message);
  }
  console.log('Connected to the MySQL server...');
});


// app.get('/', (req, res) => {
//   res.status(200).send('creating an api')
// });
app.get('/users', (req, res) => {
  let sql = `SELECT * FROM usertable`;

  connection.query(sql, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    res.send(results);
  });
});

// endpoint to handle post request to '/people' route
app.post('/users', (req, res) => {
  const payload = req.body;
  sql = `INSERT INTO usertable(name) VALUES ('${payload['name']}')`;
  connection.query(sql, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    } else {
      let sql = `SELECT * FROM usertable WHERE name = '${payload['name']}'`;
      connection.query(sql, (error, results, fields) => {
        if (error) {
          return console.error(error.message);
        }
        res.send(results[0]);
      });
    }
  });
});

// endpoint to handle get request to '/user/id' route
app.get('/user/:id', (req, res) => {
  let user_id = req.params.id;
  let sql = `SELECT * FROM usertable WHERE id = '${user_id}'`;
  connection.query(sql, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    res.send(results[0]);
  });
});



//Give data to the server
// const users = [
//   {name: 'Foo Barrigton', id: 1},
//   {name: 'Jane Doerty', id: 2},
//   {name: 'John Douglas', id: 3},
//   {name: 'Merryweather', id: 4},
//   {name: 'Snowly', id: 5}
//   ]
  
//   //Read Request Handlers
//   // Display the Message when the URL consist of '/'
  
//   app.get('/', (req, res) => {
//       res.send('creating new API!');
//       });
//       // Display the List Of users when URL consists of api/interns
//       app.get('/api/interns', (req,res)=> {
//       res.send(users);
//       });
//       // Display the Information Of Specific Customer when you mention the id.
//       app.get('/api/interns/:id', (req, res) => {
//       const newintern = users.find(c => c.id === parseInt(req.params.id));
      
//       //If there is no valid users ID, then display an error with the following message
//       if (!newintern) res.status(404).send('error');
//       res.send(newintern);
//       });
//   //  creating a post request handler adding new information- to the server
//       app.post('/api/interns', (req, res) => {
//       const newintern = { 
//            id: users.length + 1,
//            name: req.body.name      
//       }
//       users.push(newintern);
//       console.log(req.body.name);
//       res.send(req.body.name)
//       });
// // const userRouter = require('./routes/user');
// // app.use('/user', userRouter);

console.log('next to dockerize the app and push to ECR on AWS')

// //PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));
