import * as actions from '../actions/authActions';
import { IAction, IAuthStoreState } from '../models';

// Начальное состояние
const initialState: IAuthStoreState = {
  isLoggedIn: localStorage.getItem('isAuthenticated') ? true : false,
  login: localStorage.getItem('isAuthenticated') ? localStorage.getItem('isAuthenticated') : null,
  isFetching: false,
  error: null
};

// Функция-reducer
export default function auth( state: IAuthStoreState = initialState, action: IAction) { 
  switch (action.type) {
    case actions.SIGN_IN_BEGIN:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case actions.SIGN_IN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        login: action.payload,
        isFetching: false
      };
    case actions.SIGN_IN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        login: null,
        isFetching: false,
        error: action.payload
      };
    case actions.SIGN_OUT_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        login: null,
        isFetching: false
      };
    default:
      break;
  }
  return state;
}