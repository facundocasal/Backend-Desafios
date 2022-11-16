const Chat = require('../models/chat.model')



const newMsg = async (msg) => {
    const message = await Chat.create(msg)
}



const getMsg = async () => {
    const messages = await Chat.find()
    return messages
}

const getMsgFromUser = async (user)=>{
    const messageUser = await Chat.find({author: user})
    return messageUser
}


module.exports = {
    newMsg,
    getMsg,
    getMsgFromUser
}