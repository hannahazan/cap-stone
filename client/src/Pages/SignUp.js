
import React, { useEffect, useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router";
import {Link} from 'react-router-dom'
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack"
import "../style/index.scss";
import logo from "../img/CharyDeep_logo.png"

export default function Signup() {
  const [checkBox,setCheckBox]= useState(false)
  const [formAssoMail, setFormAssoMail] = useState({
    email:""
  })
  const [formAssoPseudo, setFormAssoPseudo] = useState({
    pseudo:""
  })
  const [formAssoRna, setFormAssoRna] = useState({
    rna:""
  })
  const [formAssoPassword, setFormAssoPassword] = useState({
    password:""
  })
  


  const [formVltFirstname, setFormVltFirstname] = useState({
    firstname:""
  })
  const [formVltLastname, setFormVltLastname] = useState({
    lastname:""
  })
  const [formVltPseudo, setFormVltPseudo] = useState({
    pseudo:""
  })
  const [formVltMail, setFormVltMail] = useState({
    email:""
  })
  const [formVltPassword, setFormVltPassword] = useState({
    password:""
  })

  const [imgProfile, setImgProfile] = useState()
  
  const updateImgProfile = (event) => {
    setImgProfile(event.target.files[0]);  
 }
 const navigate = useNavigate()      
 const onSubmitVlt=(e)=>{
    e.preventDefault();
    // When a post request is sent to the create url, we'll add a new record to the database.
    
    const data = new FormData();
    data.append('name','laura')
    data.append('file',imgProfile)
    data.append('firstname',formVltFirstname.firstname)
    data.append('lastname',formVltLastname.lastname)
    data.append('pseudo',formVltPseudo.pseudo)
    data.append('email',formVltMail.email)
    data.append('password',formVltPassword.password)
    data.append('isAssociation',false)
   
    const IdImg = sessionStorage.setItem("imgName",imgProfile.name)
    const userPseudo= sessionStorage.setItem("pseudo",formVltPseudo.pseudo)
    
    for (var value of data.values()) {
      console.log(value);
   }
    
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
  }
    axios.post("http://localhost:5000/Users",data,config)
    .then((response)=>{(console.log(response.data))
  }) 
    .catch(error => {
     console.log(error);
    });
    
   
   navigate("/")
  } 
   
  
  const onSubmitAsso=(e)=>{
    e.preventDefault();
    // When a post request is sent to the create url, we'll add a new record to the database.
    
    const data = new FormData();
    data.append('name','laura')
    data.append('file',imgProfile)
    data.append('pseudo',formAssoPseudo.pseudo)
    data.append('email',formAssoMail.email)
    data.append('rna',formAssoRna.rna)
    data.append('password',formAssoPassword.password)
    data.append('isAssociation',true)
   
    const IdImg = sessionStorage.setItem("nameImgProfile",imgProfile.name)
    const userPseudo= sessionStorage.setItem("pseudo",formAssoPseudo.pseudo)
    
    
    for (var value of data.values()) {
      console.log(value);
   }
    
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
  }
    axios.post("http://localhost:5000/Users",data,config)
    .then((response)=>{(console.log(response.data))
  }) 
    .catch(error => {
     console.log(error);
    });
    
   navigate("/")
    
  }   
  return (
    <main className="main-signup">
      <header>
      <img src={logo} style={{height:"100px",marginTop:"14px" }}alt="Logo" />
      </header>
      <div className="form-main">
        <div className="form-title">
          <p>
            Bienvenue chez <span>CharyDeep</span>
          </p>
          <p>inscrivez-vous</p>
          <label>
          <input type="checkbox" onChange={()=>{checkBox===true?setCheckBox(false):setCheckBox(true)}}/>
           association
          </label>
          {checkBox===true?
          <form className="form-container" action="/" encType="multipart/form-data">
            <Stack direction="row" alignItems="center" spacing={2}>
              <IconButton
              sx={{color:'purple'}}

                aria-label="upload picture"
                component="label"
                size="large"
              >
                <input hidden accept="image/*" type="file" onChange={updateImgProfile} />
                <PhotoCamera />
              </IconButton>
            </Stack>
            <p>votre photo</p>
            <input type="email" email="email" placeholder="Adresse email"  onChange={(e)=>setFormAssoMail({email: e.target.value})}  />
            <input type="email" name="name" placeholder="Numéro RNA"  onChange={(e)=>setFormAssoRna({rna: e.target.value})} />
            <input type="text" name="pseudo" placeholder="Association Name"onChange={(e)=>setFormAssoPseudo({pseudo: e.target.value})} />
            <input type="password" name="password" placeholder="Mot de passe" onChange={(e)=>setFormAssoPassword({password: e.target.value})} />
              <button
                className="asso-btn"
                type="submit"
                form="nameform"
                value="Submit"
                onClick={onSubmitAsso}
              >
                Bienvenue sur CharyDeep
             </button>
             <Link to="/"className="no-account">vous avez déjà un compte ? connectez-vous</Link>
          </form>
          :
          <form className="form-container" action="/" encType="multipart/form-data">
            <Stack direction="row" alignItems="center" spacing={2}>
              <IconButton
              sx={{color:'purple'}}

                aria-label="upload picture"
                component="label"
                size="large"
              >
                <input hidden accept="image/*" type="file" onChange={ updateImgProfile} />
                <PhotoCamera />
              </IconButton>
            </Stack>
            <p>votre photo</p>
           
            <input type="email" email="email" placeholder="Adresse email"  onChange={(e)=>setFormVltMail({email: e.target.value})}  />
            <input type="email" name="name" placeholder="firstname"  onChange={(e)=>setFormVltFirstname({firstname: e.target.value})} />
            <input type="email" name="name" placeholder="lastname"  onChange={(e)=>setFormVltLastname({lastname: e.target.value})} />
            <input type="text" name="pseudo" placeholder="pseudo"onChange={(e)=>setFormVltPseudo({pseudo: e.target.value})} />
            <input type="password" name="password" placeholder="Mot de passe" onChange={(e)=>setFormVltPassword({password: e.target.value})} />
              <button
                className="asso-btn"
                type="submit"
                form="nameform"
                value="Submit"
                onClick={onSubmitVlt}
              >
                Bienvenue sur CharyDeep
             </button>
             <Link to="/"className="no-account">vous avez déjà un compte ? connectez-vous</Link>
          </form>
          }
        </div>
      </div>
    </main>
  );
}