import React, { Component, useEffect,useState,useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {Switch,Link} from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import './Comp.css'
import { EventContext } from './EventContext';


const useStyles = makeStyles((theme) => ({
   
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      height : '130px',
      
    }
    
  }));



const Event = (props) => {
    const [events,setEvents,updateevent,addEvent,deleteEvent] = useContext(EventContext)
    const classes = useStyles();
    const [name,setName] = useState('')
    const [hidden,setHidden] = useState(true)
    const [eventname,setEventname] = useState('')

   

    const openHidden = () => { 
        setHidden(!hidden)
    }

    const submit = (e) => {
        openHidden()
        props.callback({name: eventname, id: props.data._id})
    }


    
    




    const style = hidden ? 'hidden' : ''

    
    return ( 

        
        <Paper className={classes.paper} style={{fontSize: '25px'}}>{props.data.name}<br/>
        

         
            <Link to={{pathname:'/posts',state : {id: props.data._id }}} style={{ textDecoration: 'none' }}>
              <Button color="primary">Posts</Button>  
            </Link>
            


            <Button color="primary" onClick={openHidden}>Edit</Button>


            <Button color="primary" onClick={()=>deleteEvent(props.data._id)} >Delete</Button>


            <div className={style}>
            <TextField id="standard-basic" label="name" onChange={(e)=>setEventname(e.target.value)} /> <br/>
            <Button color="primary" onClick={submit}>Submit</Button>
            </div>
        
        </Paper>
        
     );
}
 
export default Event;