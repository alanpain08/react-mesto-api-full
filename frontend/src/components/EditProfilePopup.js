import PopupWithForm from "./PopupWithForm";
import React, { useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = React.useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [props.isOpen, currentUser]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Имя"
        id="name-input"
        className="popup__input popup__input_type_name"
        name="name"
        minLength="2"
        maxLength="40"
        value={name}
        onChange={handleChangeName}
        required
      />
      <span className="popup__input-error name-input-error" />
      <input
        type="text"
        placeholder="О себе"
        id="about-input"
        className="popup__input popup__input_type_about"
        name="about"
        minLength="2"
        maxLength="200"
        value={description}
        onChange={handleChangeDescription}
        required
      />
      <span className="popup__input-error about-input-error" />
      <button type="submit" className="popup__button popup__submit-button">
        Сохранить
      </button>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
