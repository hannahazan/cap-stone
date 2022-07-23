import { useNavigate } from "react-router";
import React, { useEffect, useState } from "react";
//import { UserContext } from "../userContext.js";
import axios from 'axios'
//import asso from '%PUBLIC_URL%data/uploads/ed91ebfa1c1b6e9cb7496cc0a8fb9e94'
import liliana from '../img/liliana3.jpg.png'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { chainPropTypes } from "@mui/utils";

const AddEvenement=()=>{
  
  //const { user, login,changeUser } = useContext(UserContext);
  const [Img, setImg] = useState([]);
  //temporaire, pour accès aux données
 /* const getImg = () => {
    return axios
      .get("http://localhost:5000/img")
      .then((res) => {
        setImg(res.data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getImg();
  }, []);*/


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
        <div>
        <form action="/" encType="multipart/form-data">
            <input type="file" name="file" onChange={ updateImg} className="form-control-file" />
            <input type="text" name="title" onChange={(e)=>{setTitle({title:e.target.value})}} placeholder="title" />
            <input type="text" name="message" onChange={(e)=>{setMessage({message:e.target.value})}} placeholder="message" />
            <button type="submit" onClick={onSubmit}>submit</button> 
        </form>
        <img src={process.env.PUBLIC_URL + '/data/uploads/30f252e4d0bf27e9d3efc51d8baa56f7'} ></img>
        </div>
        
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

export default AddEvenement