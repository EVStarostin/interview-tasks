import { Dispatch } from 'react-redux'; 

import { IJson } from '../models';

const URL_API = 'https://evstar.000webhostapp.com/bellintegrator/api';

export const SIGN_IN_BEGIN = 'SIGN_IN_BEGIN';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAIL = 'SIGN_IN_FAIL'; 
export const SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS';

export const signIn = (login: string, password: string) => (dispatch: Dispatch<object>) => {

  dispatch({type: SIGN_IN_BEGIN});

  if (!login || !password) { 
    dispatch({type: SIGN_IN_FAIL, payload: 'Логин и/или пароль не заполнены'});
    return;
  }

  const jsonIn = JSON.stringify({ login, password });

  fetch(`${URL_API}/login.php`, { method: 'POST', body: jsonIn })
    .then(function(response: Response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(function(jsonOut: IJson) { 
      if (jsonOut.error) {
        dispatch({type: SIGN_IN_FAIL, payload: jsonOut.error});
      } else if (jsonOut.result === 'success') {
        localStorage.setItem('isAuthenticated', login);
        dispatch({type: SIGN_IN_SUCCESS, payload: login});
      }
    })
    .catch(function(error: Error) {
      dispatch({type: SIGN_IN_FAIL, payload: error.message});
    });

};

export const signOut = () => (dispatch: Dispatch<object>) => {

  localStorage.removeItem('isAuthenticated');
  dispatch({type: SIGN_OUT_SUCCESS});

};