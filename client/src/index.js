import React from "react";
import ReactDOM from "react-dom/client";
import MyProfil from "./Pages/MyProfil"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import HomePage from "./Pages/HomePage";
import ProfilAsso from "./Pages/ProfilAsso";
import AddEvenement from "./Pages/AddEvenement";



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" exact element={<SignIn />} />
      <Route path="/homePage" exact element={<HomePage />} />
      <Route path="/signUp" exact element={<SignUp />} />
      <Route path="/profil_asso/:_id" exact element={<ProfilAsso />} />
      <Route path="/profil_asso/:_id/add_evenement"  exact element={<AddEvenement />} />
      <Route path="/myProfil"  exact element={<MyProfil />} />
    </Routes>
  </BrowserRouter>
);


