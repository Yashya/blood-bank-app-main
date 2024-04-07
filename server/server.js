

import mysql from 'mysql'
import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors'


//controllers
//user function handlers
import UserLoginHandler from "./controllers/user/userLoginHandler.js";
import UserRegisterHandler from './controllers/user/UserRegisterHandler.js';
import loginHandler from './controllers/bloodbank/loginHandler.js';


//employee function handlers
import EmployeeLoginHandler from './controllers/employee/EmployeeLoginHandler.js';
import EmployeeRegisterHandler from './controllers/employee/EmployeeRegisterHandler.js';
import HospitalRegisterHandler from './controllers/bloodbank/HospitalRegisterHandler.js';
import HospitalDashboardHandler from './controllers/bloodbank/HospitalDashboardHandler.js';
import FeedbackHandler from "./controllers/bloodbank/FeedbackHandler.js"


//dashboard
import DashboardHandler from './controllers/dashboard/DashboardHandler.js';
import uDashboardHandler from './controllers/user/UDashboardHandler.js';
import userRequestHandler from './controllers/user/UserRequestHandler.js';
import donateBloodHandler from './controllers/user/DonateBloodHandler.js';
import PaymentHandler from './controllers/bloodbank/PaymentHandler.js';
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
loginHandler(app,db);
//bloodbank functionalities
DashboardHandler(app, db);
FeedbackHandler(app,db);
HospitalRegisterHandler(app,db);
uDashboardHandler(app,db);
userRequestHandler(app,db);
donateBloodHandler(app,db);
PaymentHandler(app,db);
HospitalDashboardHandler(app,db);

//listening the port
app.listen(3001, (err) => {
  if (err) throw err;
  else console.log("listening to port : 3001");
});

app.get('/getUserId', (req, res) => {
  const username = req.query.username;
  const sql = "SELECT id FROM credentials WHERE username = ?";
  db.query(sql, [username], (err, result) => {
    if (err) {
      console.log(err);
      res.send({ success: false });
    } else if (result.length > 0) {
      res.send({ success: true, userId: result[0].id });
    } else {
      res.send({ success: false, message: "Username not found" });
    }
  });
});

app.get('/getCenters', (req, res) => {
  const sql = "SELECT center_id, name FROM donation_centers";
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.send({ success: false });
    } else {
      res.send({ success: true, centers: result });
    }
  });
});

