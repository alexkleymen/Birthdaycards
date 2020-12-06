import React, { Component,useContext,useState} from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {useLocation , useHistory} from 'react-router-dom'
import { EventContext } from './EventContext';
import { PostsContext } from './PostsContext';



const EditPost = () => {
    const location = useLocation()
    const history = useHistory()
    const [post,setPost] = useState('')
    const [posts,addPost,updatePost,deletePost]= useContext(PostsContext)

    const add = (e) => {
        setPost({...post, [e.target.name] : e.target.value})
    }


    const submit = () => {
        
        updatePost(post,location.state.id)
        history.push('Events')
    }

    

    return ( 

        
        <Container maxWidth="sm" style={{textAlign: "center", marginTop: "25px"}}>
             <TextField id="standard-basic" label="Name" name='name'  onChange={(e)=>add(e)}/><br/><br/>
             <TextField multiline  id="standard-basic" name='content' label="content"  onChange={(e)=>add(e)}/><br/><br/>
             <TextField id="standard-basic" label="Picture URL"  name='picture' onChange={(e)=>add(e)}/><br/><br/>
             <Button  onClick={submit}   variant="contained">Submit</Button>



        </Container>


    );
}
 
export default EditPost;