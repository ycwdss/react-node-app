import axios from 'axios'
/*
* 抽出牛人和boss共同的获取列表
* */
//action type
const USER_LIST = 'USER_LIST'

const initState = {
    userlist:[]
}

//reduce
export function chatuser(state=initState, action){
    switch(action.type){
        case USER_LIST:
            return {...state, userlist:action.payload}
        default:
            return state
    }
}
//action
function userList(data){
    return { type:USER_LIST, payload:data}
}


//对外函数

export function getUserList(type){
    return dispatch=>{
        axios.get('/user/list?type='+type)
            .then(res=>{
                if (res.data.code==0) {
                    dispatch(userList(res.data.data))
                }
            })

    }
}






