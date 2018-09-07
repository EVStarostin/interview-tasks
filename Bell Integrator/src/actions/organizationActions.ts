import { Dispatch } from 'react-redux'; 

import { IJson } from '../models';

const URL_API = 'https://evstar.000webhostapp.com/bellintegrator/api';

export const FETCH_ORGANIZATIONS_BEGIN = 'FETCH_ORGANIZATIONS_LIST_BEGIN';
export const FETCH_ORGANIZATIONS_SUCCESS = 'FETCH_ORGANIZATIONS_LIST_SUCCESS';
export const FETCH_ORGANIZATIONS_FAIL = 'FETCH_ORGANIZATIONS_LIST_FAIL';

export const DELETE_ORGANIZATION_BEGIN = 'DELETE_ORGANIZATION_BEGIN';
export const DELETE_ORGANIZATION_SUCCESS = 'DELETE_ORGANIZATION_SUCCESS';
export const DELETE_ORGANIZATION_FAIL = 'DELETE_ORGANIZATION_FAIL';

export const GET_ORGANIZATION_BEGIN = 'GET_ORGANIZATION_BEGIN';
export const GET_ORGANIZATION_SUCCESS = 'GET_ORGANIZATION_SUCCESS';
export const GET_ORGANIZATION_FAIL = 'GET_ORGANIZATION_FAIL';

export const UPDATE_ORGANIZATION_BEGIN = 'UPDATE_ORGANIZATION_BEGIN';
export const UPDATE_ORGANIZATION_SUCCESS = 'UPDATE_ORGANIZATION_SUCCESS';
export const UPDATE_ORGANIZATION_FAIL = 'UPDATE_ORGANIZATION_FAIL';

export const SAVE_ORGANIZATION_BEGIN = 'SAVE_ORGANIZATION_BEGIN';
export const SAVE_ORGANIZATION_SUCCESS = 'SAVE_ORGANIZATION_SUCCESS';
export const SAVE_ORGANIZATION_FAIL = 'SAVE_ORGANIZATION_FAIL';

export const fetchOrganizationsList = (name: string, inn: string, isActive: boolean) => (
dispatch: Dispatch<object>) => {

  dispatch({type: FETCH_ORGANIZATIONS_BEGIN});

  var jsonIn = JSON.stringify({
    name,
    inn,
    isActive
  });

  fetch(`${URL_API}/organization/list.php`, { method: 'POST', body: jsonIn })
    .then(function(response: Response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(function(jsonOut: IJson) { 
      if (jsonOut.error) {
        dispatch({type: FETCH_ORGANIZATIONS_FAIL, payload: jsonOut.error});
      } else if (jsonOut.data) {
        dispatch({type: FETCH_ORGANIZATIONS_SUCCESS, payload: jsonOut.data});
      }
    })
    .catch(function(error: Error) {
      dispatch({type: FETCH_ORGANIZATIONS_FAIL, payload: error.message});
    });

};
  
export const deleteOrganization = (id: number) => (
dispatch: Dispatch<object>) => {

  dispatch({type: DELETE_ORGANIZATION_BEGIN});

  var jsonIn = JSON.stringify({
    id
  });

  fetch(`${URL_API}/organization/delete.php`, { method: 'POST', body: jsonIn })
    .then(function(response: Response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(function(jsonOut: IJson) { 
      if (jsonOut.error) {
        dispatch({type: DELETE_ORGANIZATION_FAIL, payload: jsonOut.error});
      } else if (jsonOut.result === 'success') {
        dispatch({type: DELETE_ORGANIZATION_SUCCESS});
      }
    })
    .catch(function(error: Error) {
      dispatch({type: DELETE_ORGANIZATION_FAIL, payload: error.message});
    });

};

export const getOrganizationById = (id: number) => (
dispatch: Dispatch<object>) => { 

  dispatch({type: GET_ORGANIZATION_BEGIN});

  fetch(`${URL_API}/organization/get.php?id=${id}`)
    .then(function(response: Response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(function(jsonOut: IJson) { 
      if (jsonOut.error) {
        dispatch({type: GET_ORGANIZATION_FAIL, payload: jsonOut.error});
      } else if (jsonOut.data) {
        dispatch({type: GET_ORGANIZATION_SUCCESS, payload: jsonOut.data});
      }
    })
    .catch(function(error: Error) {
      dispatch({type: GET_ORGANIZATION_FAIL, payload: error.message});
    });

};

export const updateOrganization = (
                                    id: number, 
                                    name: string, 
                                    fullName: string, 
                                    inn: string, 
                                    kpp: string, 
                                    address: string, 
                                    phone: string, 
                                    isActive: boolean
                                  ) => (dispatch: Dispatch<object>) => {

  dispatch({type: UPDATE_ORGANIZATION_BEGIN});

  var jsonIn = JSON.stringify({
    id,
    name,
    fullName, 
    inn,
    kpp,
    address,
    phone,
    isActive
  });

  fetch(`${URL_API}/organization/update.php`, { method: 'POST', body: jsonIn })
    .then(function(response: Response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(function(jsonOut: IJson) { 
      if (jsonOut.error) {
        dispatch({type: UPDATE_ORGANIZATION_FAIL, payload: jsonOut.error});
      } else if (jsonOut.result === 'success') {
        dispatch({type: UPDATE_ORGANIZATION_SUCCESS});
      }
    })
    .catch(function(error: Error) {
      dispatch({type: UPDATE_ORGANIZATION_FAIL, payload: error.message});
    });

};

export const saveOrganization = (
                                  name: string, 
                                  fullName: string, 
                                  inn: string, 
                                  kpp: string, 
                                  address: string, 
                                  phone: string, 
                                  isActive: boolean
                                ) => (dispatch: Dispatch<object>) => {

  dispatch({type: SAVE_ORGANIZATION_BEGIN});

  var jsonIn = JSON.stringify({
    name,
    fullName, 
    inn,
    kpp,
    address,
    phone,
    isActive
  });

  fetch(`${URL_API}/organization/save.php`, { method: 'POST', body: jsonIn })
    .then(function(response: Response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(function(jsonOut: IJson) { 
      if (jsonOut.error) {
        dispatch({type: SAVE_ORGANIZATION_FAIL, payload: jsonOut.error});
      } else if (jsonOut.result === 'success') {
        dispatch({type: SAVE_ORGANIZATION_SUCCESS});
      }
    })
    .catch(function(error: Error) {
      dispatch({type: SAVE_ORGANIZATION_FAIL, payload: error.message});
    });

};