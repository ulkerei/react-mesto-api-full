import React from "react";
import imageClose from '../images/Close-icon.svg';

function PopupWithForm (props) {

  return (
    <section className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`}>
      <div className="popup__overlay"></div>
      <form name="profile-edit" className={`popup__form popup__form_type_${props.name}`} onSubmit={props.onSubmit}>
        {props.buttonName && (<h2 className="popup__heading">{props.title}</h2>)}
        <>{props.children}</>      
        {props.buttonName && (<button type="submit" id={`${props.name}-submit`} className="popup__button popup__button_disabled" disabled={props.isLoading}>{props.isLoading ? 'Сохрaнение...': props.buttonName}</button>)}
        <button type="button" id={`${props.name}-close`} onClick={props.onClose} className="popup__close"><img src={imageClose} className="popup__close-x" alt="Х" /></button>
      </form>
    </section>
  );
  
}

export default PopupWithForm;
