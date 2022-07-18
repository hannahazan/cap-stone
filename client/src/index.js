import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import FileBase64 from 'react-file-base64';
//import Footer from "./components/Footer.js";
//import FormEvent from "./components/FormEvent.js";
//import FormVlntr from "./components/FormVlntr.js";
//import FormAsso from "./components/FormAsso.js";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import OneTchat from "./Pages/OneTchat";
import AllTchat from "./Pages/OneTchat";
import HomePage from "./Pages/HomePage";
import ForgetPswd from "./Pages/ForgetPswd";
import Search from "./Pages/Search";
import ProfilAsso from "./Pages/ProfilAsso";
import ProfilVlntr from "./Pages/ProfilVolunteer.js";
import Evenement from "./Pages/Evenement";
import AddEvenement from "./Pages/AddEvenement";



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" exact element={<HomePage />} />
      <Route path="/signIn" exact element={<SignIn />} />
      <Route path="/signUp" exact element={<SignUp />} />
      <Route path="/forget" exact element={<ForgetPswd />} />
      <Route path="/search" exact element={<Search />} />
      <Route path="/tchat" exact element={<AllTchat />} />
      <Route path="/tchat/:_id" exact element={<OneTchat />} />
      <Route path="/profil_asso/:_id" exact element={<ProfilAsso />} />
      <Route path="/profil_asso/:_id/evenement"  exact element={<Evenement />} />
      <Route path="/profil_asso/:_id/add_evenement"  exact element={<AddEvenement />} />
      <Route path="/profil_volunteer/:_id" exact element={<ProfilVlntr />} />
    </Routes>
  </BrowserRouter>
);


