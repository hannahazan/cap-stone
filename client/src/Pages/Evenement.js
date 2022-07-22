import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
const Evenement=()=>{
    const [users, setUsers] = useState([]);
    const storage = localStorage.getItem('name')
    const getUser = () => {
        return axios
          .get(`http://localhost:5000/img/${storage}`)
          .then((res) => {
            console.log(setUsers(res.data.pictureUrl))
            ;
          })
          .catch((err) => console.error(err));
      };
    
      useEffect(() => {
        getUser();
      }, []);
    
    return(
       <div>
       <p>{storage}</p>
       <img src={process.env.PUBLIC_URL + users} ></img>
       </div>
    )
}

export default Evenement