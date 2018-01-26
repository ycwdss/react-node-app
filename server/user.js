const express = require('express')
const Router = express.Router()
const utils = require('utility')
const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')
const _filter = { 'pwd': 0, '__v': 0 }

// 查询所有用户列表
Router.get('/list', (req, res) => {
    const { type } = req.query
    User.find({ type }, (err, doc) => {
        return res.json({ code: 0, data: doc })
    })
})

// 清除所有用户信息，调试用
Router.get('/clear', (req, res) => {
    User.remove({}, (err, doc) => res.json(doc))
})

// 清除所有聊天记录，调使用
Router.get('/chat-clear', (req, res) => {
    Chat.remove({}, (err, doc) => res.json(doc))
})

// 用户登录
Router.post('/login', (req, res) => {
    const { user, pwd } = req.body
    User.findOne({ user, pwd: md5Pwd(pwd) }, _filter, (err, doc) => {
        if (!doc) {
            return res.json({ code: 1, msg: '用户名或密码错误' })
        } else {
            res.cookie('useid', doc._id)
            return res.json({ code: 0, data: doc })
        }
    })
})

// 用户注册
Router.post('/register', (req, res) => {
    const { user, pwd, type } = req.body
    User.findOne({ user: user }, (err, doc) => {
        if (doc) {
            return res.json({ code: 1, msg: '用户名重复' })
        } else {
            const userModel = new User({ user, pwd: md5Pwd(pwd), type })
            userModel.save((e, d) => {
                const { user, type, _id } = d
                res.cookie('useid', _id)
                return res.json({ code: 0, data: { user, type, _id } })
            })
        }
    })
})

// 获取用户信息
Router.get('/info', (req, res) => {
    const userid = req.cookies['useid']
    if (!userid) {
        return res.json({ code: 1 })
    } else {
        User.findOne({ _id: userid }, _filter, (err, doc) => {
            if (err) {
                return res.json({ code: 1, msg: "服务器错误" })
            } else {
                return res.json({ code: 0, data: doc })
            }
        })
    }
})

// 完善用户信息
Router.post('/update', (req, res) => {
    const userId = req.cookies['useid']
    if (!userId) {
        return res.json({ code: 1, msg: '请重新登录' })
    } else {
        const { body } = req
        User.findByIdAndUpdate(userId, body, (err, doc) => {
            const data = Object.assign({}, {
                user: doc.user,
                type: doc.type
            }, body)
            return res.json({ code: 0, data })
        })
    }
})

// 获取聊天信息
Router.get('/getMsgList', (req, res) => {
    const user = req.cookies['useid']
    User.find({}, (e, userdoc) => {
        let users = {}
        userdoc.forEach(v => {
            users[v._id] = { name: v.user, avatar: v.avatar }
        })

        Chat.find({'$or': [{ "from": user }, { "to": user }]}, (err, doc) => {
            console.log(doc)
            if (!err) {
                return res.json({ code: 0, msgs: doc, users: users })
            }
        })
    })
})

// 修改信息未读状态
Router.post('/readMsg', (req, res) => {
    const user = req.cookies['useid']
    const { from } = req.body
    Chat.update(
        { from, to: user }, { '$set': { read: true } }, { 'multi': true },
        (err, doc) => {
            if (!err) {
                return res.json({ code: 0, num: doc.nModified })
            }
        }
    )
})
// 修改信息未读状态
Router.post('/readMsg', (req, res) => {
    const user = req.cookies['useid']
    const { from } = req.body
    Chat.update(
        { from, to: user }, { '$set': { read: true } }, { 'multi': true },
        (err, doc) => {
            if (!err) {
                return res.json({ code: 0, num: doc.nModified })
            }
        }
    )
})
// 密码加密
function md5Pwd (pwd) {
    const salt = "useid-sfaf8h143n3knjaf"
    return utils.md5(utils.md5(pwd + salt))
}

module.exports = Router