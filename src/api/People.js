import { AsyncStorage } from 'react-native'

const PEOPLE = 'people'

export const getItems = async () => {
  let people = await AsyncStorage.getItem(PEOPLE)
  people ? people = JSON.parse(people) : people = []
  return people
}

export const setItems = (people) => {
  AsyncStorage.setItem(PEOPLE, JSON.stringify(people))
}

export const addItem = async ({
  firstName,
  lastName,
  relationship
}, callback) => {
  const people = await getItems()
  const newRestaurant = {
    firstName,
    lastName,
    relationship,
    key: `p_${new Date().getTime()}`
  }
  people.push(newRestaurant)
  setItems(people)
  if (callback) callback()
}

export const deleteItem = async (key) => {
  const people = await getItems()
  for (let i = 0; i < people.length; i++) {
    const person = people[i]
    if (person.key === key) {
      people.splice(i, 1)
      break;
    }
  }
  setItems(people)
  return people
}

export default { getItems, setItems, addItem, deleteItem }