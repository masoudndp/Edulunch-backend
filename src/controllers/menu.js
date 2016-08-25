import {Restaurant, WeekMenu} from "../models";
import moment from "moment";
import {digest} from "json-hash";

/**
 * @return Menu model
 */
export async function fetch(req, res, next) {
  let restaurant = await Restaurant.findOne({"_id":req.params.restaurantId});
  const weekMenuId = restaurant.get('weekMenuId');

  let menu = await WeekMenu.findOne({"_id":weekMenuId});
  res.send(menu.toJSON());
}

/**
 * @return Menu model
 */
export async function update(req, res, next) {
  let restaurant = await Restaurant.findOne({"_id":req.params.restaurantId});
  const weekMenuId = restaurant.get('weekMenuId');

  let weekMenu = await WeekMenu.findOne({"_id":weekMenuId});
  const newSig = digest(req.body);

  //check for duplicated menu
  if (newSig !== weekMenu.get('menuListSig')){
    weekMenu.set("menus", req.body);
    weekMenu.set("menuListSig", newSig);
  }
  await weekMenu.save();
  //console.log(weekMenu);
  res.send(weekMenu.toJSON());
}

/**
 * @return list of menus for specified date
 */
export async function search(req, res, next) {
  let query = req.params
  let resturants = await Restaurant.find();
  let queryResponse = resturants.map((item,index) => {
    return {"name": item.get('name'), "menuList": []};
  });
  for (let i = 0; i < queryResponse.length; i++) {
    let menuId = resturants[i].get('weekMenuId');
    let menuDocument = await WeekMenu.findOne({"_id":menuId});
    let menus = menuDocument.get('menus');
    let menuOfDate = menus.find(menu => menu.date === query.date);
    if (menuOfDate) {
      queryResponse[i]["menuList"] = menuOfDate.menuList;
    }
  }
  queryResponse = queryResponse.filter(restaurant => restaurant.menuList.length > 0);
  res.send(JSON.stringify(queryResponse));
}
