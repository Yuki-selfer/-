const http = require('http');
const WebSocketServer = require('websocket').server;
const httpServer = http.createServer((request, response) => {
    response.writeHead(404);
    response.end();
})
const wsServer = new WebSocketServer({
    httpServer,
    autoAcceptConnections: true
});

wsServer.on('connect', connecttion => {
    connecttion.on('message', mssage => {
        console.log('>message', mssage);
        if (mssage.type === 'utf8') {
            var data = {
                content: '自动回复',
                date: '2020-07-22'
            }
            connecttion.sendUTF(JSON.stringify(data))
        }
    });
    connecttion.on('close', (Response, descri) => {
        console.log('[' + new Date() + ']PEER' + connecttion.remoteAddress + 'disconnectioned');
    })
    process.stdin.on('data', function(data) {
        var data = data.toString().trim();
        data = {
            content: 'data',
            date: '2020-07-23'

        }
        connecttion.sendUTF(JSON.stringify(data))
    })
});
httpServer.listen(3000, () => {
    console.log('[' + new Date() + ']' + 'server is listening on port 3000');
});