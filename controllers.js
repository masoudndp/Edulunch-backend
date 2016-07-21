import {Restaurant, WeekMenu} from "./models"

// controllers for restaurant model

export async function add(req, res, next){
  const restaurantData = req.body;
  console.log(restaurantData);
  let newRestaurant = new Restaurant(restaurantData);

  // create a new associated weeklyMenu object
  let newWeeklyMenu = new WeekMenu({
    "menuListSig" : null
  });
  await newWeeklyMenu.save();

  //add weekMenu reference to the restaurant model
  newRestaurant.set('weekMenuId', newWeeklyMenu.attributes._id);

  // save the new restaurant
  await newRestaurant.save();
  res.send(newRestaurant);
  //next();
}

export async function all(req, res, next){
  let queryRes = await Restaurant.find();
  console.log(queryRes);
  res.send(queryRes);
  //res.sendStatus(200);
}

//controllers for weekMenu model

export async function getWeekMenu(req, res, next){
  let rest = await restaurant.findOne({"_id":req.params.restaurantId});
  const weekMenuId = rest.attributes.weekMenuId;

  let menu = await WeekMenu.findOne({"_id":weekMenuId});
  res.send(menu);
}

export async function updateWeekMenu(req, res, next){
  let rest = await restaurant.findOne({"_id":req.params.restaurantId});
  const weekMenuId = rest.get('weekMenuId');

  let weekMenu = await WeekMenu.findOne({"_id":weekMenuId});

  weekMenu.set("menuList", req.body);
  await weekMenu.save();
  res.send(weekMenu);
}
