import React, { Component,createContext,useEffect,useState } from 'react';

import axios from 'axios'
export const PostsContext = createContext()

const PostsContextProvider = (props) => {
    const [posts,setPosts]  = useState([])
    const [updated,setUpdated] = useState(false)

    const addPost = (post,id) => {
        axios.post('http://localhost:5000/event/post/' + id,post).then(res=>{
            if(res.status===200) alert('Post Added')
            setUpdated(!updated)

        })
    }


    const updatePost = (post,id) => {
        debugger
        axios.put('http://localhost:5000/posts/' + id , post).then(res=>{
            if(res.status===200) alert('Post Updated')
            setUpdated(!updated)
        })
    }


    const deletePost = (id) => {
        
        axios.delete('http://localhost:5000/posts/' + id).then(res=>{
            if(res.status===200) alert('Post Deleted')
            
            setUpdated(!updated)
            
        })
    }

  





    useEffect(()=>{
        axios.get("http://localhost:5000/posts/").then(resp=>{
            setPosts(resp.data)
            
            
        })
    },[updated])

    return ( 
        <PostsContext.Provider value={[posts,addPost,updatePost,deletePost]}>
            {props.children}
        </PostsContext.Provider>
     );
}
 
export default PostsContextProvider;