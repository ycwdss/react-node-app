import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { List, Badge } from 'antd-mobile'
import { getLast } from "../../redux/util"
import QueueAnim from 'rc-queue-anim'

const { Item } = List
const { Brief } = Item

@connect(state => state)
export default class Msg extends PureComponent {
    push (id) {
        this.props.history.push(`/chat/${id}`)
    }

    render () {
        const userId = this.props.user._id // 当前登录用户ID
        const userInfo = this.props.chat.users // 所有与当前用户发生过对话的用户信息
        const msgGroup = {} // 按chatId将聊天分组
        this.props.chat.chatmsg.forEach(v => {
            msgGroup[v.chatId] = msgGroup[v.chatId] || []
            msgGroup[v.chatId].push(v)
        })

        // 按时间将给聊天分组排序
        console.log(msgGroup)
        console.log(Object.values(msgGroup))
        const chatList = Object.values(msgGroup).sort((a, b) => {
            const a_last = getLast(a).create_time
            const b_last = getLast(b).create_time
            console.log(a_last,b_last)
            return b_last - a_last
        })

        return (
            <QueueAnim type='scaleX'>
                {chatList.map(v => {
                    const lastItem = getLast(v)
                    const targetId = v[0].from === userId ? v[0].to : v[0].from
                    const unreadNum = v.filter(v => !v.read && v.to === userId).length

                    if (!userInfo[targetId]) {
                        return null
                    } else {
                        return (
                            <List key={lastItem._id}>
                                <Item
                                    extra={<Badge text={unreadNum} />}
                                    thumb={require(`../avatarSelector/avatars/${userInfo[targetId].avatar}.png`)}
                                    arrow="horizontal"
                                    onClick={() => this.push(targetId)}>
                                    {lastItem.content}
                                    <Brief>{userInfo[targetId].name}</Brief>
                                </Item>
                            </List>
                        )
                    }
                })}
            </QueueAnim>
        )
    }
}