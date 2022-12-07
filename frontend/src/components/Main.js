import React from "react";
import imageAdd from '../images/Plus.svg';
import imageEdit from '../images/Pen.svg';
import Card from './Card.js';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main (props) {
  const currentUser = React.useContext(CurrentUserContext);
  props.handleTopButtonChange("Выйти","/signin",props.emailInfo);
  return (
    <main className="main">
    <section className="profile">
      <div className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})` }}>
        <div className="profile__avatar-overlay">
          <button type="button" className="profile__button profile__button_type_edit-avatar" onClick={props.onEditAvatar}><img className="profile__edit-avatar-image" src={imageEdit} alt="Редактировать" /></button>
        </div>
      </div>
      <div className="profile__info">
        <div className="profile__title">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button type="button" className="profile__button profile__button_type_edit" onClick={props.onEditProfile}><img className="profile__edit-image" src={imageEdit} alt="Редактировать" /></button>
        </div>
        <p className="profile__about">{currentUser.about}</p>
      </div>
      <button type="button" className="profile__button profile__button_type_add" onClick={props.onAddPlace}><img src={imageAdd} alt="Добавить" /></button>
    </section>

    <section className="cards">
      {      
        props.cards.map((card) => (
            <Card card={card} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} key={card._id}/>
          ))
       }
    </section>
  </main>
  );
};

export default Main;