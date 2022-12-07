import React from "react";
import AuthForm from "./AuthForm";

function Register(props) {
  return (
  <AuthForm 
    header="Регистрация"
    button="Зарегистрироваться"
    topButtonText="Войти"
    question="Уже зарегистрированы? Войти"
    link="./signin"
    handleTopButtonChange={props.handleTopButtonChange}
    onAuthSubmit={props.onAuthSubmit}
  />
  )
}

export default Register;