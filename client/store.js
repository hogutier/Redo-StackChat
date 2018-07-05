import { createStore, applyMiddleware } from 'redux'
import axios from 'axios'
import loggingMiddleware from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import socket from './socket'


//ACTION TYPES
const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';
const WRITE_MESSAGE = 'WRITE_MESSAGE';
const GOT_NEW_MESSAGE_FROM_SERVER = 'GOT_NEW_MESSAGE_FROM_SERVER';
const NAME_ENTRY = 'NAME_ENTRY'

//ACTION CREATORS
export const gotMessagesFromServer = (messages) => ({
  type: GOT_MESSAGES_FROM_SERVER,
  messages
})

export const writeMessage = (inputContent) => ({
  type: WRITE_MESSAGE,
  newMessageEntry: inputContent
})

export const gotNewMessageFromServer = (message) => ({
  type: GOT_NEW_MESSAGE_FROM_SERVER,
  message
})

export const nameEntry = (name) => ({
  type: NAME_ENTRY,
  nameEntry: name
})

//THUNK CREATOR
export const fetchMessages = () => {
  //THUNK
  return async (dispatch) => {
    const response = await axios.get('/api/messages')
    const messages = response.data;
    const action = gotMessagesFromServer(messages)
    dispatch(action)
  }
}

//THUNK CREATOR
export const postMessage = (message) => {
  //THUNK
  return async (dispatch) => {
    const { data } = await axios.post('/api/messages', message)
    dispatch(gotNewMessageFromServer(data))
    socket.emit('new-message', data)
  }
}

//INITIAL STATE
const initialState = {
  messages: [],
  newMessageEntry: '',
  nameEntry: ''
}

//THE REDUCER
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_MESSAGES_FROM_SERVER:
      return {...state, messages: action.messages}
    case WRITE_MESSAGE:
      return { ...state, newMessageEntry: action.newMessageEntry }
    case GOT_NEW_MESSAGE_FROM_SERVER:
      return { ...state, messages: [ ...state.messages, action.message ] }
    case NAME_ENTRY:
      return { ...state, nameEntry: action.nameEntry }
    default:
      return state
  }
}

//The MIDDLEWARES
const middlewares = applyMiddleware(loggingMiddleware, thunkMiddleware)

// THE STORE
const store = createStore(reducer, middlewares)
export default store
