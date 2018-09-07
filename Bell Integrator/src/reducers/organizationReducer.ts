import * as actions from '../actions/organizationActions';
import { IAction, IOrganizationStoreState } from '../models';

// Начальное состояние
const initialState: IOrganizationStoreState = {
  items: [],
  shouldFetch: false,
  isFetching: false,
  error: null
};

// Функция-reducer
export default function organization( state: IOrganizationStoreState = initialState, action: IAction) { 
  switch (action.type) {
    case actions.FETCH_ORGANIZATIONS_BEGIN:
      return {
        items: [],
        shouldFetch: false,
        isFetching: true,
        error: null
      };
    case actions.FETCH_ORGANIZATIONS_SUCCESS:
      return {
        ...state,
        items: action.payload,
        isFetching: false,
      };
    case actions.FETCH_ORGANIZATIONS_FAIL:
      return {
        ...state,
        items: [],
        isFetching: false,
        error: action.payload
      };

    case actions.DELETE_ORGANIZATION_BEGIN:
      return {
        ...state,
        items: [],
        isFetching: true,
      };
    case actions.DELETE_ORGANIZATION_SUCCESS:
      return {
        ...state,
        shouldFetch: true
      };
    case actions.DELETE_ORGANIZATION_FAIL:
      return {
        ...state,
        shouldFetch: true,
        error: action.payload
      };

    case actions.GET_ORGANIZATION_BEGIN:
      return {
        ...state,
        items: [],
        shouldFetch: false,
        isFetching: true,
        error: null
      };
    case actions.GET_ORGANIZATION_SUCCESS:
      return {
        ...state,
        items: [action.payload],
        isFetching: false,
      };
    case actions.GET_ORGANIZATION_FAIL:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };

    case actions.UPDATE_ORGANIZATION_BEGIN:
      return {
        ...state,
        shouldFetch: false,
        isFetching: true,
        error: null
      };
    case actions.UPDATE_ORGANIZATION_SUCCESS:
      return {
        ...state,
        shouldFetch: true,
        isFetching: false,
      };
    case actions.UPDATE_ORGANIZATION_FAIL:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
      
      case actions.SAVE_ORGANIZATION_BEGIN:
      return {
        ...state,
        shouldFetch: false,
        isFetching: true,
        error: null
      };
    case actions.SAVE_ORGANIZATION_SUCCESS:
      return {
        ...state,
        shouldFetch: true,
        isFetching: false,
      };
    case actions.SAVE_ORGANIZATION_FAIL:
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