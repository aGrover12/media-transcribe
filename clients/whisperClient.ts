const net = require('net');
const ip = require("ip");
const utf8  = require("utf8");

var host = ip.address();
var port = 5050;

console.log("HOSTNAME: " + host)

var socket = new net.Socket();
socket.connect(port, host, () => {
    console.log("Connected to server");
});

socket.on('data', (data: any) => {
    console.log(`${data}`);
    socket.destroy();
});

var send = (msg: String) => {
    let encodedMsg: String = utf8.encode(msg);
    let msgLength: Number = encodedMsg.length ;
    let encodedMsgLength: String = utf8.encode(msgLength.toString());
    socket.write(encodedMsgLength);
    socket.write(msg);
 }

 export { send } 