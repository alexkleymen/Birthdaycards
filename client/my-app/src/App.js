import React,{useState} from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import SignIn from './components/login'
import Regester from './components/regester'
import Events from './components/events'
import Posts from "./components/posts";
import AddEvent from "./components/addevent"
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CakeIcon from '@material-ui/icons/Cake';
import EventsContextProivder from './components/EventContext'
import PostsContextProvider from './components/PostsContext'
import AddPost from "./components/addpost";
import EditPost from './components/editpost'
export const UserContext = React.createContext([])


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  app : {
    backgroundColor: "#696969"
  }
}));

function App() {
  const [user,setUser] = useState('')
  const classes = useStyles();

  return (
  <UserContext.Provider value={[user,setUser]}>
    <EventsContextProivder>
      <PostsContextProvider>
        <div className={classes.root}>
           <AppBar position="static" className={classes.app}>
               <Toolbar>
                   <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                     <CakeIcon />
                   </IconButton>
                      <Typography variant="h6" className={classes.title}>
                      
                      </Typography>
                        <Link to='/Signin' style={{ textDecoration: 'none' }} > 
                          <Button style={{color: "white"}}>Login</Button>
                        </Link>
                        
                        <Link to='/Events' style={{ textDecoration: 'none' }} > 
                          <Button style={{color: "white"}}>View Events</Button>
                        </Link>
                        
                        <Link to='/addevent' style={{ textDecoration: 'none' }} > 
                          <Button style={{color: "white"}}>Add Event</Button>
                        </Link>
                </Toolbar>
            </AppBar>
        </div>
    <div>
      <Switch>
        <Route exact path='/Signin'> <SignIn/> </Route>
        <Route path='/Regester'> <Regester/> </Route>
        <Route path='/Events'> <Events/> </Route>
        <Route path = '/addevent'>  <AddEvent/>  </Route>
        <Route path = '/posts'>  <Posts/>  </Route>
        <Route path='/addpost'>  <AddPost/>  </Route>
        <Route path='/editpost'>  <EditPost/>  </Route>
        
      </Switch>
    </div>
      </PostsContextProvider>
    </EventsContextProivder>
  </UserContext.Provider>
  );
}

export default App;
