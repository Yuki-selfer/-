const express = require('express');
var search=require('./search')

const bodyParser = require('body-parser'); //body-parser是一个HTTP请求体解析中间件，使用这个模块可以解析JSON、Raw、文本、URL-encoded格式的请求体，Express
//框架中就是使用这个模块做为请求体解析中间件。请求体解析后，解析值都会被放到req.body属性，内容为空时是一个{}空对象。
const request = require('request');
const { response } = require('express');
const { connect } = require('http2');
// const { search } = require('superagent');
const app = express(); //express()本质上就是调用了createApplication()方法，返回了一个express对象
app.set('view engine','ejs');
app.set('views', __dirname+'\\website\\views');
app.set('view options',{layout:false})
console.log(app.set('views'));
app.use(bodyParser.json());

const wx = {
    appid: 'wxfa54d87c253b8771',
    secret: '3a095a1c6214f370172e5d2db8e0fcec'
};
var db = {
    session: {},
    user: {}
}

app.get('/',function(req,res){
    res.render('index')
})
app.get('/search',function(req,res,next){
    console.log(req.query.q);
  var bosy=  search(req.query.q)
  res.render('search',{
    results:bosy,
    search:"w"
})
  
})
app.post('/login', (req, res) => {
    console.log('login code' + req.body.code);
    var url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + wx.appid + '&secret=' + wx.secret + '&js_code=' + req.body.code + '&grant_authorization_code';
    request(url, (err, response, body) => {
        console.log('session' + body);
        var session = JSON.parse(body);
        if (session.openid) {
            console.log('session.openid' + session.openid);
            var token = 'token' + new Date().getTime();
            db.session[token] = session;
            if (!db.user[session.openid]) {
                db.user[session.openid] = {
                    credit: 100
                }
            }
        }

        res.json({ token: token })
    })
})


app.get('/credit', (req, res) => {
    var session = db.session[req.query.token];
    if (session && db.user[session.openid].credit) {
        res.json({
            credit: db.user[session.openid].credit
        })
    } else {
        res.json({
            err: '用户不存在'
        })
    }
})
app.listen(3000, () => {
    console.log("sever in running http://127.0.0.1:3000")
})


app.get('/checklogin', (req, res) => {
    var session = db.session[req.query.token]
    console.log("checklogin", session)
    res.json({
        is_login: session !== undefined
    })
})