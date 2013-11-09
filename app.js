/*
 * Module dependencies
 */
var express = require('express')
    , stylus = require('stylus')
    , nib = require('nib')
    , FirebaseTokenGenerator = require('firebase-token-generator')


//var JWToken = "XeyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhZG1pbiI6dHJ1ZSwidiI6MCwiaWF0IjoxMzgzNTk2MDI0LCJkIjp7ImF1dGhfZGF0YSI6ImZvbyIsIm90aGVyX2F1dGhfZGF0YSI6ImJhciJ9fQ.2JFKmdLs39wJksFGtKZQw8CgjH8vQttPH8Bddp4Vhss"
var YOUR_FIREBASE_SECRET ='syVhV30theMQpJ2gKi3coUwfezX0IO4ztfN1OifF';
var FirebaseTokenGenerator = require("firebase-token-generator");
var tokenGenerator = new FirebaseTokenGenerator(YOUR_FIREBASE_SECRET);
var JWToken = tokenGenerator.createToken({firstname: "dave", lastname: "rossellat"});


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