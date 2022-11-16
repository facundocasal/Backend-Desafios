const Server = require('socket.io').Server
const chatDao = require('../DAO/chatDao');



const socket = (expressServer) => {
  const io = new Server(expressServer);

  io.on("connection", async (socket) => {
    console.log("Se conecto un usuario nuevo", socket.id);

    let arrayMsj = await chatDao.getMsg();
    socket.emit("server:msgs", arrayMsj);

    socket.on("client:msg", async (msgInfo) => {
      await chatDao.newMsg(msgInfo);
      let arrayMsj = await chatDao.getMsg();
      socket.emit("server:msgs", arrayMsj);
    });
  });
};

module.exports = socket;
