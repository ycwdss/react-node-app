import axios from 'axios'
import {getRedirectPath} from './util'

//action type
const REGISTER_SUCCESS = 'REGISTER_SUCCESS'//注册成功
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'//登录成功
const AUTH_SUCCESS = 'AUTH_SUCCESS'//保存用户信息，注册登录保存信息都使用这个
const LOGOUT = 'LOGOUT' //退出登录
const ERROR_MSG = 'ERROR_MSG' //出错信息
const LOAD_DATA = 'LOAD_DATA'

const initState={
    redirectTo:'',
    msg:'',
    user:'',
    type:''
}
//reducer
export function user(state=initState, action) {
    switch (action.type){
        /*  case AUTH_SUCCESS:
             return {...state,msg:'',isAuth:true,redirectTo:getRedirectPath(action.payload),...action.payload}
        case LOGIN_SUCCESS:
             return {...state,msg:'',isAuth:true,redirectTo:getRedirectPath(action.payload),...action.payload}*/
        case AUTH_SUCCESS:
            return {...state,msg:'',redirectTo:getRedirectPath(action.payload),...action.payload}
        case LOGOUT:
            return {...initState,redirectTo:'/login'}
        case LOAD_DATA:
            return {...state, ...action.payload}
        case ERROR_MSG:
            return {...state,isAuth:false,msg:action.msg}
        default:
            return state
    }
}

/*
* Action
* */

function registerSuccess(data) {
    return{type:REGISTER_SUCCESS,payload:data}
}
function loginSuccess(data) {
    return{type:LOGIN_SUCCESS,payload:data}
}

// 刷新 重新获取数据
export function loadData(userinfo) {
    return { type:LOAD_DATA,payload:userinfo}
}
//错误信息
function errorMsg(msg) {
    return {msg, type: ERROR_MSG}
}
//保存用户信息，注册 登录，保存信息都可以使用这个统一的action
function authSuccess(obj){
    const {pwd,...data} = obj
    return {type: AUTH_SUCCESS, payload:data}
}
//退出登录
export function logoutSubmit(){
    return { type:LOGOUT }
}

/*
*  对外通用函数，Redux 中只需把 action 创建函数的结果传给 dispatch() 方法即可发起一次 dispatch 过程
* */
//注册
export function register({user, pwd, repeatpwd, type}) {
    if (!user || !pwd || !type) {
        return errorMsg('用户名密码必须输入')
    }
    if (pwd !== repeatpwd) {
        return errorMsg('用户名密码必须输入')
    }
    return dispatch => {
        axios.post('/user/register', {user, pwd, type})
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(authSuccess({user, pwd, type}))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}
//登录
export function login({user,pwd}){
    if (!user||!pwd) {
        return errorMsg('用户密码必须输入')
    }
    return dispatch=>{
        axios.post('/user/login',{user,pwd})
            .then(res=>{
                if (res.status===200&&res.data.code===0) {
                    dispatch(authSuccess(res.data.data))
                }else{
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}
//保存用户信息
export function update(data){
    return dispatch=>{
        axios.post('/user/update',data)
            .then(res=>{
                if (res.status===200&&res.data.code===0) {
                    dispatch(authSuccess(res.data.data))
                }else{
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}

// 获取用户信息
export function userinfo (callback) {
    return dispatch => {
        axios.get('/user/info').then(res => {
            if (res.status === 200 && res.data.code === 0) {
                dispatch(loadData(res.data.data))
            } else {
                callback()
            }
        })
    }
}