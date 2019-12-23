import People from 'app/api/People'
import { navigate } from 'app/navigationRef'
//
import { useReducer, useContext } from 'react'
import { Context as DecisionContext } from 'app/context/DecisionContext'
import {
  Alert
} from 'react-native'

export const FETCH_PEOPLE = 'FETCH_PEOPLE'
export const TOGGLE_PERSON = 'TOGGLE_PERSON'

const reducer = (state, action) => {
  switch (action.type) {
    case FETCH_PEOPLE:
      return { ...state, people: action.payload }
    case TOGGLE_PERSON:
      return { ...state, selected: action.payload }
    default:
      throw new Error();
  }
}

const initialState = {
  people: [],
  selected: []
}

const WhosGoingLogic = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { people, selected } = state
  const { initializeParticipants } = useContext(DecisionContext)
  //
  const fetchPeople = async () => {
    const dataList = await People.getItems()
    dispatch({
      type: FETCH_PEOPLE,
      payload: dataList,
    })
  }
  //
  const togglePerson = (key) => {
    const cloneSelected = { ...selected }
    cloneSelected[key] = !cloneSelected[key]
    dispatch({
      type: TOGGLE_PERSON,
      payload: cloneSelected
    })
  }
  //
  const onNextScreen = () => {
    const currentParticipants = []
    for (const person of people) {
      if (selected[person.key]) {
        const temp = { ...person, vetoed: 'no' }
        currentParticipants.push(temp)
      }
    }
    // check participants
    if (currentParticipants.length === 0) {
      Alert.alert(
        "Uhh, you awake?",
        "You didn't select anyone to go. Wanna give it another try?",
        [{ text: 'OK' }],
        { cancelable: false }
      )
      return
    }
    // add to context
    initializeParticipants(currentParticipants)
    navigate('PreFiltersScreen')
  }
  //
  return { state, dispatch, fetchPeople, togglePerson, onNextScreen }
}

export default WhosGoingLogic