import { React, useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePoppup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import * as mestoAuth from "../utils/mestoAuth";
import InfoTooltip from "./InfoTooltip";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

import "../index.css";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    avatar: "",
  });
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userMail, setUserMail] = useState("");
  const [isInfoTooltipOpen, handleInfoTooltipClick] = useState(false);
  const [success, setSuccess] = useState(false);
  const [infoText, setInfoText] = useState("");

  const history = useHistory();

  function handleSubmitLogin(email, password) {
    mestoAuth
      .authorize(email, password)
      .then((data) => {
        if (data) {
          setLoggedIn(true);
          setUserMail(email);
          history.push("/");
        }
      })
      .catch((err) => {
        setLoggedIn(false);
        setSuccess(false);
        setInfoText("Что-то пошло не так! Попробуйте ещё раз.")
        handleInfoTooltipClick(true);
        console.log(err);
      });
  }

  useEffect(() => {
      mestoAuth.getContent().then((data) => {
        if (data) {
          setLoggedIn(true);
          setUserMail(data.email);
          history.push("/");
        }
      });
  }, [history]);

  useEffect(() => {
    if(loggedIn) {
      Promise.all([api.getInitialCards(), api.getUserInfo()])
      .then(([userCards, userInfo]) => {
        setCards(userCards.reverse());
        setCurrentUser(userInfo);
      })
      .catch((err) => {
        console.log(err);
      });
    }
    
  }, [loggedIn]);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    if (!isLiked) {
      api
        .putLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api
        .deleteLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards(cards.filter((c) => c._id !== card._id));
    })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardClick(card) {
    setSelectedCard({
      isOpen: true,
      link: card.link,
      name: card.name,
    });
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({
      isOpen: false,
      link: "",
      name: "",
    });
    handleInfoTooltipClick(false);
  };

  function handleUpdateUser(info) {
    api
      .editUserInfo(info)
      .then((newUserInfo) => {
        setCurrentUser(newUserInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(avatar) {
    api
      .editAvatar(avatar)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(cardInfo) {
    api
      .addCard(cardInfo)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleSubmitRegister(email, password) {
    mestoAuth
      .register(email, password)
      .then((res) => {
        if (res) {
          setSuccess(true);
          setInfoText("Вы успешно зарегистрировались!")
          handleInfoTooltipClick(true);
          history.push("/signin");
        }
      })
      .catch((err) => {
        setSuccess(false);
        setInfoText("Что-то пошло не так! Попробуйте ещё раз.")
        handleInfoTooltipClick(true);
        console.log(err);
      });
  }

  

  function signOut() {
    mestoAuth.logout();
    setLoggedIn(false);
    history.push("/signin");
  }

  return (
    <div className="App">
      <div className="page__container">
        <Header userMail={userMail} onSignOut={signOut} />
        <CurrentUserContext.Provider value={currentUser}>
          <Switch>
            <ProtectedRoute
              component={Main}
              exact
              path="/"
              loggedIn={loggedIn}
              cards={cards}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
            />
            <Route path="/signin">
              <Login onLogin={handleSubmitLogin} />
            </Route>
            <Route path="/signup">
              <Register onRegister={handleSubmitRegister} />
            </Route>
            <Route path="">
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
            </Route>
          </Switch>

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <AddPlacePoppup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
        </CurrentUserContext.Provider>
        <Footer />
      </div>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={closeAllPopups}
        success={success}
        text={infoText}
      />
    </div>
  );
}

export default App;
