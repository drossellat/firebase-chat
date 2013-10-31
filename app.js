/*
 * Module dependencies
 */
var express = require('express')
    , stylus = require('stylus')
    , nib = require('nib')


var JWToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhZG1pbiI6dHJ1ZSwidiI6MCwiaWF0IjoxMzgzMjUzODE1LCJkIjp7ImZpcnN0X25hbWUiOiJkYXZpZCIsInVzZXJuYW1lIjoiZHJvc3NlbGxhdCJ9fQ.U_sKdKXLVCo5fioYvUyEB2XnJUbyzz9yGyYXcY-Udh8"
var test ="test"
var app = express()

function compile(str, path) {
    return stylus(str)
        .set('filename', path)
        .use(nib());
}

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(express.logger('dev'))
app.use(stylus.middleware(
    { src: __dirname + '/public'
        , compile: compile
    }
))
app.use(express.static(__dirname + '/public'))

app.get('/', function (req, res) {
    res.render('index',
        { title : 'Home', token : JWToken }
    )
})

app.listen(3000)