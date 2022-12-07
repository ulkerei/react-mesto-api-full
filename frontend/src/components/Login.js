import React from "react";
import AuthForm from "./AuthForm";

function Login(props) {
  return (
  <AuthForm 
    header="Вход"
    button="Войти"
    topButtonText="Регистрация"
    question=""
    link="./signup"
    handleTopButtonChange={props.handleTopButtonChange}
    onAuthSubmit={props.onAuthSubmit}
  />
  )
}

export default Login;