import { navigate } from 'app/navigationRef'

import React, { useReducer, useContext } from 'react'
import CustomButton from 'app/components/CustomButton'
import CustomTextInput from 'app/components/CustomTextInput'
import {
  Alert, AsyncStorage, BackHandler, FlatList, Picker,
  Platform, ScrollView,
  StyleSheet, Text, View
} from 'react-native'
import { Context as DecisionContext } from 'app/context/DecisionContext'

const SHOW_SELECTED_MODAL = 'SHOW_SELECTED_MODAL'
const OFF_MODALS = 'OFF_SELECTED_OFF_VETO_MODAL'
const SHOW_VETO_MODAL = 'SHOW_VETO_MODAL'
const VETO = 'VETO'

const reducer = (state, action) => {
  switch (action.type) {
    case SHOW_SELECTED_MODAL:
      return { ...state, selectedVisible: true, vetoVisible: false }
    case OFF_MODALS:
      return { ...state, selectedVisible: false, vetoVisible: false }
    case SHOW_VETO_MODAL:
      return { ...state, selectedVisible: false, vetoVisible: true }
    case VETO:
      return {
        ...state,
        selectedVisible: false,
        vetoVisible: false,
        vetoText: action.payload ? "Veto" : "No Vetoes Left",
        vetoDisabled: !action.payload,
        participantsListRefresh: !state.participantsListRefresh
      }
    default:
      throw new Error();
  }
}


const ChoiceLogic = () => {
  const {
    state: {
      participants,
      filteredRestaurants,
      chosenRestaurant
    },
    selectRestaurant,
    initializeParticipants,
    initializeFilteredRestaurants
  } = useContext(DecisionContext)
  //
  const [state, dispatch] = useReducer(reducer, {
    participantsListRefresh: false,
    selectedVisible: false,
    vetoVisible: false,
    vetoDisabled: false,
    vetoText: "Veto",
  })

  const randomRestaurant = async () => {
    const getRandom = (inMin, inMax) => {
      inMin = Math.ceil(inMin)
      inMax = Math.floor(inMax)
      return Math.floor(Math.random() * (inMax - inMin + 1) + inMin)
    }
    if (!filteredRestaurants.length) {
      navigate('PostChoiceScreen')
      return
    }
    // Randomly pick one
    const selectedNumber = getRandom(0, filteredRestaurants.length - 1)
    // get restaurant descriptor    
    await selectRestaurant(filteredRestaurants[selectedNumber])
    onSelectedModal()
  }

  const onAccept = () => {
    dispatch({
      type: OFF_MODALS
    })
    navigate('PostChoiceScreen')
  }

  const onVetoModal = () => {
    dispatch({
      type: SHOW_VETO_MODAL
    })
  }

  const onSelectedModal = () => {
    dispatch({
      type: SHOW_SELECTED_MODAL
    })
  }

  const onVeto = async (key) => {
    // Mark the vetoer as having vetoed
    let temp = participants.map(item => {
      if (item.key === key) item.vetoed = "yes"
      return item
    })
    await initializeParticipants(temp)
    // Make sure there's still at least one person that
    // can veto, otherwise disable the Veto button.
    let vetoStillAvailable = false
    for (const participant of participants) {
      if (participant.vetoed === 'no') {
        vetoStillAvailable = true
        break;
      }
    }
    // delete the vetoed restaurant
    temp = filteredRestaurants.filter(item => item.key !== chosenRestaurant.key)
    await initializeFilteredRestaurants(temp)
    // update state
    dispatch({
      type: VETO,
      payload: vetoStillAvailable
    })

    if (filteredRestaurants.length === 1) {
      navigate('PostChoiceScreen')
    }
  }

  return {
    state, dispatch, chosenRestaurant,
    participants, randomRestaurant,
    onAccept, onVetoModal, onSelectedModal, onVeto
  }
}

export default ChoiceLogic
