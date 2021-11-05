function PopupWithForm(props) {
  return (
    <section
      className={`popup popup_type_${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__close"
          onClick={props.onClose}
        />
        <h2 className="popup__title">{props.title}</h2>
        <form
          className={`popup__form popup__form_type_${props.name}`}
          name={props.name}
          onSubmit={props.onSubmit}
          noValidate
        >
          {props.children}
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
