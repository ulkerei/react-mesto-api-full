import React from "react";
import imageClose from '../images/Close-icon.svg';

function ImagePopup (props) {

  return (
  <section className={`popup popup_type_viewer ${props.isOpen && 'popup_opened'}`}>
    <div className="popup__overlay popup__overlay_type_viewer"></div>
    <div className="popup__viewer">
      <img className="popup__view-image" src={props.card.link} alt={props.card.place || props.card.name} />
      <p className="popup__view-location">{props.card.place || props.card.name}</p>
      <button type="button" id="view-close" onClick={props.onClose} className="popup__close"><img src={imageClose} className="popup__close-x" alt="Х" /></button>
    </div>
  </section>
  );
};

export default ImagePopup;