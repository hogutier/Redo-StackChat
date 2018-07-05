import { createStore, applyMiddleware } from 'redux'
import axios from 'axios'
import loggingMiddleware from 'redux-logger'
import thunkMiddleware from 'redux-thunk'


//ACTION TYPES
const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';

//ACTION CREATORS
export const gotMessagesFromServer = (messages) => ({
  type: GOT_MESSAGES_FROM_SERVER,
  messages
})

//THUNK CREATORS
export const fetchMessages = () => {
  //THUNK
  return async (dispatch) => {
    const response = await axios.get('/api/messages')
    const messages = response.data;
    const action = gotMessagesFromServer(messages)
    dispatch(action)
  }
}

//INITIAL STATE
const initialState = {
  messages: []
}

//THE REDUCER
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_MESSAGES_FROM_SERVER:
      return {...state, messages: action.messages}
    default:
      return state
  }
}

//The MIDDLEWARES
const middlewares = applyMiddleware(loggingMiddleware, thunkMiddleware)

// THE STORE
const store = createStore(reducer, middlewares)
export default store
