import * as actions from '../actions/workerActions';
import { IAction, IWorkerStoreState } from '../models';

// Начальное состояние
const initialState: IWorkerStoreState = {
  items: [],
  shouldFetch: false,
  isFetching: false,
  error: null
};

// Функция-reducer
export default function worker( state: IWorkerStoreState = initialState, action: IAction) { 
  switch (action.type) {
    case actions.FETCH_WORKERS_BEGIN:
      return {
        items: [],
        shouldFetch: false,
        isFetching: true,
        error: null
      };
    case actions.FETCH_WORKERS_SUCCESS:
      return {
        ...state,
        items: action.payload,
        isFetching: false,
      };
    case actions.FETCH_WORKERS_FAIL:
      return {
        ...state,
        items: [],
        isFetching: false,
        error: action.payload
      };

    case actions.DELETE_WORKER_BEGIN:
      return {
        ...state,
        items: [],
        isFetching: true,
      };
    case actions.DELETE_WORKER_SUCCESS:
      return {
        ...state,
        shouldFetch: true
      };
    case actions.DELETE_WORKER_FAIL:
      return {
        ...state,
        shouldFetch: true,
        error: action.payload
      };

    case actions.GET_WORKER_BEGIN:
      return {
        ...state,
        items: [],
        shouldFetch: false,
        isFetching: true,
        error: null
      };
    case actions.GET_WORKER_SUCCESS:
      return {
        ...state,
        items: [action.payload],
        isFetching: false,
      };
    case actions.GET_WORKER_FAIL:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };

    case actions.UPDATE_WORKER_BEGIN:
      return {
        ...state,
        shouldFetch: false,
        isFetching: true,
        error: null
      };
    case actions.UPDATE_WORKER_SUCCESS:
      return {
        ...state,
        shouldFetch: true,
        isFetching: false,
      };
    case actions.UPDATE_WORKER_FAIL:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };

    case actions.SAVE_WORKER_BEGIN:
      return {
        ...state,
        shouldFetch: false,
        isFetching: true,
        error: null
      };
    case actions.SAVE_WORKER_SUCCESS:
      return {
        ...state,
        shouldFetch: true,
        isFetching: false,
      };
    case actions.SAVE_WORKER_FAIL:
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