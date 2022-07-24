import React, { useState,useEffect } from "react";
import axios from 'axios'
import { useNavigate } from "react-router";
import {Link} from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
//import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {  CardActionArea, getDialogContentTextUtilityClass } from '@mui/material';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import Modal from '@mui/material/Modal';
import { get } from "mongoose";

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

const theme = createTheme();
const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
function HomePage() {
  
    const [checkBox,setCheckBox]= useState(false)
    const [FromSignUp,setFromSignUp]=useState(false)
    const [url,setUrl]=useState([])
    const [user,setUser]=useState([])
    const [upgradeComment,setUpgradeComment]=useState({})
    const [upgradeLike,setUpgradelike]=useState()
    const [post, setPost] = React.useState(null);
    const [comment,setComment]=useState()
    const[onePost,setOnePost]=useState([])
    const [open, setOpen] = React.useState(false);
    const test = localStorage.getItem('pseudo')
    const nameImg=localStorage.getItem('name')
    const imgUrl=localStorage.getItem('imgUrl')

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
        .get(`http://localhost:5000/users/${test}`)
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

    const onSubmit=()=>{
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
            console.log(setPost(response.data))

            ;
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
      {/*<p>{test}</p>
      { FromSignUp===false?
      <img src={process.env.PUBLIC_URL + imgUrl} ></img>
      :
      <img src={process.env.PUBLIC_URL + url} ></img>
      }
    <FormGroup>
            <FormControlLabel control={<Checkbox   />} label="darkMode
            "  onChange={()=>{checkBox===true?setCheckBox(false):setCheckBox(true)}}/>
    </FormGroup>
    {checkBox===true?
    
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <main>  
        
      </main>
    </ThemeProvider>
    :
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>  
        
      </main>
    </ThemeProvider>
    */}
     {url.map((img)=>{
      if(img.isAssociation===true){
      return(
     <Card sx={{ maxWidth: 370, /*maxHeight:300*/ }}>
      <CardHeader
        avatar={
        
          <Link to="/profil_asso/:_id">
              <button style={{border:"none",background:"none"}}>
              <Avatar alt="Cindy Baker" src={process.env.PUBLIC_URL + img.userPicture}/>
              </button>
            </Link>
          
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={img.title}
        subheader={img.datePost}
      />
      <CardMedia
        component="img"
        height="150"
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
               <Button variant="contained" color="secondary" onClick={onSubmit}>submit</Button>
          </Box>
        </Box>
        </Modal>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
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
    </div>
    
  );
}

export default HomePage;
