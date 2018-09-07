import { Dispatch } from 'react-redux'; 

import { IJson } from '../models';

const URL_API = 'https://evstar.000webhostapp.com/bellintegrator/api';

export const FETCH_DOCS_BEGIN = 'FETCH_DOCS_BEGIN';
export const FETCH_DOCS_SUCCESS = 'FETCH_DOCS_SUCCESS';
export const FETCH_DOCS_FAIL = 'FETCH_DOCS_FAIL'; 

export const FETCH_COUNTRIES_BEGIN = 'FETCH_COUNTRIES_BEGIN';
export const FETCH_COUNTRIES_SUCCESS = 'FETCH_COUNTRIES_SUCCESS';
export const FETCH_COUNTRIES_FAIL = 'FETCH_COUNTRIES_FAIL';

export const fetchDocs = () => (dispatch: Dispatch<object>) => {

  dispatch({type: FETCH_DOCS_BEGIN});

  fetch(`${URL_API}/docs.php`, { method: 'POST' })
    .then(function(response: Response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(function(jsonOut: IJson) { 
      if (jsonOut.error) {
        dispatch({type: FETCH_DOCS_FAIL, payload: jsonOut.error});
      } else if (jsonOut.data) {
        dispatch({type: FETCH_DOCS_SUCCESS, payload: jsonOut.data});
      }
    })
    .catch(function(error: Error) {
      dispatch({type: FETCH_DOCS_FAIL, payload: error.message});
    });

};

export const fetchCountries = () => (dispatch: Dispatch<object>) => {

  dispatch({type: FETCH_COUNTRIES_BEGIN});

  fetch(`${URL_API}/countries.php`, { method: 'POST' })
    .then(function(response: Response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(function(jsonOut: IJson) { 
      if (jsonOut.error) {
        dispatch({type: FETCH_COUNTRIES_FAIL, payload: jsonOut.error});
      } else if (jsonOut.data) {
        dispatch({type: FETCH_COUNTRIES_SUCCESS, payload: jsonOut.data});
      }
    })
    .catch(function(error: Error) {
      dispatch({type: FETCH_COUNTRIES_FAIL, payload: error.message});
    });

};