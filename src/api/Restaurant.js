import { AsyncStorage } from 'react-native'

const RESTAURANTS = 'restaurants'

export const getItems = async () => {
  let restaurants = await AsyncStorage.getItem(RESTAURANTS)
  restaurants ? restaurants = JSON.parse(restaurants) : restaurants = []
  return restaurants
}

export const setItems = (restaurants) => {
  AsyncStorage.setItem(RESTAURANTS, JSON.stringify(restaurants))
}

export const addItem = async ({
  name,
  cuisine,
  price,
  rating,
  phone,
  address,
  webSite,
  delivery
}, callback) => {
  const restaurants = await getItems()
  const newRestaurant = {
    name,
    cuisine,
    price,
    rating,
    phone,
    address,
    webSite,
    delivery,
    key: `r_${new Date().getTime()}`
  }
  restaurants.push(newRestaurant)
  setItems(restaurants)
  if (callback) callback()
}

export const deleteItem = async (key) => {
  const restaurants = await getItems()
  for (let i = 0; i < restaurants.length; i++) {
    const restaurant = restaurants[i]
    if (restaurant.key === key) {
      restaurants.splice(i, 1)
      break;
    }
  }
  setItems(restaurants)
  return restaurants
}

export default { getItems, setItems, addItem, deleteItem }