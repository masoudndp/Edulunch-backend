import express from "express";
import mongorito from "mongorito";
import bodyParser from "body-parser";
import * as Menu from "./controllers/menu.js";
import * as Restaurant from "./controllers/restaurant.js";
import {basicAuth} from "./authMidware.js";
import {user,pass} from "./config.js"

const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//allow cross-origin resource sharing
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.route('/restaurants')
.get(Restaurant.fetch)
.post(basicAuth(user, pass), Restaurant.create);

app.route('/restaurants/menus/:date')
.get(Menu.search)
.post(sendStatus(403));

app.route('/restaurants/:restaurantId/menu')
.get(Menu.fetch)
.post(basicAuth(user, pass), Menu.update);

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
  console.log('Cannot connect to database.');
});
