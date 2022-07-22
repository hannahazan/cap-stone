import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
const Evenement=()=>{
    const [users, setUsers] = useState([]);
    const idImg = localStorage.getItem('name')
    const titleImg=localStorage.getItem('title')
    const messageImg=localStorage.getItem('message')
    const getUser = () => {
        return axios
          .get(`http://localhost:5000/img/${idImg}`)
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
       <p>{titleImg}</p>
       <img src={process.env.PUBLIC_URL + users} ></img>
       <p>{messageImg}</p>
       </div>
    )
}

export default Evenement