import { API_BASE_URL } from "../config";
import { normalizeResponseErrors } from "./utils";

export const FETCH_CARDS_REQUEST = 'FETCH_CARDS_REQUEST';
export const fetchCardsRequest = () => ({
  type: FETCH_CARDS_REQUEST,
});

export const FETCH_CARDS_SUCCESS = 'FETCH_CARDS_SUCCESS';
export const fetchCardsSuccess = (cards) => ({
  type: FETCH_CARDS_SUCCESS,
  cards,
});

export const FETCH_CARDS_ERROR = 'FETCH_CARDS_ERROR';
export const fetchCardsError = (error) => ({
  type: FETCH_CARDS_ERROR,
  error,
});

export const fetchCards = () => (dispatch, getState) => {
  dispatch(fetchCardsRequest());
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/cards`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(res => dispatch(fetchCardsSuccess(res)))
    .catch(err => dispatch(fetchCardsError(err)))
}

export const CREATE_CARD_REQUEST = 'CREATE_CARD_REQUEST';
export const createCardRequest = () => ({
  type: CREATE_CARD_REQUEST,
});

export const CREATE_CARD_SUCCESS = 'CREATE_CARD_SUCCESS';
export const createCardSuccess = (card) => ({
  type: CREATE_CARD_SUCCESS,
  card,
});

export const CREATE_CARD_ERROR = 'CREATE_CARD_ERROR';
export const createCardError = (error) => ({
  type: CREATE_CARD_ERROR,
  error,
});

export const createCard = (user, card) => (dispatch, getState) => {
  dispatch(createCardRequest());
  const { id, autograph, brand, cardDetails, error, graded, insert, listedOn, memorabilia, playerName, purchaseDate, purchasePrice, purchasedFrom, refractor, rookie, saleDate, salePrice, serialNumbered, shortPrint, sport, year } = card;
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/cards`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
    body: JSON.stringify({
      user,
      id,
      autograph,
      brand,
      cardDetails,
      error,
      graded,
      insert,
      listedOn,
      memorabilia,
      playerName,
      purchaseDate,
      purchasePrice,
      purchasedFrom,
      refractor,
      rookie,
      saleDate,
      salePrice,
      serialNumbered,
      shortPrint,
      sport,
      year,
    })
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(data => dispatch(createCardSuccess(data)))
    .then(err => dispatch(createCardError(err)))
    .then(() => dispatch(fetchCards()))
}

export const DELETE_CARD_SUCCESS = 'DELETE_CARD_SUCCESS';
export const deleteCardSuccess = () => ({
  type: DELETE_CARD_SUCCESS,
})

export const deleteCard = (cardId) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
    body: JSON.stringify({
      cardId,
    })
  })
  .then(() => dispatch(deleteCardSuccess()))
  .then(() => dispatch(fetchCards()))
}

export const CURRENT_CARD_DETAILS = 'CURRENT_CARD_DETAILS';
export const currentCardDetails = (currentCard) => ({
  type: CURRENT_CARD_DETAILS,
  currentCard,
})

export const CLEAR_CURRENT_CARD_DETAILS = 'CLEAR_CURRENT_CARD_DETAILS';
export const clearCurrentCardDetails = () => ({
  type: CLEAR_CURRENT_CARD_DETAILS,
})

export const SHOW_MODAL = 'SHOW_MODAL';
export const showModal = () => ({
  type: SHOW_MODAL,
})

export const HIDE_MODAL = 'HIDE_MODAL';
export const hideModal = () => ({
  type: HIDE_MODAL,
})

export const SHOW_ADD_CARD_MODAL = 'SHOW_ADD_CARD_MODAL';
export const showAddCardModal = () => ({
  type: SHOW_ADD_CARD_MODAL,
})

export const HIDE_ADD_CARD_MODAL = 'HIDE_ADD_CARD_MODAL';
export const hideAddCardModal = () => ({
  type: HIDE_ADD_CARD_MODAL,
})

export const SHOW_DELETE_CARD_MODAL = 'SHOW_DELETE_CARD_MODAL';
export const showDeleteCardModal = () => ({
  type: SHOW_DELETE_CARD_MODAL,
})

export const HIDE_DELETE_CARD_MODAL = 'HIDE_DELETE_CARD_MODAL';
export const hideDeleteCardModal = () => ({
  type: HIDE_DELETE_CARD_MODAL,
})

export const SHOW_EDIT_CARD_MODAL = 'SHOW_EDIT_CARD_MODAL';
export const showEditCardModal = () => ({
  type: SHOW_EDIT_CARD_MODAL,
})

export const HIDE_EDIT_CARD_MODAL = 'HIDE_EDIT_CARD_MODAL';
export const hideEditCardModal = () => ({
  type: HIDE_EDIT_CARD_MODAL,
})