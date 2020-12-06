import React, { Component,useEffect,useContext,useState,createContext } from 'react';
import {UserContext} from '../App'

import axios from 'axios'



export const EventContext = createContext()


const EventsContextProivder = (props) => {

    const [events,setEvents] = useState([])
    const [user,setUser] = useContext(UserContext)
 
useEffect(()=>{
    
    axios.get('http://localhost:5000/event/').then(resp=>{
        let allEvents = resp.data;
        let userEvent = allEvents.filter(event=>event.user == user.id)
        setEvents(userEvent)
        
        
    })

},[user])

const updateevent = ({name,id}) => { 
    let event = events.filter(event=>event._id===id)
    event = event[0]
    debugger
    let index = events.findIndex(event=>event._id===id)
    event.name = name;
    let allEvents = [...events]
    allEvents.splice(index,1,event)
    setEvents(allEvents)
    axios.put("http://localhost:5000/event/" + id ,{
        "name" : name
    }).then(res=>{
        debugger
        console.log(res)
    })
}


const addEvent = (name) =>{

    
   
    axios.post("http://localhost:5000/event/" + user.id,{
        "name": name
    }).then(res=>{
        
        setEvents(events=>[...events,res.data])
    })
}


const deleteEvent = (id) =>{
    let index = events.findIndex(event=>event._id===id)
    let newEvents = [...events]
    newEvents.splice(index,1)
    setEvents(newEvents)
    axios.delete("http://localhost:5000/event/" + id)
    .then(res=>{
        console.log(res)
    })
}


    return  ( 
       
        <EventContext.Provider value={[events,setEvents,updateevent,addEvent,deleteEvent]}>
            {props.children}
        </EventContext.Provider>
        
      
     ) 
}
 
export default EventsContextProivder;