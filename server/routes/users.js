const express = require('express');

const router = express.Router();
const user = require('../config/modules/users')

// get all users
router.get("/",(req,res)=>{
    user.find({},function(err,events){
        if(err) res.send(err)
        else res.send(events)
    })
})






module.exports = router;