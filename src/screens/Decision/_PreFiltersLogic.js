import Restaurant from 'app/api/Restaurant'
import { navigate } from 'app/navigationRef'

import { useContext, useReducer } from 'react'
import { Alert } from 'react-native'
import { Context as DecisionContext } from 'app/context/DecisionContext';

export const SET_CUISINE = 'SET_CUISINE'
export const SET_PRICE = 'SET_PRICE'
export const SET_RATING = 'SET_RATING'
export const SET_DELIVERY = 'SET_DELIVERY'

const reducer = (state, action) => {
  switch (action.type) {
    case SET_CUISINE:
      return { ...state, cuisine: action.payload }
    case SET_PRICE:
      return { ...state, price: action.payload }
    case SET_RATING:
      return { ...state, rating: action.payload }
    case SET_DELIVERY:
      return { ...state, delivery: action.payload }
    default:
      throw new Error();
  }
}

const initialState = {
  cuisine: '',
  price: '',
  rating: '',
  delivery: ''
}

const PreFiltersLogic = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { cuisine, price, rating, delivery } = state
  //
  const { initializeFilteredRestaurants } = useContext(DecisionContext)
  //
  const onNextScreen = async () => {
    const restaurants = await Restaurant.getItems()
    // filter restaurants based on selected criteria, if any
    const currentFilteredRestaurants = restaurants.filter((restaurant) => {
      if (cuisine && restaurant.cuisine !== cuisine) return false;
      if (price) {
        const resPriceInt = parseInt(restaurant.price)
        const priceInt = parseInt(price)
        if (resPriceInt > priceInt) return false;
      }
      if (rating) {
        const resRatingInt = parseInt(restaurant.rating)
        const ratingInt = parseInt(rating)
        if (resRatingInt < ratingInt) return false;
      }
      if (delivery && restaurant.delivery !== delivery) return false;
      return true;
    })
    //
    if (currentFilteredRestaurants.length === 0) {
      Alert.alert(
        "Well, that's an easy choice",
        "None of your restaurants match these criteria. " +
        "Maybe try loosing them up a bit?",
        [{ text: 'OK' }],
        { cancelable: false }
      )
      return
    }
    initializeFilteredRestaurants(currentFilteredRestaurants)
    navigate('ChoiceScreen')
  }
  //
  return {
    state, dispatch,
    initializeFilteredRestaurants, onNextScreen
  }
}

export default PreFiltersLogic