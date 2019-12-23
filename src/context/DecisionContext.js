import createDataContext from './createDataContext'

const INIT_PARTICIPANTS = 'INIT_PARTICIPANTS'
const INIT_FILTERED_RESTAURANTS = 'INIT_FILTERED_RESTAURANTS'
const SELECT_RESTAURANT = 'SELECT_RESTAURANT'

const initialState = {
  participants: [],
  filteredRestaurants: [],
  chosenRestaurant: {}
}

const decisionReducer = (state, action) => {
  switch (action.type) {
    case INIT_PARTICIPANTS:
      return {
        ...state,
        participants: action.payload
      }
    case INIT_FILTERED_RESTAURANTS:
      return {
        ...state,
        filteredRestaurants: action.payload
      }
    case SELECT_RESTAURANT:
      return {
        ...state,
        chosenRestaurant: action.payload
      }
    default:
      return state;
  }
}

const initializeFilteredRestaurants = (dispatch) => (filteredRestaurants) => {
  dispatch({
    type: INIT_FILTERED_RESTAURANTS,
    payload: filteredRestaurants
  })
}

const initializeParticipants = (dispatch) => (participants) => {
  dispatch({
    type: INIT_PARTICIPANTS,
    payload: participants
  })
}

const selectRestaurant = (dispatch) => (chosenRestaurant) => {
  dispatch({
    type: SELECT_RESTAURANT,
    payload: chosenRestaurant
  })
}

export const { Context, Provider } = createDataContext(
  decisionReducer,
  { initializeParticipants, initializeFilteredRestaurants, selectRestaurant },
  initialState
)
