import React from "react";
import imageTrash from '../images/delete.svg';
import CurrentUserContext from '../contexts/CurrentUserContext';


function Card (props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = (props.card.owner === currentUser._id);
  const cardDeleteButtonClassName = (`cards__delete ${!isOwn && 'cards__delete_hidden'}`);
  const isLiked = props.card.likes.some((i) => i === currentUser._id);
  const cardLikeButtonClassName = (`cards__like ${isLiked && 'cards__like_state_active'}`);  
  
  function handleClick() {props.onCardClick(props.card);}
  function handleLikeClick() {props.onCardLike(props.card);}
  function handleDeleteClick() {props.onCardDelete(props.card);}

  return (
    <div className="cards__element">
      <button type="button" id="delete" className={cardDeleteButtonClassName} onClick={handleDeleteClick}><img src={imageTrash} className="card__delete-image" alt="Х" /></button>
      <img className="cards__image" src={props.card.link} alt={props.card.place || props.card.name} onClick={handleClick}/>
      <div className="cards__subtitle">
        <p className="cards__place">{props.card.place || props.card.name}</p>
        <div>
          <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <p className="cards__likes-counter">{props.card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;