import { useNavigate } from "react-router";
import React, { useEffect, useState } from "react";
import "../style/index.scss";
import logo from "../img/logo_color_charyDEEp.png";
//import { UserContext } from "../userContext.js";
import axios from 'axios'
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
import mongoose from "mongoose";


const AddEvenement=()=>{
  
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
        console.log(today)
        break
      }
      else(
        console.log("not the good day")
      )
    }
    
    const tabMonth=["January","February","March","April","May","June","July","August","September","October","November",
    "December"
  ]
  var month =""
  for(let i=0;i<tabMonth.length;i++){
    if(i===Month)
    {
      month+=tabMonth[i]
      console.log(month)
      break
    }
    else(
      console.log("not the good Month")
    )
  }
  var postDate= today+" "+day+"."+month+"."+Year
  console.log(postDate)

  //const { user, login,changeUser } = useContext(UserContext);
    const pseudo=localStorage.getItem('pseudo')
    const [user,setUser]=useState([])
    const [Img, setImg] = useState([]);
    const [uploadImg, setUploadImg] = useState()
    const [title,setTitle]= useState({
        title:"",
    })
    const[message,setMessage]=useState({
      message:""
    })
   
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


   
  
    
    const navigate = useNavigate();


    const updateImg = (event) => {
       setUploadImg(event.target.files[0]);
      
    }
    // This function will handle the submission.
    
    async function onSubmit(e) {
      e.preventDefault();
      // When a post request is sent to the create url, we'll add a new record to the database.
      
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
     
      const IdImg = localStorage.setItem("name",uploadImg.name)
      const titleImg= localStorage.setItem("title",title.title)
      const bodyImg= localStorage.setItem("message",message.message)
      
      for (var value of data.values()) {
        console.log(value);
     }
      
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
    return(
        
        <div className="events-container">
      <div className="events-header" >
        <img className="img-logo" src={logo} alt="Logo"  />
      </div>
      <div className="event-form-container">
        
        <form>
        <h1>Créer votre évènement</h1>
        <p>{pseudo}</p>
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
    </div>
  );
                  
}

export default AddEvenement