import { combineReducers } from 'redux'
import {artist, members, messages, score, state, word} from './game'
import user from './user'

export default combineReducers({
  artist,
  members,
  messages,
  // score,
  state,
  word,
  user,
})