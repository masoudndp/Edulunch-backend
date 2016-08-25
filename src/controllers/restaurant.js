import {Restaurant, WeekMenu} from "../models";

/**
 * create a new Restaurant model
 */
export async function create(req, res, next) {

  let restaurantsData = (Array.isArray(req.body))? req.body : [req.body];
  let newRestaurants = [];
  for (let i = 0; i < restaurantsData.length; i++) {
    let newRestaurant = new Restaurant(restaurantsData[i]);
    // create a new associated weeklyMenu object
    let weekMenu = new WeekMenu({
      "menuListSig" : null
    });
    await weekMenu.save();
    //attach weekMenu reference to the restaurant model
    newRestaurant.set('weekMenuId', weekMenu.get("_id"));
    // save the new restaurant
    await newRestaurant.save();
    newRestaurants.push(newRestaurant.toJSON());
  }
  res.json(newRestaurants);
}

/**
 * Fetch all restaurants
 */
export async function fetch(req, res, next) {
  let queryResponse = await Restaurant.find();
  res.json(queryResponse);
}
