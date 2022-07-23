import React, { useState,useEffect } from "react";
import axios from 'axios'
import { useNavigate } from "react-router";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
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
import {  CardActionArea } from '@mui/material';



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
    const [users,setUsers]=useState()
    const test = localStorage.getItem('pseudo')
    const nameImg=localStorage.getItem('name')
    const imgUrl=localStorage.getItem('imgUrl')
    const getUrl = () => {
      return axios
        .get("http://localhost:5000/img")
        .then((res) => {
          console.log(setUrl(res.data))
          setFromSignUp(true)
          ;
        })
        .catch((err) => console.error(err));
    };

  
    useEffect(() => {
      getUrl();
    },[] );

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
    <p>{nameImg}</p>
     {url.map((img)=>{
      return(
     <Card sx={{ maxWidth: 370, /*maxHeight:300*/ }}>
      <CardHeader
        avatar={
          <Avatar alt="Cindy Baker" src={process.env.PUBLIC_URL + img.userPicture}/>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
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
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
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
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
          </Typography>
          <Typography paragraph>
          </Typography>
          <Typography paragraph>
          </Typography>
          <Typography>
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
    )})}
    </div>
    
  );
}

export default HomePage;
