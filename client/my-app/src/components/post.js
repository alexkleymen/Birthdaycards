import React , {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { CardMedia } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { blue, green } from '@material-ui/core/colors';
import {Link} from 'react-router-dom'
import './Comp.css'
import { PostsContext } from './PostsContext';

const useStyles = makeStyles((theme) => ({
    root: {
      padding: theme.spacing(1),
      [theme.breakpoints.down('sm')]: {
        backgroundColor: theme.palette.secondary.main,
      },
      [theme.breakpoints.up('md')]: {
        backgroundColor: theme.palette.primary.main,
      },
      [theme.breakpoints.up('lg')]: {
        backgroundColor: green[500],
        fontSize: '1.5rem',
        
      },
    },
     media: {
    height: 200,
    

  },
  }));




export default function Post({data}) {
  const classes = useStyles();
  const [posts,addPost,updatePost,deletePost] = useContext(PostsContext)

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://www.yo-yoo.co.il/coolpics/images/uploads/4c8498.jpeg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {data.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {data.content}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Link to={{pathname:'/editpost',state : {id: data._id }}} style={{ textDecoration: 'none' }}>
                 <Button size="small" color="primary">Edit</Button>
            </Link>
        <Button size="small" color="primary" onClick={()=>deletePost(data._id)}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
