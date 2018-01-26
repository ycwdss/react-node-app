// 根据用户类型和信息是否完善，决定跳转页面
export function getRedirectPath ({ type, avatar }) {
    let url = (type === 'boss') ? '/boss' : '/genius'
    if (!avatar) {
        url += 'info'
    }
    return url
}

//与谁聊天的唯一id
export function getChatId (userId, targetId) {
    return [userId, targetId].sort().join('_')
}

export function getLast (arr) {
    return arr[arr.length - 1]
}