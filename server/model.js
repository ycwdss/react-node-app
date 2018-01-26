const mongoose = require('mongoose')
// 链接mongo 并且使用react-app这个集合
const DB_URL = 'mongodb://localhost:27018/react-app'
mongoose.connect(DB_URL)

const models={
    user:{
        'user':{type:String, 'require':true},
        'pwd':{type:String, 'require':true},
        'type':{'type':String, 'require':true},
        //头像
        'avatar':{'type':String},
        // 个人简介或者职位简介
        'desc':{'type':String},
        // 职位名
        'title':{'type':String},
        // 如果你是boss 还有两个字段
        'company':{'type':String},
        'money':{'type':String}
    },
    chat: {
        chatId: { type: String, require: true }, // 聊天Id
        from: { type: String, require: true }, // 发送人
        to: { type: String, require: true }, // 接收人
        read: { type: Boolean, default: false }, // 是否已读
        content: { type: String, require: true, default: "" }, // 聊天内容
        create_time: { type: Number, default: +new Date()}
    },
}

for(let m in models){
    mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
    getModel:function(name){
        return mongoose.model(name)
    }
}