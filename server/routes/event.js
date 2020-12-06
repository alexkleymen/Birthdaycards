const e = require('express');
const express = require('express');

const router = express.Router();



const event = require('../config/modules/event')
const Post = require('../config/modules/post')
const user = require('../config/modules/users')

// get all events
router.get("/",(req,res)=>{
    event.find({},function(err,events){
        if(err) res.send(err)
        else res.send(events)
    })
})


//get event by id 
router.get("/:id",(req,res)=>{
    let id = req.params.id
    event.findById(id,function(err,events){
        if(err) res.send(err)
        else res.send(events.data)
    })
})


// add new event 

router.post("/:id",async (req,res)=>{
    let id = req.params.id;
    const name = req.body.name

    const newEvent = new event({name: name, user: id})
    await newEvent.save()

    /* new event({name: name
    }).save(function (err,result){
        if(err) res.send('we got an error')
        else res.send(result)
    }) */

    let userEvent = await user.findById(id)
    userEvent.events.push(newEvent)
    await userEvent.save()

    res.status(200).send(newEvent)
})


// delete event 

router.delete("/:id",async (req,res)=>{
    let id = req.params.id ;
    event.findByIdAndDelete(id,async function(err,events){
        if(err) res.send(err)
        else {
            // deleting the corosponding events for the user
            let userToDeleteEventFrom = await user.findById(events.user).lean()
            let userEvents = userToDeleteEventFrom.events
            userEvents = JSON.stringify(userEvents)
            userEvents = JSON.parse(userEvents)
            userEvents = userEvents.filter(el=>el!==id)
            let newUserEvents = await user.findByIdAndUpdate(events.user,{$set : {events:userEvents}})
            res.send(newUserEvents) 
        }
    })
})


// update event header

router.put("/:id",(req,res)=>{
    let id = req.params.id;
    const name = req.body.name
    event.findByIdAndUpdate(id,{name:name},function(err,events){
        if(err) res.send(err.data)
        else res.send(events)
    })
})


// add post to an event 

router.post("/post/:id",async (req,res)=>{
    let id = req.params.id;
    const postToAdd = new Post({
        name : req.body.name ,
        content: req.body.content,
        picture: req.body.picture,
        event : id
    });

    postToAdd.save().then((err,doc)=>{
        if(err) res.send(err)
        else res.send(doc)
    })

    const evetToUpdate = await event.findById(id)
    evetToUpdate.posts.push(postToAdd)
    const newEvent = await evetToUpdate.save()
    

 /*    event.findById(id).
    populate(
        'posts'
    ).
    exec(function(err,res){
        if(err) res.send(err)
        else res.send(res.posts)
    }) */
})



module.exports = router;