import React from "react";
import PopupWithForm from './PopupWithForm';
import UnionV from '../images/UnionV.svg';
import UnionX from '../images/UnionX.svg';

function InfoTooltip (props) {

  return (
    <PopupWithForm 
      name="tooltip"
      title="" 
      buttonName=""
      onClose={props.onClose} 
      isOpen={props.isOpen}>
        <img src={props.isOk ? UnionV : UnionX} className="popup__tt-image" alt={props.isOk ? "Молодец!" : "Облом("} />
        <p className="popup__tt-text">{props.infoText}</p>
      </PopupWithForm>
  )
}

export default InfoTooltip;