import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducer from './reducers';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/index.css';

/*  
  Создаем store. Первым параметром передаем combined reducers.
  Используем composeWithDevTools для того, чтобы использовать redux devtools и redux-thunk одновременно
*/
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

/* 
  Благодаря Provider из react-redux store будет доступен в каждой компоненте, 
  которая будет child компонентой Provider 
*/

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
