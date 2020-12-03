require("http").createServer(
    function(req, res) {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        })
        res.end('<h1>Hello Yuki</h1>')
    }
).listen(23, function() {
    console.log('running')
})