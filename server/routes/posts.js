const e = require('express');
const express = require('express');

const router = express.Router();




const posts = require('../config/modules/post')
const event = require('../config/modules/event')


// get all posts
router.get("/",(req,res)=>{
    posts.find({},function(err,post){
        if(err) res.send(err)
        else res.send(post)
    })
})


//get post by id 
router.get("/:id",(req,res)=>{
    let id = req.params.id
    posts.findById(id,function(err,post){
        if(err) res.send(err)
        else res.send(post)
    })
})



// delete post 

router.delete("/:id",async (req,res)=>{
    let id = req.params.id ;
    posts.findByIdAndDelete(id,async function(err,post){
        if(err) res.send(err)

        else {
            if(!post) return res.send('No Such User')
            let eventToDeletePostFrom = await event.findById(post.event)
            eventToDeletePostFrom = JSON.stringify(eventToDeletePostFrom)
            eventToDeletePostFrom = JSON.parse(eventToDeletePostFrom)
            let eventPosts = eventToDeletePostFrom.posts.filter(el=>el!=id)
            let updatedEvent = await event.findByIdAndUpdate(post.event,{$set:{posts:eventPosts}})
            res.send(post)
        }
    })

})


// update post

router.put("/:id",(req,res)=>{
    let id = req.params.id;
    const {name,content,picture} = req.body
 
    posts.findByIdAndUpdate(id,{name:name,content:content,picture:picture},function(err,events){
        if(err) res.send(err)
        else res.send(events)
    })
})



module.exports = router;