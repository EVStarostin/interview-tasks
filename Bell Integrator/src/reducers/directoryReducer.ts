import * as actions from '../actions/directoryActions';
import { IAction, IDirectoryStoreState } from '../models';

// Начальное состояние
const initialState: IDirectoryStoreState = {
  items: [],
  isFetching: false,
  error: null
};

// Функция-reducer
export function docs( state: IDirectoryStoreState = initialState, action: IAction) { 
  switch (action.type) {
    case actions.FETCH_DOCS_BEGIN:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case actions.FETCH_DOCS_SUCCESS:
      return {
        ...state,
        items: action.payload,
        isFetching: false
      };
    case actions.FETCH_DOCS_FAIL:
      return {
        ...state,
        items: [],
        isFetching: false,
        error: action.payload
      };
    default:
      break;
  }
  return state;
}

export function countries( state: IDirectoryStoreState = initialState, action: IAction) { 
  switch (action.type) {
    case actions.FETCH_COUNTRIES_BEGIN:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case actions.FETCH_COUNTRIES_SUCCESS:
      return {
        ...state,
        items: action.payload,
        isFetching: false
      };
    case actions.FETCH_COUNTRIES_FAIL:
      return {
        ...state,
        items: [],
        isFetching: false,
        error: action.payload
      };
    default:
      break;
  }
  return state;
}