import React from "react";
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup (props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name,setName] = React.useState('');
  const [description,setDescription] = React.useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }
  
  function handleAboutChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onUpdateUser({
      name,
      about: description,
    });
  } 

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]); 
  
  return (
    <PopupWithForm
    name="edit"
    title="Редактировать профиль"
    buttonName="Сохранить"
    onClose={props.onClose}
    isOpen={props.isOpen}
    isLoading={props.isLoading}
    onSubmit={handleSubmit}>
      <input
        type="text"
        minLength="2"
        maxLength="40"
        required
        id="name"
        name="name"
        className="popup__input popup__input_type_name"
        placeholder="Имя"
        value={name || ''}
        onChange={handleNameChange}
      />
      <p className="popup__input-error popup__input-error_type_name"></p>
      <input
        type="text"
        minLength="2"
        maxLength="200"
        required
        id="job"
        name="job"
        className="popup__input popup__input_type_job"
        placeholder="Занятие"
        value={description || ''}
        onChange={handleAboutChange}
      />
      <p className="popup__input-error popup__input-error_type_job"></p>
  </PopupWithForm>
  )
}

export default EditProfilePopup;