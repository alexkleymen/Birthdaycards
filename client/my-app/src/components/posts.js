import React, { Component,useEffect,useState,useContext } from 'react';
import {UserContext} from '../App'
import axios from'axios'
import {Link} from 'react-router-dom'
import {useLocation} from 'react-router-dom'
import { PostsContext } from './PostsContext';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Post from './post'
import { Container } from '@material-ui/core';
import Button from '@material-ui/core/Button';


const Posts = (props) => {
    const [posts] = useContext(PostsContext)
    const [eventposts,setEventposts] = useState([])
    const location = useLocation()

    useEffect(()=>{
    
        setEventposts(posts.filter(post=>post.event===location.state.id))
       
        
    },[posts])
    
   

    return ( 
        <Grid container spacing={3} justify="center"> 

            {
            
            eventposts.map((element,index) => { return (
        
            <Grid  style={{marginTop: '20px'}}  key={index}  item xs={12} sm={6} lg={3}>
            
            <Post data={element}/>

            </Grid>
            

            )
            })}

            <Container style={{textAlign: "center", marginTop: "50px"}}>

            <Link to={{pathname:'/addpost',state : {id: location.state.id }}} style={{ textDecoration: 'none' }}>
                 <Button variant="contained">Add Post</Button>
            </Link>

                
            </Container>

        </Grid>
     );
}
 
export default Posts;