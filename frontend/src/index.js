import React from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { AppContextProvider } from './AppContextProvider';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

ReactDOM.render(
  <React.StrictMode>
    {/* <Router> */}
      <AppContextProvider>
        <App />
      </AppContextProvider>
    {/* </Router> */}
  </React.StrictMode>,
  document.getElementById('root')
);

// Change to "register()" to enable service workers (production only)
serviceWorkerRegistration.unregister();
