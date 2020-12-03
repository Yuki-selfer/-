var qs = require('querystring'), http = require('http');
var search = process.argv.slice(2).join('').trim();
if (!search.length) {
    console.log('\n Usagetweets <search term>');
}
console.log('\n searchonf for :\033[96m' + search + '\033[39m\n');
http.request({
    host: 'baidu.com',
    path: '/s?' + qs.stringify({
        q: search
    })
}, function (res) {
    var body = '';
    res.setEncoding('utf-8');
    res.on('data', function (chunk) {
        body += chunk;
    })
    res.on('end', function () {
        var obj = JSON.parse(body)
        obj.results.foreach(function (tweet) {
            console.log('\033[90m' + tweet.text + '\033[39m');
        })
    })
}).end()
