import { API_BASE_URL } from "../config";
import { normalizeResponseErrors } from "./utils";

export const CREATE_CARD_REQUEST = 'CREATE_CARD_REQUEST';
export const createCardRequest = () => ({
  type: CREATE_CARD_REQUEST,
});

export const CREATE_CARD_SUCCESS = 'CREATE_CARD_SUCCESS';
export const createCardSuccess = () => ({
  type: CREATE_CARD_SUCCESS,
});

export const CREATE_CARD_ERROR = 'CREATE_CARD_ERROR';
export const createCardError = () => ({
  type: CREATE_CARD_ERROR,
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
