import * as actions from '../actions/officeActions';
import { IAction, IOfficeStoreState } from '../models';

// Начальное состояние
const initialState: IOfficeStoreState = {
  items: [],
  shouldFetch: false,
  isFetching: false,
  error: null
};

// Функция-reducer
export default function office( state: IOfficeStoreState = initialState, action: IAction) { 
  switch (action.type) {
    case actions.FETCH_OFFICES_BEGIN:
      return {
        items: [],
        shouldFetch: false,
        isFetching: true,
        error: null
      };
    case actions.FETCH_OFFICES_SUCCESS:
      return {
        ...state,
        items: action.payload,
        isFetching: false,
      };
    case actions.FETCH_OFFICES_FAIL:
      return {
        ...state,
        items: [],
        isFetching: false,
        error: action.payload
      };

    case actions.DELETE_OFFICE_BEGIN:
      return {
        ...state,
        items: [],
        isFetching: true,
      };
    case actions.DELETE_OFFICE_SUCCESS:
      return {
        ...state,
        shouldFetch: true
      };
    case actions.DELETE_OFFICE_FAIL:
      return {
        ...state,
        shouldFetch: true,
        error: action.payload
      };

      case actions.GET_OFFICE_BEGIN:
      return {
        ...state,
        items: [],
        shouldFetch: false,
        isFetching: true,
        error: null
      };
    case actions.GET_OFFICE_SUCCESS:
      return {
        ...state,
        items: [action.payload],
        isFetching: false,
      };
    case actions.GET_OFFICE_FAIL:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };

    case actions.UPDATE_OFFICE_BEGIN:
      return {
        ...state,
        shouldFetch: false,
        isFetching: true,
        error: null
      };
    case actions.UPDATE_OFFICE_SUCCESS:
      return {
        ...state,
        shouldFetch: true,
        isFetching: false,
      };
    case actions.UPDATE_OFFICE_FAIL:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };

    case actions.SAVE_OFFICE_BEGIN:
      return {
        ...state,
        shouldFetch: false,
        isFetching: true,
        error: null
      };
    case actions.SAVE_OFFICE_SUCCESS:
      return {
        ...state,
        shouldFetch: true,
        isFetching: false,
      };
    case actions.SAVE_OFFICE_FAIL:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };

    default:
      break;
  }
  return state;
}