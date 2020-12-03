var qs=require('querystring');
require('http').createServer(function(req,res){
    var body='';
    req.on('data',function(chunk){
        body+=chunk;
        console.log(body);
    })
    req.on('end',function(){
        res.writeHead(200,{
                    'Content-Type':'text/html'
                });
                res.end('Done');
                console.log('\n Got name \033[90m'+qs.parse(body).name+'\033[39m\n');
    })
//     res.writeHead(200,{
//         'Content-Type':'text/html'
//     });

//     if('/'==req.url){

   
//     res.end([
//         '<form method="POST" action="/url">',
//         '<h1>My Form</h1>','<fieldset>',
//         '<label>Personal Information</label>',
//         '<p>What is your name?</p>',
//         '<input type="text" name="name" />',
//         '<p><button>Submit</button></p>',
//   '      </form>'
//     ].join(''));
// }
// else if('/url'==req.url){
//     res.writeHead(200,{
//         'Content-Type':'text/html'
//     });
//     var body='';
//     req.on('data',function(chunk){
//         body+=chunk;

//     })
//     req.on('end',function(){
//         res.writeHead(200,{ 'Content-Type':'text/html'})
//         res.end("<p>Your name is"+qs.parse(body).name+" </p>")

//     })

    
   
// }else{
//     res.writeHead(404,{ 'Content-Type':'text/html'})
//     res.end("<p>Not Found</p>")

    
// }
   

}).listen(3002)
