
import { useNavigate } from "react-router";
import React, { useEffect, useState } from "react";
import liliana from '../img/liliana3.jpg.png'
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';




const ProfilAsso=()=>{
  
    const [uploadImg, setUploadImg] = useState({
       imgName:""
      });
      const nameImg=localStorage.getItem('name')
      const navigate = useNavigate();
      function updateImg(value) {
        return setUploadImg((prev) => {
          return { ...prev, ...value };
        });

      }
      
    
     // This function will handle the submission.
     async function onSubmit(e) {
      e.preventDefault();
    
      // When a post request is sent to the create url, we'll add a new record to the database.
      const newImg = { ...uploadImg };
      //const bonjour=JSON.stringify(newImg)
      //console.log(bonjour)

      
      
    
      await fetch("http://localhost:4000/img/:_id", {
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
     

     console.log(newImg.imgName)
      navigate("/profil_asso/:_id");
    }
   
    
    
    return(
        <div>
          <p>{nameImg}</p>
            <Button variant="contained" component="label">
              Upload
              <input hidden accept="image/*" multiple type="file" name="avatar" method="post" onChange={(e)=>updateImg({imgName: e.target.value})} />
            </Button>
            <IconButton color="primary" aria-label="upload picture" component="label">
                <input hidden accept="image/*" type="file" />
                <PhotoCamera />
            </IconButton>
            <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}  
                  onClick={onSubmit}
            >
                      Sign Up
            </Button>
            <img src={liliana}></img>
        </div>
    )
}

export default ProfilAsso