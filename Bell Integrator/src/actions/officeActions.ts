import { Dispatch } from 'react-redux'; 

import { IJson } from '../models';

const URL_API = 'https://evstar.000webhostapp.com/bellintegrator/api';

export const FETCH_OFFICES_BEGIN = 'FETCH_OFFICES_BEGIN';
export const FETCH_OFFICES_SUCCESS = 'FETCH_OFFICES_SUCCESS';
export const FETCH_OFFICES_FAIL = 'FETCH_OFFICES_FAIL';

export const DELETE_OFFICE_BEGIN = 'DELETE_OFFICE_BEGIN';
export const DELETE_OFFICE_SUCCESS = 'DELETE_OFFICE_SUCCESS';
export const DELETE_OFFICE_FAIL = 'DELETE_OFFICE_FAIL';

export const GET_OFFICE_BEGIN = 'GET_OFFICE_BEGIN';
export const GET_OFFICE_SUCCESS = 'GET_OFFICE_SUCCESS';
export const GET_OFFICE_FAIL = 'GET_OFFICE_FAIL';

export const UPDATE_OFFICE_BEGIN = 'UPDATE_OFFICE_BEGIN';
export const UPDATE_OFFICE_SUCCESS = 'UPDATE_OFFICE_SUCCESS';
export const UPDATE_OFFICE_FAIL = 'UPDATE_OFFICE_FAIL';

export const SAVE_OFFICE_BEGIN = 'SAVE_OFFICE_BEGIN';
export const SAVE_OFFICE_SUCCESS = 'SAVE_OFFICE_SUCCESS';
export const SAVE_OFFICE_FAIL = 'SAVE_OFFICE_FAIL';

export const fetchOfficesList = (orgId: number, name: string, phone: string, isActive: boolean) => (
dispatch: Dispatch<object>) => {

  dispatch({type: FETCH_OFFICES_BEGIN});

  var jsonIn = JSON.stringify({
    orgId,
    name,
    phone,
    isActive
  });

  fetch(`${URL_API}/office/list.php`, { method: 'POST', body: jsonIn })
    .then(function(response: Response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(function(jsonOut: IJson) { 
      if (jsonOut.error) {
        dispatch({type: FETCH_OFFICES_FAIL, payload: jsonOut.error});
      } else if (jsonOut.data) {
        dispatch({type: FETCH_OFFICES_SUCCESS, payload: jsonOut.data});
      }
    })
    .catch(function(error: Error) {
      dispatch({type: FETCH_OFFICES_FAIL, payload: error.message});
    });

};

export const deleteOffice = (id: number) => (
dispatch: Dispatch<object>) => {

  dispatch({type: DELETE_OFFICE_BEGIN});

  var jsonIn = JSON.stringify({
    id
  });

  fetch(`${URL_API}/office/delete.php`, { method: 'POST', body: jsonIn })
    .then(function(response: Response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(function(jsonOut: IJson) { 
      if (jsonOut.error) {
        dispatch({type: DELETE_OFFICE_FAIL, payload: jsonOut.error});
      } else if (jsonOut.result === 'success') {
        dispatch({type: DELETE_OFFICE_SUCCESS});
      }
    })
    .catch(function(error: Error) {
      dispatch({type: DELETE_OFFICE_FAIL, payload: error.message});
    });

};

export const getOfficeById = (id: number) => (
dispatch: Dispatch<object>) => { 

  dispatch({type: GET_OFFICE_BEGIN});

  fetch(`${URL_API}/office/get.php?id=${id}`)
    .then(function(response: Response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(function(jsonOut: IJson) { 
      if (jsonOut.error) {
        dispatch({type: GET_OFFICE_FAIL, payload: jsonOut.error});
      } else if (jsonOut.data) {
        dispatch({type: GET_OFFICE_SUCCESS, payload: jsonOut.data});
      }
    })
    .catch(function(error: Error) {
      dispatch({type: GET_OFFICE_FAIL, payload: error.message});
    });

};
  
export const updateOffice = (
                              id: number, 
                              name: string, 
                              address: string, 
                              phone: string, 
                              isActive: boolean
                            ) => (dispatch: Dispatch<object>) => {

  dispatch({type: UPDATE_OFFICE_BEGIN});

  var jsonIn = JSON.stringify({
    id,
    name,
    address,
    phone,
    isActive
  });

  fetch(`${URL_API}/office/update.php`, { method: 'POST', body: jsonIn })
    .then(function(response: Response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(function(jsonOut: IJson) { 
      if (jsonOut.error) {
        dispatch({type: UPDATE_OFFICE_FAIL, payload: jsonOut.error});
      } else if (jsonOut.result === 'success') {
        dispatch({type: UPDATE_OFFICE_SUCCESS});
      }
    })
    .catch(function(error: Error) {
      dispatch({type: UPDATE_OFFICE_FAIL, payload: error.message});
    });

};

export const saveOffice = (
                                  orgId: number,
                                  name: string, 
                                  address: string, 
                                  phone: string, 
                                  isActive: boolean
                                ) => (dispatch: Dispatch<object>) => {

  dispatch({type: SAVE_OFFICE_BEGIN});

  var jsonIn = JSON.stringify({
    orgId,
    name,
    address,
    phone,
    isActive
  });

  fetch(`${URL_API}/office/save.php`, { method: 'POST', body: jsonIn })
    .then(function(response: Response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(function(jsonOut: IJson) { 
      if (jsonOut.error) {
        dispatch({type: SAVE_OFFICE_FAIL, payload: jsonOut.error});
      } else if (jsonOut.result === 'success') {
        dispatch({type: SAVE_OFFICE_SUCCESS});
      }
    })
    .catch(function(error: Error) {
      dispatch({type: SAVE_OFFICE_FAIL, payload: error.message});
    });

};