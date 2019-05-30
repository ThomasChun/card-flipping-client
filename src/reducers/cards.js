import {
  CREATE_CARD_REQUEST,
  CREATE_CARD_SUCCESS,
  CREATE_CARD_ERROR,
  FETCH_CARDS_REQUEST,
  FETCH_CARDS_SUCCESS,
  FETCH_CARDS_ERROR,
  CURRENT_CARD_DETAILS,
  CLEAR_CURRENT_CARD_DETAILS,
  SHOW_MODAL,
  HIDE_MODAL,
  SHOW_ADD_CARD_MODAL,
  HIDE_ADD_CARD_MODAL,
  SHOW_DELETE_CARD_MODAL,
  HIDE_DELETE_CARD_MODAL,
  SHOW_EDIT_CARD_MODAL,
  HIDE_EDIT_CARD_MODAL,
} from '../actions/cards';

const initialState = {
  userCards: [],
  currentCard: null,
  showModal: false,
  showAddCardModal: false,
  showDeleteCardModal: false,
  showEditCardModal: false,
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
  } else if (action.type === CLEAR_CURRENT_CARD_DETAILS) {
    return {
      ...state,
      loading: false,
      currentCard: null,
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
  } else if (action.type === SHOW_ADD_CARD_MODAL) {
    return {
      ...state,
      loading: false,
      showAddCardModal: true,
    }
  } else if (action.type === HIDE_ADD_CARD_MODAL) {
    return {
      ...state,
      loading: false,
      showAddCardModal: false,
    }
  } else if (action.type === SHOW_DELETE_CARD_MODAL) {
    return {
      ...state,
      loading: false,
      showDeleteCardModal: true,
    }
  } else if (action.type === HIDE_DELETE_CARD_MODAL) {
    return {
      ...state,
      loading: false,
      showDeleteCardModal: false,
    }
  } else if (action.type === SHOW_EDIT_CARD_MODAL) {
    return {
      ...state,
      loading: false,
      showEditCardModal: true,
    }
  } else if (action.type === HIDE_EDIT_CARD_MODAL) {
    return {
      ...state,
      loading: false,
      showEditCardModal: false,
    }
  }
  return state;
}