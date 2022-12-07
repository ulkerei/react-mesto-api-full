import React from "react";
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup (props) {
  const avatarRef = React.useRef('');

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar(avatarRef.current.value);
  } 

  React.useEffect(() => {
    avatarRef.current.value ='';
  }, [props.isOpen]); 

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonName="Сохранить"
      onClose={props.onClose}
      isOpen={props.isOpen}
      isLoading={props.isLoading}
      onSubmit={handleSubmit}>
        <input
          type="url"
          required
          id="avatar"
          name="avatar"
          className="popup__input popup__input_type_avatar"
          placeholder="Ссылка на изображение"
          defaultValue={''}
          ref={avatarRef}
        />
        <p className="popup__input-error popup__input-error_type_avatar"></p>
      </PopupWithForm>
  )
}

export default EditAvatarPopup;