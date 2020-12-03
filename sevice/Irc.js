var net=require('net');
var client=net.connect(6667, 'irc.freenode.net');
client.setEncoding('utf-8');

client.on('error',
function(e){
    console.log(e);

})
client.on('connect',function(){
    console.log('sucess');
    client.write('NICK mynick\r\n')
    client.write('USER mynick 0 * :yuxiaoqin\r\n')
    client.write('JOIN #node.js \r\n')
})