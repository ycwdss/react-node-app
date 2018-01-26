/*
import React, { PureComponent } from 'react'
import { List, InputItem, NavBar, Icon, Grid } from 'antd-mobile'
import { connect } from 'react-redux'
import { getMsgList, sendMsg, recvMsg, readMsg, listenStart } from "../../redux/chat"
import { getChatId } from "../../redux/util"
import QueueAnim from 'rc-queue-anim'

const { Item } = List

@connect(state => state, { getMsgList, sendMsg, recvMsg, readMsg, listenStart })
export default class Chat extends PureComponent {
    constructor () {
        super()
        this.state = {
            text: '',
            sendBtnStyle: { marginRight: '15px', fontSize: '17px' },
            showEmoji: false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.showEmoji = this.showEmoji.bind(this)
        this.goBack = this.goBack.bind(this)
        this.selectEmoji = this.selectEmoji.bind(this)
    }

    componentWillMount () {
        if (!this.props.chat.listening) {
            this.props.getMsgList()
            this.props.recvMsg()
            this.props.listenStart()
        }
    }

    componentWillUnmount () {
        const to = this.props.match.params.user
        this.props.readMsg(to)
    }

    handleChange (key, val) {
        this.setState({ [key]: val })
    }

    handleSubmit () {
        if (this.state.text.trim()) {
            const from = this.props.user._id
            const to = this.props.match.params.user
            const msg = this.state.text
            this.props.sendMsg(from, to, msg)
            this.handleChange('text', '')
        }
    }

    showEmoji () {
        this.setState({ showEmoji: !this.state.showEmoji })
        this.fixCarousel()
    }

    selectEmoji (el) {
        this.setState({ text: this.state.text + el.text })
    }

    fixCarousel () {
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'))
        }, 0)
    }

    goBack () {
        this.props.history.goBack()
    }

    render () {
        const { user } = this.props.match.params
        const { chatmsg, users } = this.props.chat
        const chatId = getChatId(user, this.props.user._id)
        const msgList = chatmsg.filter(v => v.chatId === chatId)
        const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
            .split(' ')
            .filter(v => v)
            .map(v => ({ text: v }))

        if (!users[user]) {
            return null
        } else {
            return (
                <div id='chat-page'>
                    <NavBar
                        mode='dark'
                        icon={<Icon type="left" />}
                        onLeftClick={this.goBack}>
                        {users[user].name}
                    </NavBar>
                    <QueueAnim>
                        {msgList.map(v => {
                            const avatar = require(`../avatarSelector/avatars/${users[v.from].avatar}.png`)
                            return v.from === user ? (
                                <List key={v._id}>
                                    <Item thumb={avatar}>{v.content}</Item>
                                </List>
                            ) : (
                                <List key={v._id}>
                                    <Item extra={<img src={avatar} alt='头像' />}
                                          className='chat-me'>
                                        {v.content}
                                    </Item>
                                </List>
                            )
                        })}
                    </QueueAnim>
                    <div className="sticky-footer">
                        <List>
                            <InputItem
                                placeholder='请输入信息'
                                value={this.state.text}
                                onChange={v => this.handleChange('text', v)}
                                extra={
                                    <div>
						        <span
                                    onClick={this.showEmoji}
                                    style={this.state.sendBtnStyle}
                                    role="img"
                                    aria-label="emoji">😀</span>
                                        <span onClick={this.handleSubmit}>发送</span>
                                    </div>
                                } />
                        </List>
                        {/!* 选择 emoji *!/}
                        {this.state.showEmoji ?
                            <Grid
                                data={emoji}
                                columnNum={9}
                                carouselMaxRow={4}
                                isCarousel={true}
                                onClick={el => this.selectEmoji(el)}
                            /> : null}
                    </div>
                </div>
            )
        }
    }
}*/

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {List, InputItem, NavBar, Icon, Grid} from 'antd-mobile'
import {getMsgList, sendMsg, recvMsg,readMsg} from '../../redux/chat'
import {getChatId} from '../../redux/util'

const {Item} = List

@connect(
    state => state,
    {getMsgList, sendMsg, recvMsg,readMsg}
)

class Chat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            sendBtnStyle: {marginRight: '15px', fontSize: '17px'},
            showEmoji: false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.showEmoji = this.showEmoji.bind(this)
        this.goBack = this.goBack.bind(this)
        this.selectEmoji = this.selectEmoji.bind(this)
    }

    componentWillMount() {
        if (!this.props.chat.chatmsg.length) {
            this.props.getMsgList();
            this.props.recvMsg();
        }
        /*   socket.on('recvMsg',(data)=>{
               console.log(data)
           })*/
    }
    componentWillUnmount () {
        const to = this.props.match.params.user
        this.props.readMsg(to)
    }
    handleChange(key, val) {
        this.setState({[key]: val})
    }

    handleSubmit() {
        const from = this.props.user._id;
        const to = this.props.match.params.user
        const msg = this.state.text
        this.props.sendMsg(from, to, msg)
        this.setState({
            text: '',
            showEmoji: false
        })
    }

    showEmoji() {
        this.setState({showEmoji: !this.state.showEmoji})
        this.fixCarousel()
    }

    selectEmoji(el) {
        this.setState({text: this.state.text + el.text})
    }

    fixCarousel() {
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'))
        }, 0)
    }

    goBack() {
        this.props.history.goBack()
    }

    render() {
        console.log(this.props)
        const userId = this.props.match.params.user
        const {chatmsg, users} = this.props.chat

        const chatId = getChatId(userId, this.props.user._id)   //聊天的唯一id
        const msgList = chatmsg.filter(v => v.chatId === chatId)  //抽出跟谁聊天
        //聊天表情
        const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
            .split(' ')
            .filter(v => v)
            .map(v => ({text: v}))

        console.log(userId)
        if (!users[userId]) {
            return null
        }
        return (
            <div id='chat-page'>
                <NavBar
                    mode='dark'
                    icon={<Icon type="left"/>}
                    onLeftClick={this.goBack}>
                    {users[userId].name}
                </NavBar>
                <div>
                    {msgList.map(v => {
                        const avatar = require(`../avatarSelector/avatars/${users[v.from].avatar}.png`)
                        return v.from === userId ? (
                            <List key={v._id}>
                                <Item thumb={avatar}>{v.content}</Item>
                            </List>
                        ) : (
                            <List key={v._id}>
                                <Item extra={<img src={avatar} alt='头像'/>}
                                      className='chat-me'>
                                    {v.content}
                                </Item>
                            </List>
                        )
                    })}

                </div>

                <div className="sticky-footer">
                    <List>
                        <InputItem placeholder='请输入' value={this.state.text}
                                   onChange={v => {
                                       this.setState({text: v})
                                   }}

                                   extra={<div><span
                                       onClick={this.showEmoji}
                                       style={this.state.sendBtnStyle}
                                       role="img"
                                       aria-label="emoji">😀</span>
                                       <span onClick={this.handleSubmit}>发送</span>
                                   </div>
                                   }/>
                    </List>
                    {/* 选择 emoji */}
                    {this.state.showEmoji ?
                        <Grid
                            data={emoji}
                            columnNum={9}
                            carouselMaxRow={4}
                            isCarousel={true}
                            onClick={el => this.selectEmoji(el)}
                        /> : null}
                </div>

            </div>
        )
    }
}

export default Chat