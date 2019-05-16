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
  const { autograph, brand, cardDetails, error, graded, insert, listedOn, memorabilia, playerName, purchaseDate, purchasePrice, purchasedFrom, refractor, rookie, saleDate, salePrice, serialNumbered, shortPrint, sport, year } = card;
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
}
