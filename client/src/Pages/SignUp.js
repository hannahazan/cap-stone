
import FormAsso from "../components/FormAsso";
import React, { useEffect, useState } from "react";
//import { UserContext } from "../userContext.js";
import axios from 'axios'
import { useNavigate } from "react-router";
import "../style/index.scss";


// import Form from "../components/Form";
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
   
    const IdImg = localStorage.setItem("nameImgProfile",imgProfile.name)
    const userPseudo= localStorage.setItem("pseudo",formVltPseudo.pseudo)
    
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
    
   
  // setUploadImg("");
   navigate("/signUp")
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
   
    const IdImg = localStorage.setItem("nameImgProfile",imgProfile.name)
    const userPseudo= localStorage.setItem("pseudo",formAssoPseudo.pseudo)
    
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
    
   
  // setUploadImg("");
   navigate("/signUp")
    
  }   
  return (
    <main className="main-signup">
      <header>
        <h1>CharyDeep</h1>
        {/* <img src={logo} alt="Logo" /> */}
      </header>
      <div className="form-main">
        <div className="form-title">
          <p>
            Bienvenue chez <span>CharyDeep</span>
          </p>
          <p>Connectez-vous</p>
          <label>
          <input type="checkbox" onChange={()=>{checkBox===true?setCheckBox(false):setCheckBox(true)}}/>
          association
          </label>
          {checkBox===true?
          <form className="form-container" action="/" encType="multipart/form-data">
            <input type="file" name="file" onChange={ updateImgProfile} className="form-control-file" />
            <input type="email" email="email" placeholder="Adresse email"  onChange={(e)=>setFormAssoMail({email: e.target.value})}  />
            <input type="email" name="name" placeholder="Numéro RNA"  onChange={(e)=>setFormAssoRna({rna: e.target.value})} />
            <input type="text" name="pseudo" placeholder="pseudo"onChange={(e)=>setFormAssoPseudo({pseudo: e.target.value})} />
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
          </form>
          :
          <form className="form-container" action="/" encType="multipart/form-data">
            <input type="file" name="file" onChange={ updateImgProfile} className="form-control-file" />
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
          </form>
          }
        </div>
      </div>
    </main>
  );
}