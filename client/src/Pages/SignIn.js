import "../style/index.scss";
import {Link} from 'react-router-dom'
import { useNavigate } from "react-router";
import axios from "axios";
import React, { useEffect, useState,} from "react";
import logo from "../img/CharyDeep_logo.png"

export default function SignIn() {
   
    const [getPseudo,setGetPseudo]=useState({
      Pseudo:"",
      isPseudo:false,
    })
    const [getPassword,setGetPassword]=useState({
      Password:"",
      isPassword:false,
    })
    const [user,setGetUser]=useState([])
    const test=sessionStorage.getItem('gagner')
    const getUser = () => {
      
        return axios
          .get(`http://localhost:5000/users/${getPseudo.Pseudo}`)
          .then((res) => {
            console.log(setGetUser(res.data))
            sessionStorage.setItem('pseudo',user.pseudo)
            sessionStorage.setItem('imgUrl',user.imgProfilUrl) 
             
          })
          .then(()=>navigateLog() )
          .catch((err) => console.error(err));
          
      };

      const navigate = useNavigate()
      
    
      const navigateLog=() => {
        
        if(getPseudo.Pseudo===user.pseudo && getPassword.Password===user.password){
          console.log("hello")
          navigate("/homePage")
         }
    
        }

        const handleSubmit=() => {
             getUser()
            }
  return (
    <main className="signin-main">
      <header>
        <img src={logo} style={{height:"100px",marginTop:"14px" }}alt="Logo" />
      </header>
      <div className="form-main">
        <div className="form-title">
          <p>
            Bienvenue chez <span>CharyDeep</span>
          </p>
          <p>Connectez-vous</p>
          <form className="form-container">
            <input
                type="text"
                email="email"
                placeholder="Connectez-vous avec google"
            />
            <input type="email" name="name" placeholder="pseudo" onChange={(e)=>setGetPseudo({Pseudo:e.target.value,isPseudo:true})} />

            <input type="password" name="password" placeholder="Mot de passe" onChange={(e)=>setGetPassword({Password:e.target.value,isPassword:true})} />
            <button type="submit" form="nameform" value="Submit" onClick={()=>handleSubmit()}>
                Connectez-vous
            </button>
            <Link to="/signUp"className="no-account">Pas de compte ? Inscrivez-vous</Link>
          </form>
  
        </div>
      </div>
    </main>
  );
}