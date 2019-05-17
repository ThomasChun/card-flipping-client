import {
  CREATE_CARD_REQUEST,
  CREATE_CARD_SUCCESS,
  CREATE_CARD_ERROR,
  FETCH_CARDS_REQUEST,
  FETCH_CARDS_SUCCESS,
  FETCH_CARDS_ERROR,
  CURRENT_CARD_DETAILS,
  SHOW_MODAL,
  HIDE_MODAL,
} from '../actions/cards';

const initialState = {
  userCards: [],
  currentCard: null,
  showModal: false,
  loading: false,
  error: null,
}

export default function reducer(state = initialState, action) {
  if (action.type === CREATE_CARD_REQUEST) {
    return {
      ...state,
      loading: true,
    }
  } else if (action.type === CREATE_CARD_SUCCESS) {
    return {
      ...state,
      loading: false,
      userCards: [...state.userCards, action.card],
    }
  } else if (action.type === CREATE_CARD_ERROR) {
    return {
      ...state,
      loading: false, 
      error: action.error,
    }
  } else if (action.type === FETCH_CARDS_REQUEST) {
    return {
      ...state,
      loading: true,
    }
  } else if (action.type === FETCH_CARDS_SUCCESS) {
    return {
      ...state,
      loading: false,
      userCards: action.cards,
    }
  } else if (action.type === FETCH_CARDS_ERROR) {
    return {
      ...state,
      loading: false,
      error: action.error,
    }
  } else if (action.type === CURRENT_CARD_DETAILS) {
    return {
      ...state,
      loading: false,
      currentCard: action.currentCard,
    }
  } else if (action.type === SHOW_MODAL) {
    return {
      ...state,
      loading: false, 
      showModal: true,
    }
  } else if (action.type === HIDE_MODAL) {
    return {
      ...state,
      loading: false, 
      showModal: false,
    }
  }
  return state;
}