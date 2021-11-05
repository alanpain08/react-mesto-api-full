import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React from "react";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner === currentUser._id;
  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = `${
    isOwn ? "element__delete-button" : "element__delete-button_hidden"
  }`;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some((i) => i === currentUser._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `${
    isLiked ? "element__like-button_active" : "element__like-button"
  }`;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <article className="element">
      <img
        className="element__img"
        src={props.link}
        alt={props.name}
        onClick={handleClick}
      />
      <button
        type="button"
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      />
      <div className="element__li">
        <h2 className="element__text">{props.name}</h2>
        <div className="element__like-container">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          />
          <p className="element__like-number">{props.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
