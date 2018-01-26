const express=require('express')
const app=express();
const userRouter =require('./user')
const bodyParser=require('body-parser')
const cookieParser=require('cookie-parser')
const server=require('http').Server(app)
const io=require('socket.io')(server)
const model = require('./model')
const Chat = model.getModel('chat')
//发起监听
io.on('connection', (socket) => {

 /*   //监听前端发送的信息
    socket.on('sendMsg',function (data) {
        console.log(data)
        //全局发送给客户端消息
        io.emit('recvMsg',data)
    })*/

    //监听客户端发送过来的信息
    socket.on('sendMsg', (data) => {


        const { from, to, msg } = data
        const chatId = [from, to].sort().join('_') //聊天信息的唯一id
        console.log(msg)
        //向数据库中保存消息
        Chat.create({ from, to, content: msg ,chatId}, (err, doc) => {
            if (!err) {
                //向所有的人发送消息
                io.emit('recvMsg', Object.assign({}, doc._doc))
            }
        })
    })
})
app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user',userRouter)
server.listen(9090,()=>{
    console.log('port 9090 is running')
});