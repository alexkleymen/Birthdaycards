require('dotenv').config()
const app = require('express')();
const server = require('http').createServer(app);


const cors = require('cors');
const { Router } = require('express');
var login = require('./routes/login')
var event = require('./routes/event');
var users = require('./routes/users');
var posts = require('./routes/posts')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }))  
   .use(bodyParser.json());



app.use(cors())


app.use('/login',login)
app.use('/event',event)
app.use('/users',users)
app.use('/posts',posts)





   


server.listen(process.env.SERVER);