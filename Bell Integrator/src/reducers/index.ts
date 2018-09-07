import { combineReducers } from 'redux';

import auth from './authReducer';
import organization from './organizationReducer';
import office from './officeReducer';
import worker from './workerReducer';
import { docs, countries } from './directoryReducer';

export default combineReducers({
  auth,
  organization,
  office,
  worker,
  docs,
  countries
});