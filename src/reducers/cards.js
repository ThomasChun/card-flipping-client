import {
  CREATE_CARD_REQUEST,
  CREATE_CARD_SUCCESS,
  CREATE_CARD_ERROR,
} from '../actions/cards';

const initialState = {
  userCards: [],
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
  }
  return state;
}