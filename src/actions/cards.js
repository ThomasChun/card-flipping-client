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
    method: 'POST',
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

export const EDIT_CARD_REQUEST = 'EDIT_CARD_REQUEST';
export const editCardRequest = () => ({
  type: EDIT_CARD_REQUEST,
});

export const EDIT_CARD_SUCCESS = 'EDIT_CARD_SUCCESS';
export const editCardSuccess = (card) => ({
  type: EDIT_CARD_SUCCESS,
  card,
});

export const EDIT_CARD_ERROR = 'EDIT_CARD_ERROR';
export const editCardError = (error) => ({
  type: EDIT_CARD_ERROR,
  error,
});

export const editCard = (user, card) => (dispatch, getState) => {
  dispatch(editCardRequest());
  const { cardId, autograph, brand, cardDetails, error, graded, insert, listedOn, memorabilia, playerName, purchaseDate, purchasePrice, purchasedFrom, refractor, rookie, saleDate, salePrice, serialNumbered, shortPrint, sport, year } = card;
  console.log(cardId);
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
      id: cardId,
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
    .then(data => dispatch(editCardSuccess(data)))
    .then(err => dispatch(editCardError(err)))
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

export const SORT_CARDS_BY_PLAYERNAME = 'SORT_CARDS_BY_PLAYERNAME';
export const sortCardsByPlayerName = (usersCards) => ({
  type: SORT_CARDS_BY_PLAYERNAME,
  usersCards,
})

export const SET_CURRENT_CARD_REQUEST = 'SET_CURRENT_CARD_REQUEST';
export const setCurrentCardRequest = () => ({
  type: SET_CURRENT_CARD_REQUEST,
});

export const SET_CURRENT_CARD_SUCCESS = 'SET_CURRENT_CARD_SUCCESS';
export const setCurrentCardSuccess = (currentCard) => ({
  type: SET_CURRENT_CARD_SUCCESS,
  currentCard,
});

export const SET_CURRENT_CARD_ERROR = 'SET_CURRENT_CARD_ERROR';
export const setCurrentCardError = (error) => ({
  type: SET_CURRENT_CARD_ERROR,
  error,
});

export const setCurrentCard = (user, card) => (dispatch, getState) => {
  dispatch(setCurrentCardRequest());
  const { id, autograph, brand, cardDetails, error, graded, insert, listedOn, memorabilia, playerName, purchaseDate, purchasePrice, purchasedFrom, refractor, rookie, saleDate, salePrice, serialNumbered, shortPrint, sport, year } = card;
  console.log(id);
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/current-card`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
    body: JSON.stringify({
      user,
      cardId: id,
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
    .then(data => dispatch(setCurrentCardSuccess(data)))
    .then(err => dispatch(setCurrentCardError(err)))
    .then(() => dispatch(fetchCurrentCards()))
}

export const FETCH_CURRENT_CARDS_REQUEST = 'FETCH_CURRENT_CARDS_REQUEST';
export const fetchCurrentCardsRequest = () => ({
  type: FETCH_CURRENT_CARDS_REQUEST,
});

export const FETCH_CURRENT_CARDS_SUCCESS = 'FETCH_CURRENT_CARDS_SUCCESS';
export const fetchCurrentCardsSuccess = (currentCards) => ({
  type: FETCH_CURRENT_CARDS_SUCCESS,
  currentCards,
});

export const FETCH_CURRENT_CARDS_ERROR = 'FETCH_CURRENT_CARDS_ERROR';
export const fetchCurrentCardsError = (error) => ({
  type: FETCH_CURRENT_CARDS_ERROR,
  error,
});

export const fetchCurrentCards = () => (dispatch, getState) => {
  dispatch(fetchCurrentCardsRequest());
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/current-card`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(res => dispatch(fetchCurrentCardsSuccess(res)))
    .catch(err => dispatch(fetchCurrentCardsError(err)))
}