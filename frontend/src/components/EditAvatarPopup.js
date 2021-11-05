import PopupWithForm from "./PopupWithForm";
import React from "react";


function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar:
        avatarRef.current
          .value /* Значение инпута, полученное с помощью рефа */,
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        placeholder="Ссылка на аватар"
        id="avatar-input"
        className="popup__input popup__input_type_link"
        name="avatar"
        ref={avatarRef}
        required
      />
      <span className="popup__input-error avatar-input-error" />
      <button type="submit" className="popup__button popup__submit-button">
        Сохранить
      </button>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
