import React from 'react';
import ReactDOM from 'react-dom';
import './shared/css/index.css';
import AppWrapper from './components/wrapper/boilerplate';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<AppWrapper />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
