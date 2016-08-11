import {Restaurant, WeekMenu} from "../models";

/**
 * create a new Restaurant model
 */
export async function create(req, res, next) {
  const restaurantData = req.body;
  let newRestaurant = new Restaurant(restaurantData);

  // create a new associated weeklyMenu object
  let weekMenu = new WeekMenu({
    "menuListSig" : null
  });
  await weekMenu.save();
  //attach weekMenu reference to the restaurant model
  newRestaurant.set('weekMenuId', weekMenu.get("_id"));

  // save the new restaurant
  await newRestaurant.save();
  res.send(newRestaurant);
  //next(); //TODO clean this!
}

/**
 * Fetch all restaurants
 */
export async function fetch(req, res, next) {
  let queryResponse = await Restaurant.find();
  res.send(queryResponse);
  //next();//TODO clean this!
}
