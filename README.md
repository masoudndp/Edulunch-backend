# Edulunch Api
This is the driving force behind [Edulunch](https://edulunch.fi) webApp. The API is (partially) exposed to public and can be used by any third-party app.

## Usage
API root: `https://edulunch.fi/api`

#### Query avaiable restaurants
root`/restaurants/`

root`/restaurants?city=cityName`

#### Query menus
root`/restaurants/restaurantID/menu` (weekly menu)

root`/menus/restaurantID/menus[?city=cityName+date=YYYY-MM-DD`]
