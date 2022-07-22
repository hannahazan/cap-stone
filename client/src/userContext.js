import { toggleButtonGroupClasses } from "@mui/material";
import React, { createContext, useState } from "react";


export const UserContext = createContext({ pictureName: '', auth: false });
export const UserProvider = ({ children }) => {
    // User is the name of the "data" that gets stored in context
  const [user, setUser] = useState({ email: '', auth: false });
  const changeUser = e => {
    setUser(user => ({
      pictureName:e.target.value,
      auth:false,

     }));

  };
  const login = e => {
    setUser(user => ({
      email:user.email,
      auth:true,
     }));

  };

  
    return (
      <UserContext.Provider value={{ user,changeUser,login }}>
        {children}
      </UserContext.Provider>
    );
  }