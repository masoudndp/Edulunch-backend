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
  res.send(menu);
}

/**
 * @return Menu model
 */
export async function update(req, res, next) {
  console.log("recieved a POST req");
  let restaurant = await Restaurant.findOne({"_id":req.params.restaurantId});
  const weekMenuId = restaurant.get('weekMenuId');

  let weekMenu = await WeekMenu.findOne({"_id":weekMenuId});
  const newSig = digest(req.body);

  //check for duplicated menu
  if (newSig !== weekMenu.get('menuListSig')){
    weekMenu.set("weekMenu", req.body);
    weekMenu.set("menuListSig", newSig);
  }
  await weekMenu.save();
  //console.log(weekMenu);
  res.send(weekMenu);
}

/**
 * @return list of menus for specified date
 */
export async function search(req, res, next) {
  let date = req.params.date;
  let resturants = await Restaurant.find();
  let queryResponse = resturants.map((item,index) => {
    return {"name": item.get('name'), "menuList": []};
  });
  for (let i = 0; i < queryResponse.length; i++) {
    let menuId = resturants[i].get('weekMenuId');
    let menuDocument = await WeekMenu.findOne({"_id":menuId});
    let weekMenuList = menuDocument.get('weekMenu'); //TODO menuList => menus
    let menuOfDate = weekMenuList.find(item => item.date === date);
    if (menuOfDate) {
      queryResponse[i]["menuList"] = menuOfDate.menuList;
    }
  }
  //queryRes = queryRes.filter(restaurant => restaurant.menuList.length > 0);
  res.send(JSON.stringify(queryResponse));
}
