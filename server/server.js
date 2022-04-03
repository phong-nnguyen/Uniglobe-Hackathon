var http = require('http');
var mongoose = require('mongoose');
const express = require("express");
const { url } = require('inspector');
const User = require(__dirname + '/model/user.js');

const app = express();
app.use(express.urlencoded())

const dbclient = require(__dirname + '/dbclient');

app.get('/', (req,res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    // res.write('<html><body><p>This is home Page. </p></body></html>');
    res.end();
});


app.get('/mainScreen.js', (req, res) => {
    res.sendFile(__dirname + '/mainScreen.js');
});

app.get('/mainScreen.css', (req, res) => {
    res.sendFile(__dirname + '/css/mainScreen.css');
});

app.get('/testing', (req, res) => {
    res.sendFile(__dirname + '/html/testing.html');
});

app.get('/main', async (req, res) => {
    res.sendFile(__dirname + '/html/mainScreen.html');
});

app.post('/main/', async (req, res) =>{
    dbclient.connect();
    console.log(req.body.rname);

    
    var newUser = new User({
        username: req.body.rname,
        pass: req.body.rname,
        email: req.body.remail,
    });

    const existUsername = await User.exists({username: req.body.rname});
    const existEmail = await User.exists({email: req.body.remail});
    if (existUsername || existEmail) {
        console.log('Username or Email has been used. |uwu|')
    } else {
        newUser.save(function(err, doc){
            if(err) return console.error(err);
            console.log("User has inserted successfully!");
        });
    }
    
});

app.post('/testing', async (req,res) => {

    var newUser = new User({
        username: req.body.rname,
        pass: req.body.rname,
        email: req.body.remail,
    });

    const existUsername = await User.exists({username: req.body.rname});
    const existEmail = await User.exists({email: req.body.remail});


    var lusername = req.body.lname;
    var lpassword = req.body.lpass;

    User.findOne({username: lusername, password: lpassword}, function(err, user){
        if(err){
            console.log(err);
        } else
        res.sendFile(__dirname + '/html/testing.html');
    })
})
app.get('/subscriptions',(req, res) => {
    res.sendFile(__dirname + '/html/subscriptions.html');
});

app.get('/subscriptions.css',(req, res) => {
    res.sendFile(__dirname + '/css/subscriptions.css');
    
});

app.get('/subscriptions.js', (req, res) => {
    res.sendFile(__dirname + '/subscriptions.js');
});

app.get('/statistics',(req, res) => {
    res.sendFile(__dirname + '/statistics.html');
});

app.get('/statistics.css',(req, res) => {
    res.sendFile(__dirname + '/statistics.css');
});

app.listen(22452);

console.log('Server is currently running...');
