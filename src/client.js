import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { browserHistory, Router } from 'react-router';
import routes from './routes';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';

const store = configureStore();

const component = (
  <Provider store={store}>
    <Router history={browserHistory}>
      {routes}
    </Router>
  </Provider>
);

ReactDOM.render(
  <AppContainer>
    {component}
  </AppContainer>,
  document.getElementById('react-view')
);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App').default; // eslint-disable-line newline-after-var
    ReactDOM.render(
      <AppContainer>
        <NextApp />
      </AppContainer>,
      document.getElementById('react-view')
    );
  });
}
