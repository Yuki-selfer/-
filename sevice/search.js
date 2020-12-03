

/**
 * 
 * @param {String} search query
 * @param {Function} callback
 * @api public
 */
var request = require('request')
module.exports = function search(q) {


    request.get('http://zhidao.baidu.com', (err, response, body) => {})
    .end(function(res){
        return res.body
    })
    // .data().end(function (res) {
    //     if (res.body && Array.isArray(res.body.results)) {
    //         return fn(null, res.body.results)
    //     }fn(new Error('bad quest'))

    // })
}