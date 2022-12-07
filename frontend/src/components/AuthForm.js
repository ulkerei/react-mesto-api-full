import React from "react";


function AuthForm (props) {
  const [email,setEmail] = React.useState('');
  const [password,setPassword] = React.useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAuthSubmit({
      email,
      password,
    });
    setEmail('');
    setPassword('');
  } 
  
  props.handleTopButtonChange(props.topButtonText, props.link,'');

  return (
    <form name="auth" className={`auth-form auth-form_type_${props.name}`} onSubmit={handleSubmit}>
    <h2 className="auth-form__heading">{props.header}</h2>
      <input
        type="text"
        minLength="2"
        maxLength="40"
        required
        id="email"
        name="email"
        className="auth-form__input auth-form__input_type_email"
        placeholder="E-mail"
        value={email || ''}
        onChange={handleEmailChange}
      />
      <input
        type="password"
        minLength="2"
        maxLength="40"
        required
        id="password"
        name="password"
        className="auth-form__input auth-form__input_type_password"
        placeholder="Пароль"
        value={password || ''}
        onChange={handlePasswordChange}
      />  
    <button type="submit" id="submit" className="auth-form__button">{props.button}</button>
    <a href={props.link} className="auth-form__question">{props.question}</a>
  </form>
  );
}

export default AuthForm;