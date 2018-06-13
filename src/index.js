import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from "react-hot-loader";
import {Provider} from 'react-redux'
import Router from './router/'
import registerServiceWorker from './registerServiceWorker';
import store from '@/redux/'
import './styles/index.scss';

const render = Component=>{
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <Component />
            </Provider>
        </AppContainer>,
        document.getElementById('root')
    )
}
render(Router)
registerServiceWorker();

if (module.hot) {
  module.hot.accept("@/router/", () => {
    const NextApp = require("./router/").default;
    render(NextApp);
  });
}