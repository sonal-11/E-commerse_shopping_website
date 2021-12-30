import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import {store} from './redux/createStore';
// import {persistGate} from 'redux-persist/integration/react';

import App from './App';


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
     <BrowserRouter>
      {/* <persistGate persistor={persistor}> */}
        <App />
      {/* </persistGate> */}
     </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
