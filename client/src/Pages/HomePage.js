import React, { useState,useEffect } from "react";
import axios from 'axios'
import { useNavigate } from "react-router";
import {Link} from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import Modal from '@mui/material/Modal';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Fab from '@mui/material/Fab';
import SvgIcon from '@mui/material/SvgIcon';
import SendSharpIcon from '@mui/icons-material/SendSharp';

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: '0 auto',
});
function HomePage() {

    const [url,setUrl]=useState([])
    const [user,setUser]=useState([])
    const [upgradeComment,setUpgradeComment]=useState({})
    const [post, setPost] = React.useState(null);
    const [comment,setComment]=useState()
    const [onePost,setOnePost]=useState([])
    const [picturePost,setPicturePost]=useState("")
    const [open, setOpen] = React.useState(false);
    const connectedUser = localStorage.getItem('pseudo')
    const nameImg=localStorage.getItem('name')
    const imgUrl=localStorage.getItem('imgUrl')
    
    console.log(imgUrl)
    const navigate=useNavigate()
    const getUrl = () => {
      return axios
        .get("http://localhost:5000/img")
        .then((res) => {
          console.log(setUrl(res.data))
          
          ;
        })
        .catch((err) => console.error(err));
    };
    const getUser = () => {
      return axios
        .get(`http://localhost:5000/users/${connectedUser}`)
        .then((res) => {
          console.log(setUser(res.data))
          ;
        })
        .catch((err) => console.error(err));
    };

    
     useEffect(() => {
      getUrl();
      getUser()
      
    },[] );

    const onSubmitComment=()=>{
      var canUse=[]
        console.log(upgradeComment.commentsOnePost[0])
        canUse.push(comment)  
        for(let i=0;i<upgradeComment.commentsOnePost.length;i++){
          canUse.push(upgradeComment.commentsOnePost[i])
        }
        for(let j=0;j<canUse.length;j++){
          console.log(canUse[j])
        }
        
        return axios
          .put(`http://localhost:5000/img/${upgradeComment.imgOnePost}`,{comments:canUse})
          .then((response) => {
            console.log(setPost(response.data));
          })
          .catch((err) => console.error(err));  
    }


    const ExpandMore = styled((props) => {
      const { expand, ...other } = props;
      return <IconButton {...other} />;
    })(({ theme, expand }) => ({
      transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    }));
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
    const handleOpen = () => {setOpen(true)
    };
    const handleClose = () => setOpen(false);
    
  return (
    
    <div>
     {url.map((img)=>{
      if(img.isAssociation===true){
      return(
     <Card sx={{ py:5,maxWidth: 370,}}>
      <CardHeader
        avatar={
              <button style={{border:"none",background:"none"}}>
              <Avatar alt="Cindy Baker" src={process.env.PUBLIC_URL + img.userPicture}/>
              </button>     
        }
        action={
          <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
        }
        title={img.title}
        subheader={img.datePost}
      />
      <CardMedia
        component="img"
        height="130"
        image={process.env.PUBLIC_URL + img.pictureUrl}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon  />
        </IconButton>
        <button style={{border:"none",background:"none"}} onClick={()=>{setUpgradeComment({imgOnePost:img.pictureName,
        commentsOnePost:img.comments, likeOnePost:img.like
        })}}>
          <IconButton aria-label="share" onClick={handleOpen}>
            <ChatBubbleOutlineRoundedIcon />
          </IconButton>
        </button>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            >
              <TextField
                id="outlined-uncontrolled"
                label="your comment"
                defaultValue="foo"
                color="secondary"
                onChange={(e)=>{setComment(e.target.value)}}
              />
               <Button variant="contained" color="secondary" onClick={onSubmitComment}>submit</Button>
          </Box>
        </Box>
        </Modal>


      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{img.message}</Typography>
          <Typography paragraph>comments:</Typography>
          {img.comments.map(comment=>{
            return(
              <div>
              <Typography paragraph>{comment}</Typography>
              </div>
            )
          }) 
          }
          <Typography>
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
    )}
    else(console.log("not an association"))
    })}
     <React.Fragment>
      <CssBaseline />
      <AppBar position="fixed" color="secondary" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar>
        <Link to='/homePage'>
            <IconButton color="inherit" aria-label="open drawer">
              <HomeIcon className="textd"/>
            </IconButton>
          </Link>
          <Link to='/profil_asso/:_id/add_evenement'>
            <IconButton color="inherit" aria-label="open drawer">
              <SendSharpIcon className="textd"/>
            </IconButton>
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit">
              <Avatar alt="Cindy Baker" src={process.env.PUBLIC_URL + imgUrl}/>  
          </IconButton>
        </Toolbar>
      </AppBar>
    </React.Fragment>
    </div>
    
  );
}

export default HomePage;
