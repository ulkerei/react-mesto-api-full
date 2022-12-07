import React from "react";
import imageMesto from '../images/Mesto.svg';

function Header (props) {
  return (
    <header className="header">
      <div className="header__container">
        <img className="header__logo" src={imageMesto} alt="Место" />
        <div className="header__tools">
          <p className="header__login">{props.email}</p>
          {(props.text === "Выйти") 
          ? <button className="header__button" onClick={props.onClick}>{props.text}</button>
          : <a className="header__button" href={props.link}>{props.text}</a>}
        </div>
      </div>
    </header>
  );
}

export default Header;