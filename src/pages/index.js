import "./index.css";
import {
  enableValidation,
  validationConfig,
  disableButton,
  resetValidation,
} from "../scripts/validate.js";
import Api from "../utils/Api.js";
import { setButtonText } from "../utils/helpers.js";
import { data } from "autoprefixer";

// const initialCards = [
//   {
//     name: "Val Thorens",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
//   {
//     name: "Restaurant terrace",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
//   },
//   {
//     name: "An outdoor cafe",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
//   },
//   {
//     name: "A very long bridge, over the forest and through the trees",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
//   },
//   {
//     name: "Tunnel with morning light",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
//   },
//   {
//     name: "Mountain house",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
//   {
//     name: "The Golden Gate Bridge",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
//   },
// ];

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "5fb31e3b-65c9-4a67-92d8-0d110ec5189d",
    "Content-Type": "application/json",
  },
});

api
  .getAppInfo()
  .then(([cards, userInfo]) => {
    cards.forEach((item) => {
      const cardElement = getCardElement(item);
      cardsList.append(cardElement);
    });
    const user = userInfo;
    avatarImage.src = user.avatar;

    profileName.textContent = user.name;
    profileDescription.textContent = user.about;
  })
  .catch(console.error);

//profile
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
// const profileAvatar = document.querySelector(".profile_avatar");
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

//cards modal elements
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");
const cardModalButton = document.querySelector(".profile__add-button");
const cardModal = document.querySelector("#card-modal");
const cardModalCloseButton = cardModal.querySelector(".modal__close-button");
const cardForm = cardModal.querySelector(".modal__form");
const cardCaptionInput = cardModal.querySelector("#card-caption-input");
const cardLinkInput = cardModal.querySelector("#card-link-input");
const cardSubmitButton = cardModal.querySelector(".modal__submit-button");

let selectedCard;
let selectedCardId;

//preview modal elements
const previewModal = document.querySelector("#preview-modal");
const previewModalImageElement = document.querySelector(".modal__image");
const previewModalCaption = document.querySelector(".modal__caption");
const previewModalCloseButton = document.querySelector(
  ".modal__close-button_type_preview"
);

//avatar modal elements
const avatarModal = document.querySelector("#avatar-modal");
const avatarModalButton = document.querySelector(
  ".profile__avatar_edit-button"
);
const avatarModalCloseButton = avatarModal.querySelector(
  ".modal__close-button"
);
const avatarSubmitButton = avatarModal.querySelector(".modal__submit-button");
const avatarLinkInput = avatarModal.querySelector("#avatar-link-input");
const avatarForm = avatarModal.querySelector(".modal__form");
const avatarImage = document.querySelector(".profile__avatar");

//delete modal elements
const deleteModal = document.querySelector("#delete-modal");
const deleteForm = deleteModal.querySelector(".modal__form");
const deleteModalSubmitButton = deleteModal.querySelector(
  ".modal__delete-button"
);
const deleteModalCancelButton = document.querySelector("#cancel-button");
const deleteModalCloseButton = deleteModal.querySelector(
  ".modal___close-button_type_delete"
);

function handleCardSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  console.log(submitButton);
  setButtonText(submitButton, true, "Saving...", "Save");
  api
    .postNewCard({
      name: cardCaptionInput.value,
      link: cardLinkInput.value,
    })
    .then((data) => {
      cardCaptionInput.textContent = data.name;
      cardLinkInput.src = data.link;
      // const cardElement = getCardElement(data),
      // cardsList.prepend(cardElement),
      // closeModal(cardModal);
      // const inputValues = {
      //   name: cardCaptionInput.value,
      //   link: cardLinkInput.value,
      // };
      const cardElement = getCardElement(data);
      cardsList.prepend(cardElement);
      evt.target.reset();
      disableButton(cardSubmitButton, validationConfig); //settings
      closeModal(cardModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(submitButton, false, "Saving...", "Save");
    });
}

function handleDeleteSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  setButtonText(submitButton, true, "Deleting...", "Delete");
  api
    .deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      console.log("This post has been deleted");
      closeModal(deleteModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(submitButton, false, "Deleting...", "Delete");
    });
}

function handleDeleteCard(cardElement, cardId) {
  selectedCard = cardElement;
  selectedCardId = cardId;
  openModal(deleteModal);
}

function handlePreview(data) {
  previewModalImageElement.src = data.link;
  previewModalCaption.textContent = data.name;
  previewModalImageElement.alt = data.name;
  openModal(previewModal);
}

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardNameElement = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const isLiked = cardLikeButton.classList.contains("card__like-button_liked");
  cardNameElement.textContent = data.name;
  cardImageElement.src = data.link;
  cardImageElement.alt = data.name;

  if (data.isLiked) {
    cardLikeButton.classList.add("card__like-button_liked");
  } else {
    cardLikeButton.classList.remove("card__like-button_liked");
  }

  cardLikeButton.addEventListener("click", (evt) =>
    handleLikedCard(evt, data._id, data.isLiked)
  );
  cardDeleteButton.addEventListener("click", () =>
    handleDeleteCard(cardElement, data._id)
  );
  cardImageElement.addEventListener("click", () => handlePreview(data));

  function handleLikedCard(evt, id, isLiked) {
    // evt.target.classList.toggle("card__like-button_liked");

    api
      .changeLikeStatus(id, isLiked)
      .then(() => {
        evt.target.classList.toggle("card__like-button_liked");
      })
      .catch(console.error);
  }

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

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  console.log(submitButton);
  setButtonText(submitButton, true, "Saving...", "Save");
  api
    .editUserInfo({
      name: editModalNameInput.value,
      about: editModalDescriptionInput.value,
    })
    .then((data) => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
      closeModal(profileEditModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(submitButton, false, "Saving...", "Save");
    });
}

function handleAvatarSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  console.log(submitButton);
  setButtonText(submitButton, true, "Saving...", "Save");
  api
    .editAvatarInfo(avatarLinkInput.value)
    .then((data) => {
      avatarImage.src = data.avatar;
      closeModal(avatarModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(submitButton, false, "Saving...", "Save");
    });
}

cardModalButton.addEventListener("click", () => {
  openModal(cardModal);
});
cardModalCloseButton.addEventListener("click", () => {
  closeModal(cardModal);
});

avatarModalButton.addEventListener("click", () => {
  openModal(avatarModal);
});
avatarModalCloseButton.addEventListener("click", () => {
  closeModal(avatarModal);
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

avatarModal.addEventListener("mousedown", (event) => {
  if (event.target.classList.contains("modal")) {
    closeModal(avatarModal);
  }
});

deleteModalCloseButton.addEventListener("click", () => {
  closeModal(deleteModal);
});

deleteModalCancelButton.addEventListener("click", () => {
  closeModal(deleteModal);
});

deleteModal.addEventListener("mousedown", (event) => {
  if (event.target.classList.contains("modal")) {
    closeModal(deleteModal);
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

deleteForm.addEventListener("submit", handleDeleteSubmit);

profileFormElement.addEventListener("submit", handleProfileFormSubmit);
cardForm.addEventListener("submit", handleCardSubmit);
avatarForm.addEventListener("submit", handleAvatarSubmit);

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

enableValidation(validationConfig);
