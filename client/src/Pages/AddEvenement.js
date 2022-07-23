import { useNavigate } from "react-router";
import React, { useEffect, useState } from "react";
import "../style/index.scss";
import logo from "../img/logo_color_charyDEEp.png";
//import { UserContext } from "../userContext.js";
import axios from 'axios'
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";


const AddEvenement=()=>{
  
  //const { user, login,changeUser } = useContext(UserContext);
    const [Img, setImg] = useState([]);
    const [uploadImg, setUploadImg] = useState()
    const [title,setTitle]= useState({
        title:"",
    })
    const[message,setMessage]=useState({
      message:""
    })
    
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
      
     
    // setUploadImg("");
     navigate("/profil_asso/:_id/evenement")
    }
    return(
       /*<div>
        <form action="/" encType="multipart/form-data">
            <input type="file" name="file" onChange={ updateImg} className="form-control-file" />
            <input type="text" name="title" onChange={(e)=>{setTitle({title:e.target.value})}} placeholder="title" />
            <input type="text" name="message" onChange={(e)=>{setMessage({message:e.target.value})}} placeholder="message" />
            <button type="submit" onClick={onSubmit}>submit</button> 
        </form>
        <img src={process.env.PUBLIC_URL + '/data/uploads/30f252e4d0bf27e9d3efc51d8baa56f7'} ></img>
        </div>*/
        <div className="events-container">
      <div className="events-header" style={{alignSelf:"center"}}>
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
    </div>
  );
                  
}

export default AddEvenement