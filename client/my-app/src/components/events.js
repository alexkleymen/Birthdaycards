import React, { Component,useEffect,useContext,useState } from 'react';
import {UserContext} from '../App'
import axios from 'axios'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Event from './event'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import {EventContext} from './EventContext'


const Events = () => {

    
    const [user] = useContext(UserContext)
    const [events,setEvents,updateevent] = useContext(EventContext)

    






    return events.length ? ( 

        
        <Grid container spacing={3} justify="center"> 

        
        
        
            
            {
            
            events.map((element,index) => { return (
        
            <Grid  style={{marginTop: '20px'}}  key={index}  item xs={12} sm={6} lg={3}>
            
            <Event data={element} callback={updateevent}/>

            </Grid>
            

            )
            })
        }


            

        

        </Grid>
     ) : 'Loading'
}
 
export default Events;