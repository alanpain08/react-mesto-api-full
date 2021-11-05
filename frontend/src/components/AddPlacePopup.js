import PopupWithForm from "./PopupWithForm";
import React from "react";

function AddPlacePoppup(props) {
  const nameRef = React.useRef();
  const linkRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name: nameRef.current.value,
      link: linkRef.current.value,
    });
  }
  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Название"
        id="place-input"
        className="popup__input popup__input_type_title"
        name="place"
        minLength="2"
        maxLength="30"
        ref={nameRef}
        required
      />
      <span className="popup__input-error place-input-error" />
      <input
        type="url"
        placeholder="Ссылка на страницу"
        id="link-input"
        className="popup__input popup__input_type_link"
        name="link"
        required
        ref={linkRef}
      />
      <span className="popup__input-error link-input-error" />
      <button type="submit" className="popup__button popup__submit-button">
        Создать
      </button>
    </PopupWithForm>
  );
}

export default AddPlacePoppup;
