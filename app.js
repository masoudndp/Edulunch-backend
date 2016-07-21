import express from "express";
import mongorito from "mongorito";
import bodyParser from "body-parser";
//import {basicAuth} from "./auth.js";

const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const resturants = require('./controllers');
app.route('/restaurants')
.get(resturants.all)
.post(resturants.add, sendStatus(200));

const controller  = require('./controllers');
app.route('/restaurants/:restaurantId/menu')
.get(controller.getWeekMenu)
.post(controller.updateWeekMenu);

function sendStatus(code){
  return function(req, res){
    res.sendStatus(code);
  }
}


mongorito.connect('localhost/appDB')
.then(
  app.listen(8080)
)
.catch(function(e){
  console.log(e);
});
