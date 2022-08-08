import { useNavigate, } from "react-router";
import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import "../style/index.scss";
import logo from "../img/logo_color_charyDEEp.png";
import axios from 'axios'
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Fab from '@mui/material/Fab';
import Avatar from '@mui/material/Avatar';
import SvgIcon from '@mui/material/SvgIcon';
import SendSharpIcon from '@mui/icons-material/SendSharp';


const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: '0 auto',
});

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}


const AddEvenement=()=>{
  const testPseudo= sessionStorage.getItem("pseudoOnePost")
  const testIsVisitor= sessionStorage.getItem("isVisitor")
  //donne la date du post
    const date=new Date()
    const day = date.getDate() 
    const dayWeek= date.getDay()
    const Year= date.getFullYear()
    const Month= date.getMonth()
  
    var today=""
    const tabDayWeek=["sunday","monday","twesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
    for(let i=0;i<tabDayWeek.length;i++){
      if(i===dayWeek)
      {
        today+=tabDayWeek[i]
        break
      }
      else{
        console.log("not the good day")
      }
    }
    
    const tabMonth=["January","February","March","April","May","June","July","August","September","October","November",
    "December"
  ]
  var month =""
  for(let j=0;j<tabMonth.length;j++){
    if(j===Month)
    {
      month+=tabMonth[j]
      console.log(month)
      break
    }
    else(
      console.log("not the good Month")
    )
    
  }
  var postDate= today+" "+day+"."+month+"."+Year
    console.log(postDate)
//******** */
    
//récupère le pseudo de l'utilisateur pour l'utiliser dans un fetch get lorsque l'on arrive sur la page
    const pseudo=sessionStorage.getItem("pseudo")
//***** */    
    const [user,setUser]=useState([])
    const [Img, setImg] = useState([]);
    const [uploadImg, setUploadImg] = useState()
    const [title,setTitle]= useState({
        title:"",
    })
    const[message,setMessage]=useState({
      message:""
    })
//récupère les infos de l'utilisateur connecté lors du chargement de la page    
    const getUser=()=>{
      return axios
      .get(`http://localhost:5000/users/${pseudo}`)
      .then((res) => {
        console.log(setUser(res.data)) 
        ;
      })
      .catch((err) => console.error(err));
  };
    
      useEffect(() => {
        getUser();
      }, []);
//********* */    
    const navigate = useNavigate();

//récupère l'image lorsqu'elle est choisie par l'utilisateur    
    const updateImg = (event) => {
       setUploadImg(event.target.files[0]);  
    }
   
    async function onSubmit(e) {
      e.preventDefault();
//ajoute les informations précisées avec append qui vont être ajoutées à l'objet Formdata       
      const data = new FormData();
      data.append('name','josephine')
      data.append('file',uploadImg)
      data.append('title',title.title)
      data.append('message',message.message)
      data.append('userPseudo',user.pseudo)
      data.append('userEmail',user.email)
      data.append('userPicture',user.imgProfilUrl)
      data.append('isAssociation',user.isAssociation)
      data.append('datePost',postDate)
      data.append('sortCompare',Date.now())
//***** */

//permet de passer outre le regarchement des pages et de stocker des infos qui pourront être réutiliser dans 
//d'autres pages
      const IdImg = sessionStorage.setItem("name",uploadImg.name)
      const titleImg= sessionStorage.setItem("title",title.title)
      const bodyImg= sessionStorage.setItem("message",message.message)
      
 //****** */  
 
 //envois les données du post vers la base de donnée
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
    }
      axios.post("http://localhost:5000/img",data,config)
      .then((response)=>{(console.log(response.data))
    }) 
      .catch(error => {
       console.log(error);
      });
      
     navigate("/homePage")
    }
 //******* */   
    return(
        <div className="events-container">
      <div className="events-header" >
        <img className="img-logo" src={logo} alt="Logo"  />
      </div>
      <div className="event-form-container">
        
        <form>
        <h1>Créer votre évènement</h1>
          <label className="form-container" for="mytitle">
            Le titre
            <input type="text" onChange={(e)=>{setTitle({title:e.target.value})}}></input>
          </label>
          <label className="form-container" for="myfile">
            <p>Votre image</p>
            <Stack direction="row" alignItems="center" spacing={2} >
              <IconButton 
                sx={{ color: "purple"}}
                aria-label="upload picture"
                component="label"
              >
                <input hidden accept="image/*" type="file" onChange={updateImg} />
                <PhotoCamera  fontSize="large"/>
              </IconButton >
            </Stack>
          </label>

          <label className="form-container">
            La description
            <input type="text" onChange={(e)=>{setMessage({message:e.target.value})}}></input>
          </label>
          <button
            className="form-btn"
            type="submit"
            form="nameform"
            value="Submit"
            onClick={onSubmit}
          >
            Créer
          </button>
        </form>
      </div>
      <React.Fragment>
      <CssBaseline />
      <AppBar position="fixed" color="secondary" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar>
        <Link to='/homePage'>
            <IconButton color="inherit" aria-label="open drawer" >
              <HomeIcon className="textd"/>
            </IconButton >
          </Link>
          <Link to='/profil_asso/:_id/add_evenement'>
            <IconButton color="inherit" aria-label="open drawer"className="textd">
              <SendSharpIcon className="textd"/>
            </IconButton>
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit">
              <Avatar alt="Cindy Baker" src={process.env.PUBLIC_URL + user.imgProfilUrl}/>  
          </IconButton>
        </Toolbar>
      </AppBar>
    </React.Fragment>
    </div>
  );
                  
}

export default AddEvenement