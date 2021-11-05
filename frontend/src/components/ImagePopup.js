function ImagePopup(props) {
  return (
    <section
      className={`popup popup_type_img ${
        props.card.isOpen ? "popup_opened" : ""
      }`}
    >
      <figure className="popup__container popup__img-container">
        <button
          type="button"
          className="popup__close popup__close-img"
          onClick={props.onClose}
        />
        <img
          className="popup__img"
          src={props.card.link}
          alt={props.card.name}
        />
        <figcaption className="popup__caption">{props.card.name}</figcaption>
      </figure>
    </section>
  );
}

export default ImagePopup;
