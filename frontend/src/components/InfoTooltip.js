import successOperation from '../images/success.svg';
import failOperation from '../images/fail.svg';

function InfoTooltip(props) {
  return (
    <section
      className={`popup popup_type_${props.name} ${props.isOpen ? "popup_opened" : ""
        }`}
    >
      <div className="popup__info">
        <button
          type="button"
          className="popup__close"
          onClick={props.onClose}
        />
        <img
          className="popup__info-img"
          src={props.success ? successOperation : failOperation}
          alt={props.success ? "галочка: успешная операция" : "крестик: операция прошла неуспешно"}
        />
        <h2 className="popup__info-title">{props.text}</h2>
      </div>
    </section>
  );
}

export default InfoTooltip;
