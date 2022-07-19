import { useNavigate } from "react-router";
import React, { useEffect, useState } from "react";
import liliana from '../img/liliana3.jpg.png'
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';

const ProfilVolunteer=()=>{
    const [uploadImg, setUploadImg] = useState({
      imgName:""
    })
     
       const navigate = useNavigate();
       
       const updateImg = (e)=>{
        setUploadImg(e.target.file)
       }
       
       
     
      // This function will handle the submission.
      async function onSubmit(e) {
       e.preventDefault();
     
       // When a post request is sent to the create url, we'll add a new record to the database.
       const newImg = { ...uploadImg };
       //const bonjour=JSON.stringify(newImg)
       //console.log(bonjour)
       const formData= new FormData();

       formData.append("imgName",uploadImg)
 
       
       
     
       await fetch("http://localhost:4000/img/profile", {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify(newImg),
       })
       .catch(error => {
         window.alert(error);
         return;
       });
     
      setUploadImg({imgName:"" });
      
 
      console.log(newImg._id)
       
     }
    return(
        <form action="/profile" encType="multipart/form-data">
            <input type="file" filename="imgName" onChange={updateImg} className="form-control-file" />
            <button onClick={onSubmit}>submit</button>
        </form>
    )
}

export default ProfilVolunteer