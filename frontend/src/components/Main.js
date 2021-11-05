import Card from "./Card";
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";


function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container" onClick={props.onEditAvatar}>
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="аватар"
          />
          <button
            className="profile__avatar-button"
            type="button"
          />
        </div>
        <div className="info profile__info">
          <div className="info__edit-li">
            <h1 className="info__name">{currentUser.name}</h1>
            <button
              type="button"
              className="info__edit-button"
              onClick={props.onEditProfile}
            />
          </div>
          <p className="info__about">{currentUser.about}</p>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={props.onAddPlace}
        />
      </section>

      <section className="elements page__elements">
        {props.cards.map((card) => {
          return (
            <Card
              card={card}
              onCardDelete={props.onCardDelete}
              onCardLike={props.onCardLike}
              onCardClick={props.onCardClick}
              key={card._id}
              link={card.link}
              name={card.name}
              likes={card.likes}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;
