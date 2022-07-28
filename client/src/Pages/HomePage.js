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
import { Grid } from "@mui/material";

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

    const [allPosts,setAllPosts]=useState([])
    const [user,setUser]=useState([])
    const [upgradeComment,setUpgradeComment]=useState({})
    const [post, setPost] = React.useState(null);
    const [comment,setComment]=useState()
    //state qui permet de récupérer le pseudo d'un post en particulier pour l'envoyer vers la page profil
    const [onePost,setOnePost]=useState({
      pseudo:"",
      isVisitor:Boolean
    })
    /********* */
    const [getAllPost,setGetAllPost]=useState([])
    const [open, setOpen] = React.useState(false);
    const connectedUser =sessionStorage.getItem('pseudo')
    const nameImg=sessionStorage.getItem('name')
    const imgUrl=sessionStorage.getItem('imgUrl')
    
   
    const navigate=useNavigate()

   //récupère les données des de la collection img afin de pouvoir les afficher avec le map 
    const getPosts = () => {
      return axios
        .get("http://localhost:5000/img")
        .then((res) => {
          console.log(setAllPosts(res.data))
          
          ;
        })
        .catch((err) => console.error(err));
    };

    //récupère les infos de l'utilisateur connecté pour les réutiliser entre autre dans l'affichage de photo navbar
    const getUser = () => {
      return axios
        .get(`http://localhost:5000/users/${connectedUser}`)
        .then((res) => {
          console.log(setUser(res.data))
          ;
        })
        .catch((err) => console.error(err));
    };
    //permet d'enregistrer le pseudo d'un post en particulier et de se rendre à la page souhaitée
      const  getAllPostofOne=()=>{
      const pseudoPost = sessionStorage.setItem("pseudoOnePost",onePost.pseudo)
      const isVisitor= sessionStorage.setItem("isVisitor",onePost.isVisitor)
          
          if (onePost.isVisitor===true){
              navigate("/profil_asso/:_id/")
          }
          else{
            console.log("pas encore")
          }
     }

    
     useEffect(() => {
      getPosts();
      getUser() 
     },[]);
     
     useEffect(()=>{
      getAllPostofOne()
     })
    //ajoute un commentaire au post dans la base de donnée
    const onSubmitComment=()=>{
      var canUseComment=[]
        console.log(upgradeComment.commentsOnePost[0])
        canUseComment.push(comment)  
        for(let i=0;i<upgradeComment.commentsOnePost.length;i++){
          canUseComment.push(upgradeComment.commentsOnePost[i])
        }
        for(let j=0;j<canUseComment.length;j++){
          console.log(canUseComment[j])
        }
        
        return axios
          .put(`http://localhost:5000/img/${upgradeComment.imgOnePost}`,{comments:canUseComment})
          .then((response) => {
            console.log(setPost(response.data));
          })
          .catch((err) => console.error(err));  
    }

    
    
    

   //fonctions qui prennent en charge l'expend des cards, natif MUI
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
     {/*affichage des posts (img dans ma base de donnée)*/}
     {allPosts.map((img)=>{
      if(img.isAssociation===true){
      return(
      <Grid spacing={2}>
     <Card sx={{ py:5,maxWidth: 370,}}>
      <CardHeader
        avatar={
              <button style={{border:"none",background:"none"}} onClick={(e)=>{setOnePost({pseudo:img.userPseudo,isVisitor:true})}}>
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
    </Grid>
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
              <button  style={{border:"none",background:"none"}} >
              <Avatar alt="Cindy Baker" src={process.env.PUBLIC_URL + user.imgProfilUrl}/> 
              </button> 
          </IconButton>
        </Toolbar>
      </AppBar>
    </React.Fragment>
    </div>
    
  );
}

export default HomePage;
