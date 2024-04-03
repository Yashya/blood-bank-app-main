

import mysql from 'mysql'
import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors'


//controllers
//user function handlers
import UserLoginHandler from "./controllers/user/userLoginHandler.js";
import UserRegisterHandler from './controllers/user/UserRegisterHandler.js';



//employee function handlers
import EmployeeLoginHandler from './controllers/employee/EmployeeLoginHandler.js';
import EmployeeRegisterHandler from './controllers/employee/EmployeeRegisterHandler.js';
import HospitalRegisterHandler from './controllers/bloodbank/HospitalRegisterHandler.js';
import FeedbackHandler from "./controllers/bloodbank/FeedbackHandler.js"


//dashboard
import DashboardHandler from './controllers/dashboard/DashboardHandler.js';

//create the app
var app = express();

// middilewares set app to use the body-parser
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345678",
  database: "bbms1",

});

db.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

//user functionalities
UserRegisterHandler(app, db);
UserLoginHandler(app, db);

//employee functionalities
EmployeeRegisterHandler(app, db);
EmployeeLoginHandler(app, db);

//bloodbank functionalities
DashboardHandler(app, db);
FeedbackHandler(app,db);
HospitalRegisterHandler(app,db);

//listening the port
app.listen(3001, (err) => {
  if (err) throw err;
  else console.log("listening to port : 3001");
});
