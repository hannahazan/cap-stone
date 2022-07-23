import FormAsso from "../components/FormAsso";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import "../style/index.scss";
<input type="file" name="file" onChange={ updateImgProfile} className="form-control-file" />

// import Form from "../components/Form";
export default function Signup() {
  const [checkBox,setCheckBox]= useState(false)
    const [formAsso, setFormAsso] = useState({
        rna:"",
        pseudo:"",
        email:"",
        password:""
      });
    
      const navigate = useNavigate();
      
      function updateFormAsso(value) {
        return setFormAsso((prev) => {
          return { ...prev, ...value };
        });

      }
    
     // This function will handle the submission.
     async function onSubmit(e) {
      e.preventDefault();
    
      // When a post request is sent to the create url, we'll add a new record to the database.
      const newAsso = { ...formAsso };
      console.log(newAsso)
      
    
      await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAsso),

      })
      .catch(error => {
        window.alert(error);
        return;
      });
    
      setFormAsso({pseudo:"", rna:"" , email:"" });
      navigate("/profil_asso/:_id");
    }
    
    const [formVlt, setFormVlt] = useState({
        firstname:"",
        lastname:"",
        pseudo:"",
        email:"",
        password:"",
      })
    
      
      function updateFormVlt(value) {
        return setFormVlt((prev) => {
          return { ...prev, ...value };
        });

      }
    
     // This function will handle the submission.
     async function onSubmitVlt(e) {
      e.preventDefault();
    
      // When a post request is sent to the create url, we'll add a new record to the database.
      const newVlt = { ...formVlt };
      
    
      await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newVlt),
      })
      .catch(error => {
        window.alert(error);
        return;
      });
    
      setFormVlt({firstname:"",lastname:"",pseudo:"",email:"",password:"",});
      navigate("/profil_volunteer/:_id");
     
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
          <form className="form-container">
            <input type="email" email="email" placeholder="Adresse email"  onChange={(e)=>updateFormAsso({email: e.target.value})}  />
            <input type="email" name="name" placeholder="Numéro RNA"  onChange={(e)=>updateFormAsso({rna: e.target.value})} />

            <input type="text" name="pseudo" placeholder="pseudo"onChange={(e)=>updateFormAsso({pseudo: e.target.value})} />
            <input type="password" name="password" placeholder="Mot de passe" onChange={(e)=>updateFormAsso({password: e.target.value})} />
              <button
                className="asso-btn"
                type="submit"
                form="nameform"
                value="Submit"
                onClick={onSubmit}
              >
                Bienvenue sur CharyDeep
             </button>
          </form>
          :
          <form className="form-container">
            <input type="email" email="email" placeholder="Adresse email"  onChange={(e)=>updateFormVlt({email: e.target.value})}  />
            <input type="email" name="name" placeholder="firstname"  onChange={(e)=>updateFormVlt({firstname: e.target.value})} />
            <input type="email" name="name" placeholder="lastname"  onChange={(e)=>updateFormVlt({lastname: e.target.value})} />
            <input type="text" name="pseudo" placeholder="pseudo"onChange={(e)=>updateFormAsso({pseudo: e.target.value})} />
            <input type="password" name="password" placeholder="Mot de passe" onChange={(e)=>updateFormVlt({password: e.target.value})} />
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