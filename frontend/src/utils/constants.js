
//Объект с данными для Апи
const apiConfig = {
  adress: `http://localhost:3000`,
  headers: {
    //authorization: "98f3d7dc-1729-485b-86b6-af7eebdd3027",
    "Content-Type": "application/json",
  },
};

//объект с данными для класса UserInfo
const infoSelectors = {
  nameSelector: ".info__name",
  aboutSelector: ".info__about",
  avatarSelector: ".profile__avatar",
};

//Объект с настройками для валидации
const selectorObject = {
  form: ".popup__form",
  input: ".popup__input",
  submitButton: ".popup__submit-button",
  inactiveButton: "popup__submit-button_inactive",
  inputError: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

//Элементы Profile и попапа Редкатирования
const popupEditProfile = ".popup_type_edit";
const openPopupEditProfileBtn = document.querySelector(".info__edit-button");
const nameEditInput = document.querySelector(".popup__input_type_name");
const aboutEditInput = document.querySelector(".popup__input_type_about");
const formEditPopup = document.querySelector(".popup__form_type_edit");
const nameInfo = document.querySelector(".info__name");
const aboutInfo = document.querySelector(".info__about");

//Элементы попапа Добавления нового места
const popupAddCard = ".popup_type_add";
const openPopupAddCardBtn = document.querySelector(".profile__add-button");
const formAddPopup = document.querySelector(".popup__form_type_add");

//Элементы попапа Изображения
const popupImage = ".popup_type_img";

//Элементы карточек
const contentBlockElements = document.querySelector(".page__elements");

//элементы попапа Подтверждения
const popupSubmit = ".popup_type_submit";

//элементы попапа редактирования аватара
const popupAvatar = ".popup_type_avatar";
const openPopupAvatarBtn = document.querySelector(".profile__avatar-container");
const formAvatarPopup = document.querySelector(".popup__form_type_avatar");

export {
  apiConfig,
  infoSelectors,
  selectorObject,
  popupEditProfile,
  openPopupEditProfileBtn,
  nameEditInput,
  aboutEditInput,
  formEditPopup,
  nameInfo,
  aboutInfo,
  popupAddCard,
  openPopupAddCardBtn,
  formAddPopup,
  popupImage,
  contentBlockElements,
  popupSubmit,
  popupAvatar,
  openPopupAvatarBtn,
  formAvatarPopup,
};

