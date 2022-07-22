import React from "react";
import "../style/index.scss";
import ButtonAsso from "./ButtonAsso";


export default function FormAsso() {
  return (
    <form className="form-container">
      <input type="email" email="email" placeholder="Adresse email" />
      <input type="email" name="name" placeholder="Numéro RNA" />

      <input type="password" name="password" placeholder="Nom d'utilisateur" />
      <input type="password" name="password" placeholder="Mot de passe" />
      <ButtonAsso />
    </form>
  );
}