import { Dispatch } from 'react-redux'; 

import { IJson } from '../models';

const URL_API = 'https://evstar.000webhostapp.com/bellintegrator/api';

export const FETCH_WORKERS_BEGIN = 'FETCH_WORKERS_BEGIN';
export const FETCH_WORKERS_SUCCESS = 'FETCH_WORKERS_SUCCESS';
export const FETCH_WORKERS_FAIL = 'FETCH_WORKERS_FAIL';

export const DELETE_WORKER_BEGIN = 'DELETE_WORKER_BEGIN';
export const DELETE_WORKER_SUCCESS = 'DELETE_WORKER_SUCCESS';
export const DELETE_WORKER_FAIL = 'DELETE_WORKER_FAIL';

export const GET_WORKER_BEGIN = 'GET_WORKER_BEGIN';
export const GET_WORKER_SUCCESS = 'GET_WORKER_SUCCESS';
export const GET_WORKER_FAIL = 'GET_WORKER_FAIL';

export const UPDATE_WORKER_BEGIN = 'UPDATE_WORKER_BEGIN';
export const UPDATE_WORKER_SUCCESS = 'UPDATE_WORKER_SUCCESS';
export const UPDATE_WORKER_FAIL = 'UPDATE_WORKER_FAIL';

export const SAVE_WORKER_BEGIN = 'SAVE_WORKER_BEGIN';
export const SAVE_WORKER_SUCCESS = 'SAVE_WORKER_SUCCESS';
export const SAVE_WORKER_FAIL = 'SAVE_WORKER_FAIL';

export const fetchWorkersList = ( officeId: number, 
                                  firstName: string, 
                                  lastName: string, 
                                  middleName: string,  
                                  position: string,
                                  docCode: number,
                                  citizenshipCode: number ) => (
dispatch: Dispatch<object>) => {

  dispatch({type: FETCH_WORKERS_BEGIN});

  var jsonIn = JSON.stringify({
    officeId,
    firstName,
    lastName,
    middleName,
    position,
    docCode,
    citizenshipCode
  });

  fetch(`${URL_API}/user/list.php`, { method: 'POST', body: jsonIn })
    .then(function(response: Response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(function(jsonOut: IJson) { 

      if (jsonOut.error) {
        dispatch({type: FETCH_WORKERS_FAIL, payload: jsonOut.error});
      } else if (jsonOut.data) {
        dispatch({type: FETCH_WORKERS_SUCCESS, payload: jsonOut.data});
      }
    })
    .catch(function(error: Error) {
      dispatch({type: FETCH_WORKERS_FAIL, payload: error.message});
    });

};

export const deleteWorker = (id: number) => (
dispatch: Dispatch<object>) => {

  dispatch({type: DELETE_WORKER_BEGIN});

  var jsonIn = JSON.stringify({
    id
  });

  fetch(`${URL_API}/user/delete.php`, { method: 'POST', body: jsonIn })
    .then(function(response: Response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(function(jsonOut: IJson) { 
      if (jsonOut.error) {
        dispatch({type: DELETE_WORKER_FAIL, payload: jsonOut.error});
      } else if (jsonOut.result === 'success') {
        dispatch({type: DELETE_WORKER_SUCCESS});
      }
    })
    .catch(function(error: Error) {
      dispatch({type: DELETE_WORKER_FAIL, payload: error.message});
    });

};

export const getWorkerById = (id: number) => (
dispatch: Dispatch<object>) => { 
  console.log(id);
  dispatch({type: GET_WORKER_BEGIN});

  fetch(`${URL_API}/user/get.php?id=${id}`)
    .then(function(response: Response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(function(jsonOut: IJson) { 
      console.log(jsonOut);
      if (jsonOut.error) {
        dispatch({type: GET_WORKER_FAIL, payload: jsonOut.error});
      } else if (jsonOut.data) {
        dispatch({type: GET_WORKER_SUCCESS, payload: jsonOut.data});
      }
    })
    .catch(function(error: Error) {
      dispatch({type: GET_WORKER_FAIL, payload: error.message});
    });

};
  
export const updateWorker = (
                              id: number,
                              firstName: string, 
                              lastName: string,
                              middleName: string,
                              position: string, 
                              phone: string, 
                              docCode: number, 
                              docName: string, 
                              docNumber: string, 
                              docDate: string, 
                              citizenshipCode: number, 
                              citizenshipName: string, 
                              isIdentified: boolean
                            ) => (dispatch: Dispatch<object>) => {

  dispatch({type: UPDATE_WORKER_BEGIN});

  var jsonIn = JSON.stringify({
    id,
    firstName, 
    lastName,
    middleName,
    position, 
    phone, 
    docCode, 
    docName, 
    docNumber, 
    docDate, 
    citizenshipCode, 
    citizenshipName, 
    isIdentified
  });

  fetch(`${URL_API}/user/update.php`, { method: 'POST', body: jsonIn })
    .then(function(response: Response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(function(jsonOut: IJson) { 
      if (jsonOut.error) {
        dispatch({type: UPDATE_WORKER_FAIL, payload: jsonOut.error});
      } else if (jsonOut.result === 'success') {
        dispatch({type: UPDATE_WORKER_SUCCESS});
      }
    })
    .catch(function(error: Error) {
      dispatch({type: UPDATE_WORKER_FAIL, payload: error.message});
    });

};

export const saveWorker = (
                            officeId: number,
                            firstName: string, 
                            lastName: string,
                            middleName: string,
                            position: string, 
                            phone: string, 
                            docCode: number, 
                            docName: string, 
                            docNumber: string, 
                            docDate: string, 
                            citizenshipCode: number, 
                            citizenshipName: string, 
                            isIdentified: boolean
                          ) => (dispatch: Dispatch<object>) => {

  dispatch({type: SAVE_WORKER_BEGIN});

  var jsonIn = JSON.stringify({
    officeId,
    firstName, 
    lastName,
    middleName,
    position, 
    phone, 
    docCode, 
    docName, 
    docNumber, 
    docDate, 
    citizenshipCode, 
    citizenshipName, 
    isIdentified
  });

  fetch(`${URL_API}/user/save.php`, { method: 'POST', body: jsonIn })
    .then(function(response: Response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(function(jsonOut: IJson) { 
      if (jsonOut.error) {
        dispatch({type: SAVE_WORKER_FAIL, payload: jsonOut.error});
      } else if (jsonOut.result === 'success') {
        dispatch({type: SAVE_WORKER_SUCCESS});
      }
    })
    .catch(function(error: Error) {
      dispatch({type: SAVE_WORKER_FAIL, payload: error.message});
    });

};