import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.scss';
import App from './App';

import storage from './utils/storage';
storage.init();

ReactDOM.render(<App />, document.getElementById('root'));
