import React from "react";
import PopupWithForm from './PopupWithForm';

function ConfirmationPopup (props) {

  function handleSubmit(e) {
    e.preventDefault();
    props.onDelete(props.card);
  } 

  return (
    <PopupWithForm 
      name="confirm" 
      title="Вы уверены?" 
      buttonName="Да"
      onClose={props.onClose} 
      isOpen={props.isOpen} 
      onDelete={props.onDelete}
      onSubmit={handleSubmit}/>
  )
}

export default ConfirmationPopup;