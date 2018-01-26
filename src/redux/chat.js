/*
import axios from 'axios'
import io from 'socket.io-client'


const socket = io.connect('ws://localhost:9090')
const MSG_LIST = "MSG_LIST" // 获取聊天列表
const MSG_RECV = "MSG_RECV" // 读取信息
const MSG_READ = "MSG_READ" // 标识已读

const initState = {
    chatmsg: [], // 聊天信息
    unread: 0, // 未读信息数量
    users: {}, //
    listening: false
}

export function chat (state = initState, action) {
    switch (action.type) {
        case MSG_LIST:
            return {
                ...state,
                users: action.payload.users,
                chatmsg: action.payload.msgs,
                unread: action.payload.msgs.filter(v => (
                    !v.read && v.to === action.payload.userId)
                ).length,
            }
        case MSG_RECV:
            const n = action.payload.msg.to === action.payload.userId ? 1 : 0
            return {
                ...state,
                chatmsg: [...state.chatmsg, action.payload.msg],
                unread: state.unread + n
            }
        case MSG_READ:
            return {
                ...state,
                chatmsg: state.chatmsg.map(v => ({
                    ...v,
                    read: action.payload.from === v.from ? true : v.read
                })),
                unread: state.unread - action.payload.num
            }
        case 'START_LISTEN':
            return { ...state, listening: true }
        default:
            return state
    }
}

// 获取信息列表
function msgList (msgs, users, userId) {
    return { type: MSG_LIST, payload: { msgs, users, userId } }
}

export function getMsgList () {
    return (dispatch, getState) => {
        axios.get('/user/getMsgList').then(res => {
            if (res.status === 200 && res.data.code === 0) {
                dispatch(msgList(res.data.msgs, res.data.users, getState().user._id))
            }
        })
    }
}

// 发送信息
export function sendMsg (from, to, msg) {
    return dispatch => {
        socket.emit("sendMsg", { from, to, msg })
    }
}

// 接收信息
function msgRecv (msg, userId) {
    return { type: MSG_RECV, payload: { msg, userId } }
}

export function recvMsg () {
    return (dispatch, getState) => {
        if (!getState().chat.listening) {
            socket.on('recvMsg', (data) => {
                dispatch(msgRecv(data, getState().user._id))
            })
        }
    }
}

// 已读消息
function msgRead (from, userId, num) {
    return { type: MSG_READ, payload: { from, userId, num } }
}

export function readMsg (from) {
    return (dispatch, getState) => {
        axios.post('/user/readMsg', { from }).then(res => {
            if (res.status === 200 && res.data.code === 0) {
                const userId = getState().user._id
                const { num } = res.data
                dispatch(msgRead(from, userId, num))
            }
        })
    }
}

// 开始监听
function startListen () {
    return { type: 'START_LISTEN' }
}

export function listenStart () {
    return dispatch => {
        dispatch(startListen())
    }
}*/
import axios from 'axios'
import io from 'socket.io-client'

const socket = io.connect('ws://localhost:9090')
const MSG_LIST = "MSG_LIST" // 获取聊天列表
const MSG_RECV = "MSG_RECV" // 读取信息
const MSG_READ = "MSG_READ" // 标识已读

const initState = {
    chatmsg: [], // 聊天信息
    unread: 0, // 未读信息数量
    users: {}, //
    listening: false
}

export function chat (state = initState, action) {

    switch (action.type) {
        case MSG_LIST:
            console.log(action.payload)
            return{
                ...state,
                chatmsg:action.payload.msgs,
                unread: action.payload.msgs.filter(v => (
                    !v.read && v.to === action.payload.userId)
                ).length,
                users:action.payload.users
            }
        case MSG_RECV:
           console.log(action.payload)
            const n = action.payload.msg.to === action.payload.userId ? 1 : 0
            return {
                ...state,
                chatmsg: [...state.chatmsg, action.payload.msg],
                unread: state.unread + n
            }
        case MSG_READ:
            return {
                ...state,
                chatmsg: state.chatmsg.map(v => ({
                    ...v,
                    read: action.payload.from === v.from ? true : v.read
                })),
                unread: state.unread - action.payload.num
            }
        default:
            return state
    }
}

// 获取信息列表
function msgList (msgs,users) {
    return { type: MSG_LIST, payload:{msgs,users}}
}
//获取消息列表
export function getMsgList () {
    return (dispatch, getState) => {
        axios.get('/user/getMsgList').then(res => {
            if (res.status === 200 && res.data.code === 0) {
                dispatch(msgList(res.data.msgs, res.data.users, getState().user._id))
            }
        })
    }
}

// 发送信息
export function sendMsg (from, to, msg) {
    return dispatch => {
        //发送给后端
        socket.emit("sendMsg", { from, to, msg })
    }
}

// 接收信息
function msgRecv (msg, userId) {
    return { type: MSG_RECV, payload: { msg, userId } }
}

export function recvMsg () {
    return (dispatch, getState) => {
        if (!getState().chat.listening) {
            socket.on('recvMsg', (data) => {
                dispatch(msgRecv(data, getState().user._id))
            })
        }
    }
}

// 已读消息
function msgRead (from, userId, num) {
    return { type: MSG_READ, payload: { from, userId, num } }
}

export function readMsg (from) {
    return (dispatch, getState) => {
        axios.post('/user/readMsg', { from }).then(res => {
            if (res.status === 200 && res.data.code === 0) {
                const userId = getState().user._id
                const { num } = res.data
                dispatch(msgRead(from, userId, num))
            }
        })
    }
}