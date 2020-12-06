const express = require('express');
const router = express.Router();
require('../config/connection');
const users = require('../config/modules/users')
const {sign} = require('jsonwebtoken')
const {hash,compare} = require ('bcrypt')



  router.post("/register",async (req,res)=>{
    const {user,password} = req.body;

    // setting a new refreshToken if needed
    const refreshToken = sign({user:user},process.env.REFRESH_TOKEN_SECRET)

    // setting new haset password 
    const hashedPassword = await hash(password,10)

    // check if the user already exist in DB
    users.findOne({user: user},async function(err,result){
        // error handling to the option that the user if found
        if(result) return res.send('User already exists')
        // adding new user if the user isn't found
        else(
            new users({
                user: user,
                password: hashedPassword,
                refreshToken: refreshToken,
                }).save(function(err,user){
                    if(err) return res.send('not good at all')
                    else res.send(user)
                
                })
            )    
        }) 
    })

router.post("/", async (req,res)=>{
    const {user,password} = req.body;

    try {

        // checking if the user exists 
        let result = await users.findOne({user:user})
        if(!result) throw new Error ('User Doesnt Exist')

        // checking if the password matchs 
        const valid = await compare(password,result.password)
        if(!valid) throw new Error ('The Password Doesnt Match')

        // grand new access token
        const token = sign({user:user},process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '15m',
        })

        // sending back the token 
        res.send({
            token,
            id: result._id
        })
        

    }
    catch(err){
        res.status(401).send({error: err.message, status: 401})
        
    }
    
})


module.exports = router;