import { navigate } from 'app/navigationRef'
import People from 'app/api/People'
import Restaurant from 'app/api/Restaurant'

import {
  Alert
} from 'react-native'

const DecisionTimeLogic = () => {
  // make sure there's people
  const checkPeople = async () => {
    const people = await People.getItems()
    if (!people.length) {
      Alert.alert(
        "That ain't gonna work, chief",
        "You haven't added any people." +
        "You should probably do that first, no?",
        [{ text: 'OK' }],
        { cancelable: false }
      )
      return false
    }
    return true
  }

  // make sure there's restaurants
  const checkRestaurants = async () => {
    const restaurants = await Restaurant.getItems()
    if (!restaurants.length) {
      Alert.alert(
        "That ain't gonna work, chief",
        "You haven't added any restaurants. " +
        "You should probably do that first. no?",
        [{ text: 'OK' }],
        { cancelable: false }
      )
      return false
    }
    return true
  }

  const onNextScreen = async () => {
    const havePeople = await checkPeople()
    const haveRestaurant = await checkRestaurants()
    if (havePeople && haveRestaurant) {
      navigate('WhosGoingScreen')
    }
  }

  return { onNextScreen }
}

export default DecisionTimeLogic