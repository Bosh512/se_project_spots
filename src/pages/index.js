import "./index.css";
import {
  enableValidation,
  validationConfig,
  // showInputError,
  // hideInputError,
  // hasInvalidInput,
  // toggleButtonState,
  disableButton,
  // enableButton,
  resetValidation,
  // setEventListeners,
  // checkInputValidity,
} from "../scripts/validate.js";

//card.css
// import unionSrc from "../images/Union.svg";
// const unionImage = document.getElementById("union-image");
// unionImage.src = unionSrc;
// import unionLikedSrc from "../images/union-liked.svg";
// const unionLikedImage = document.getElementById("union-liked-image");
// unionLikedImage.src = unionLikedSrc;
// import unionLikedHoverSrc from "../images/union-liked-hover.svg";
// const unionLikedHoverImage = document.getElementById("union-liked-hover-image");
// unionLikedHoverImage.src = unionLikedHoverSrc;
// import canSrc from "../images/can.png";
// const canImage = document.getElementById("can-image");
// canImage.src = canSrc;
// import canHoverSrc from "../images/canhover.png";
// const canHoverImage = document.getElementById("can-hover-image");
// canHoverImage.src = canHoverSrc;

// //modal.css
// import closeIconSrc from "../images/close2.svg";
// const closeIconImage = document.getElementById("close-icon-image");
// closeIconImage.src = closeIconSrc;
// import closeIconTransSrc from "../images/closeicontrans.svg";
// const closeIconTransImage = document.getElementById("close-icon-trans-image");
// closeIconTransImage.src = closeIconTransSrc;

//FUNCTIONALIY WHERE MODAL CLOSES AFTER CREATIUON OF NEW CARD AS WELL AS EDIT POROFILE BUTTON ARE NOT WOERKING
const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "The Golden Gate Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
];

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditModal = document.querySelector("#edit-modal");
const profileCloseButton = profileEditModal.querySelector(
  ".modal__close-button"
);
const editModalNameInput = profileEditModal.querySelector(
  "#profile-name-input"
);
const editModalDescriptionInput = profileEditModal.querySelector(
  "#profile-description-input"
);
const profileFormElement = profileEditModal.querySelector(".modal__form");
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");
const cardModalButton = document.querySelector(".profile__add-button");
const cardModal = document.querySelector("#card-modal");
const cardModalCloseButton = cardModal.querySelector(".modal__close-button");
const cardForm = cardModal.querySelector(".modal__form");
const cardCaptionInput = cardModal.querySelector("#card-caption-input");
const cardLinkInput = cardModal.querySelector("#card-link-input");
const cardSubmitButton = cardModal.querySelector(".modal__submit-button");
const previewModal = document.querySelector("#preview-modal");
const previewModalImageElement = document.querySelector(".modal__image");
const previewModalCaption = document.querySelector(".modal__caption");
const previewModalCloseButton = document.querySelector(
  ".modal__close-button_type_preview"
);

function handleCardSubmit(evt) {
  evt.preventDefault();
  console.log(cardLinkInput.value);
  console.log(cardCaptionInput.value);
  const inputValues = {
    name: cardCaptionInput.value,
    link: cardLinkInput.value,
  };
  const cardElement = getCardElement(inputValues);
  cardsList.prepend(cardElement);
  evt.target.reset();
  disableButton(cardSubmitButton, validationConfig); //settings
  closeModal(cardModal);
}

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardNameElement = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  cardNameElement.textContent = data.name;
  cardImageElement.src = data.link;
  cardImageElement.alt = data.name;
  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like-button_liked");
  });
  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  });
  cardImageElement.addEventListener("click", () => {
    openModal(previewModal);
    previewModalImageElement.src = data.link;
    previewModalCaption.textContent = data.name;
    previewModalImageElement.alt = data.name;
  });
  return cardElement;
}

function openModal(modal) {
  document.addEventListener("keydown", handleEscapeKey);
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  document.removeEventListener("keydown", handleEscapeKey);
  modal.classList.remove("modal_opened");
}

function handleProfileFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = editModalNameInput.value;
  profileDescription.textContent = editModalDescriptionInput.value;
  closeModal(profileEditModal);
}

cardModalButton.addEventListener("click", () => {
  openModal(cardModal);
});
cardModalCloseButton.addEventListener("click", () => {
  closeModal(cardModal);
});

profileEditModal.addEventListener("mousedown", (event) => {
  if (event.target.classList.contains("modal")) {
    closeModal(profileEditModal);
  }
});

previewModal.addEventListener("mousedown", (event) => {
  if (event.target.classList.contains("modal")) {
    closeModal(previewModal);
  }
});

cardModal.addEventListener("mousedown", (event) => {
  if (event.target.classList.contains("modal")) {
    closeModal(cardModal);
  }
});

const handleEscapeKey = (event) => {
  if (event.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
};

profileFormElement.addEventListener("submit", handleProfileFormSubmit);
cardForm.addEventListener("submit", handleCardSubmit);

profileEditButton.addEventListener("click", () => {
  editModalNameInput.value = profileName.textContent;
  editModalDescriptionInput.value = profileDescription.textContent;
  resetValidation(profileFormElement, validationConfig); //settings
  openModal(profileEditModal);
});
profileCloseButton.addEventListener("click", () => {
  closeModal(profileEditModal);
});
previewModalCloseButton.addEventListener("click", () => {
  closeModal(previewModal);
});

initialCards.forEach((card) => {
  console.log(card);
  const cardElement = getCardElement(card);
  cardsList.append(cardElement);
});

enableValidation(validationConfig);
