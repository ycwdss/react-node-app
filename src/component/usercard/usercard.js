import React from 'react'
import PropTypes from 'prop-types'
import {Card, WhiteSpace, WingBlank} from 'antd-mobile'
import {withRouter} from 'react-router-dom'

@withRouter
    /*
    * boss 和牛人的列表信息
    * */
class UserCard extends React.Component {
    static propTypes = {
        userlist: PropTypes.array.isRequired
    }

    handleChat(v) {
        this.props.history.push(`/chat/${v._id}`)
    }

    render() {
        const Header = Card.Header
        const Body = Card.Body
        return (
            <WingBlank>
                <WhiteSpace></WhiteSpace>
                {this.props.userlist.map(v => (
                    v.avatar ? (<Card
                        onClick={() => this.handleChat(v)}
                        key={v._id}>
                        <Header title={v.user}
                                thumb={require(`../img/${v.avatar}.png`)}
                                extra={<span>{v.title}</span>}>
                        </Header>
                        <Body>
                        {v.type === 'boss' ? <div>公司:
                            {v.company}</div> : null
                        }

                        介绍：{v.desc.split('\n').map(d => (<div key={d}>{d}</div>))}

                        {v.type === 'boss' ? <div>薪资:{v.money}</div> : null}
                        </Body>
                    </Card>) : null

                ))}
            </WingBlank>
        )
    }
}

export default UserCard

