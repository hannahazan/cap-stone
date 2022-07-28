
import "../style/index.scss";
import { useNavigate, } from "react-router";
import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import axios from "axios"
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import SearchIcon from "@mui/icons-material/Search";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CardHeader from "@mui/material/CardHeader";
import Tooltip from "@mui/material/Tooltip";
import HomePage from "./HomePage.js";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ButtonGroup from "@mui/material/ButtonGroup";
import FolderIcon from "@mui/icons-material/Folder";
import RestoreIcon from "@mui/icons-material/Restore";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AddReactionOutlinedIcon from "@mui/icons-material/AddReactionOutlined";


export default function ProfilAsso(props) {
  const pseudo=sessionStorage.getItem("pseudoOnePost")
  const isVisitor=sessionStorage.getItem("isVisitor")
  const connectedUser =sessionStorage.getItem('pseudo')
  const connectedUserAvatar= sessionStorage.getItem('imgUrl')
  
  const [userPostData,setuserPostdata]=useState([])
  const [userPost, setUserPost]=useState([]);
  const [connectedUserData,setConnectedUserData]=useState([]);
  const [follow,setFollow]=useState({
    follower:"",
    followerAvatar:""
  })
  const [addFollower,setAddfollower]=useState()
  const profilcards = [1];

  const getUserPostData=()=>{
    return axios
    .get(`http://localhost:5000/users/${pseudo}`)
    .then((res) => {
      console.log(setuserPostdata(res.data)) 
      ;
    })
    .catch((err) => console.error(err));
  }
  const getUserPost=()=>{
    return axios
    .get(`http://localhost:5000/img/pseudo/${pseudo}`)
    .then((res) => {
      console.log(setUserPost(res.data)) 
      sessionStorage.setItem("avatar",res.data[0].userPicture)
      ;
    })
    .catch((err) => console.error(err));
};

  const getConnectedUser=()=>{
    return axios
    .get(`http://localhost:5000/users/${connectedUser}`)
    .then((res) => {
      console.log(setConnectedUserData(res.data)) 
      ;
    })
    .catch((err) => console.error(err));
  }
    
      useEffect(() => {
        getUserPost();
        getConnectedUser();
        getUserPostData();
      }, []);

      const handleSubmit=()=>{
        setFollow({
          follower:connectedUser,
          followerAvatar:connectedUserAvatar
        })
      }
      const AddFollower=()=>{
        if (follow.follower !==""){
        var canUseFollow = []
        canUseFollow.push(follow)
        for(let i=0;i < userPostData.followers.length;i++) {
          canUseFollow.push(userPostData.followers[i])
        }
        return axios
        .put(`http://localhost:5000/users/${pseudo}`,{followers:canUseFollow})
        .then((response) => {
          console.log(setAddfollower(response.data));
        })
        .catch((err) => console.error(err)); 
      }else{
        console.log("none is following you!")
      } 
      }
      useEffect(()=>{
        AddFollower()
      })
      
      const avatar=sessionStorage.getItem("avatar")
  return (
    <Container sx={{ py: 5 }} maxWidth="md" style={{background:"radial-gradient(#DF65CD69,#FBBC0580)"}}>
      <Grid
        container
        sx={{ height: "100%", display: "flex", flexDirection: "column" }}
      >
        <Grid container xs={12}>
          <Grid sx={{ height: "100%", display: "flex", flexDirection: "row" }}>
            
            <Grid xs={3} sx={{ height: "100%", display: "flex" }}>
              <Avatar
                alt="Remy Sharp"
                src={process.env.PUBLIC_URL + avatar}
                sx={{ width: 90, height: 90 }}
              />
            </Grid>
            <Grid
              xs={9}
              sx={{
                paddingLeft: 2,
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <BottomNavigation
                container
                xs={12}
                sx={{ width: "100%", display: "flex", flexDirection: "row" }}
              >
                <Grid
                  xs={4}
                  sx={{
                    height: "50%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <BottomNavigationAction 
                    label="Follow"
                    value="follow"
                    icon={<AddReactionOutlinedIcon fontSize="large"className="iconP" />}
                    onClick={handleSubmit}
                  />
                  <p classeName="p_icons"style={{ textAlign: "center",fontFamily:"poppins",fontSize:"18px" }}>Follow</p>
                </Grid>

                <Grid
                  xs={4}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <BottomNavigationAction
                    label="Share"
                    value="share"
                    icon={<ShareIcon fontSize="large" className="iconP" />}
                  />
                  <p classeName="p_icons"style={{ textAlign: "center",fontFamily:"poppins",fontSize:"18px" }}>Share</p>
                </Grid>

                <Grid
                  xs={4}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <BottomNavigationAction
                    label="Create"
                    value="create"
                    icon={<AddBoxIcon fontSize="large" className="iconP" />}
                    href="#"
                  />
                  <p classeName="p_icons"style={{ textAlign: "center", fontFamily:"poppins",fontSize:"18px" }}>Create</p>
                </Grid>
              </BottomNavigation>
            </Grid>
            
          </Grid>
        </Grid>

        <h1 className="myTitle">My Followers</h1>
        <Grid container spacing={3}>
          {userPostData.followers.map((foll) => (
            <Grid item  xs={3}>
              <a href="#"sx={{height: "100%",display: "flex", flexDirection: "column",justifyContent: "center",
           }}
              >
                <Avatar
                  src={process.env.PUBLIC_URL + foll.followerAvatar}
                  sx={{ width: 60, height: 60 }}
                />
              </a>
            </Grid>
          ))}
        </Grid>

        <h1 className="myTitle">My events</h1>
        <Grid container spacing={4}>
          {userPost.map((event) => (
            <Grid  xs={4} >
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <a href="#">
                  <CardMedia
                    component="img"
                    image={process.env.PUBLIC_URL + event.pictureUrl}
                    alt="random"
                  />
                </a>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    gutterBottom
                    value="title"
                    variant="h5"
                    component="h2"
                    sx={{ textAlign: "center" }}
                  >
                    <strong>{event.title}</strong>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
}