import "../style/index.scss";
import {Link} from 'react-router-dom'
import { useNavigate } from "react-router";
import axios from "axios";
import React, { useEffect, useState,} from "react";
import logo from "../img/CharyDeep_logo.png"

export default function SignIn() {
    const [getPseudo,setGetPseudo]=useState()
    const [getPassword,setGetPassword]=useState()
    const [user,setGetUser]=useState([])
    const getUser = () => {
        return axios
          .get(`http://localhost:5000/users/${getPseudo}`)
          .then((res) => {
            console.log(setGetUser(res.data))
            localStorage.setItem('pseudo',user.pseudo)
            localStorage.setItem('imgUrl',user.imgProfilUrl)
            navigateLog()
          })
          .catch((err) => console.error(err));
      };
      const navigate = useNavigate()
      
    
      const navigateLog=() => {
        if(getPseudo===user.pseudo && getPassword===user.password){
          console.log("hello")
          navigate("/profil_asso/:_id/add_evenement")
         }
        }

        const handleSubmit=(e) => {
            e.preventDefault()
              getUser();  
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
            <input type="email" name="name" placeholder="pseudo ou email" onChange={(e)=>setGetPseudo(e.target.value)} />

            <input type="password" name="password" placeholder="Mot de passe" onChange={(e)=>setGetPassword(e.target.value)} />
            <button type="submit" form="nameform" value="Submit" onClick={handleSubmit}>
                Connectez-vous
            </button>
            <Link to="/signUp"className="no-account">Pas de compte ? Inscrivez-vous</Link>
          </form>
  
        </div>
      </div>
    </main>
  );
}