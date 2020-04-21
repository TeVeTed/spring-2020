import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import './global';

if (module.hot) {
	module.hot.accept();
}

ReactDOM.render(<App />, document.getElementById('root'));
