import { useNavigate } from "react-router";
import React, { useEffect, useState } from "react";
import axios from 'axios'
import liliana from '../img/liliana3.jpg.png'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { chainPropTypes } from "@mui/utils";

const ProfilVolunteer=()=>{
    const [uploadImg, setUploadImg] = useState()
    const navigate = useNavigate();

    const updateImg = (event) => {
       setUploadImg(event.target.files[0]);
    }

    // This function will handle the submission.
    async function onSubmit(e) {
      e.preventDefault();
      // When a post request is sent to the create url, we'll add a new record to the database.
      const data = new FormData();
      data.append('name','joséphine')
      data.append('file',uploadImg)
      
     
      for (var value of data.values()) {
        console.log(value);
     }
      console.log(uploadImg)
      console.log()
     
    /*   
      fetch("http://localhost:5000/img", {
        method: "POST",
       headers: ({
          
        }),
        
        body:
      }) */
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }}
      axios.post("http://localhost:5000/img",data,config)
      .then((response)=>{console.log(response.data)})
      
      .catch(error => {
       console.log(error);
      });

    // setUploadImg("");

    }
    return(
    
        <form action="/" encType="multipart/form-data">
            <input type="file" name="file" onChange={ updateImg} className="form-control-file" />
            <button type="submit" onClick={onSubmit}>submit</button> 
        </form>
        
        /* <Stack direction="row" alignItems="center" spacing={2}>
         <Button variant="contained" component="label">
           Upload
           <input hidden accept="image/*"  type="file" />
         </Button>
         <IconButton color="primary" aria-label="upload picture" component="label">
           <input  onChange={updateImg}  filename="file" hidden accept="image/*" type="file" />
           <PhotoCamera />
         </IconButton>
         <Button variant="contained"  onClick={onSubmit} endIcon={<SendIcon />}>
        Send
      </Button>
       </Stack>*/
       
    )
}

export default ProfilVolunteer