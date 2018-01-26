//合并所有的reducer 并返回
import {combineReducers} from 'redux'

import {user} from './user'
import {chatuser} from './chatuser'
import {chat} from './chat'

export default combineReducers({
    user,
    chatuser,
    chat
})