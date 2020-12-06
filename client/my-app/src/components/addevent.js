import React, { Component,useContext,useState } from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { EventContext } from './EventContext';

const AddEvent = () => {
    const [events,setEvents,updateevent,addEvent] = useContext(EventContext)
    const [eventname,setEventname] = useState('')

    

    return ( 

        
        <Container maxWidth="sm" style={{textAlign: "center", marginTop: "25px"}}>
             <TextField id="standard-basic" label="Event Name"  onChange={(e)=>setEventname(e.target.value)}/><br/><br/>
             <Button  onClick={ () =>  addEvent(eventname) }   variant="contained">Add Event</Button>



        </Container>


    );
}
 
export default AddEvent;