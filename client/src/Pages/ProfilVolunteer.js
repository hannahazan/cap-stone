import { useNavigate } from "react-router";
import React, { useEffect, useState } from "react";
import liliana from '../img/liliana3.jpg.png'
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';

const ProfilVolunteer=()=>{
    const [uploadImg, setUploadImg] = useState([])
    const navigate = useNavigate();

    const updateImg = (event) => {
      setUploadImg(event.target.files[0]);
    }

    // This function will handle the submission.
    async function onSubmit(e) {
      e.preventDefault();
      // When a post request is sent to the create url, we'll add a new record to the database.
      const data = new FormData();
      const newData= data.append('file',uploadImg)
      fetch("http://localhost:5000/img", {
        method: "POST",
        body: newData,
      })
      .then((response)=>{console.log(response.json)})
      .catch(error => {
        window.alert(error);
      });

    // setUploadImg("");

    }
    return(
        <form action="/" encType="multipart/form-data">
            <input type="file" filename="file" onChange={ updateImg} className="form-control-file" />
            <button onClick={onSubmit}>submit</button>
        </form>
    )
}

export default ProfilVolunteer