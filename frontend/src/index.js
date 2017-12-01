import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import store from 'store';
import Root from './Root';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Root store={store} />, document.getElementById('root'));
registerServiceWorker();
