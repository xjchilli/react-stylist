import React from 'react';
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
var FastClick = require('fastclick');
FastClick.attach(document.getElementById('app'));

//开发模式下用mock.js
if (process.env.NODE_ENV !== 'production') {
	let mock = require('./mock/mock');
	mock();
}

import store from './Config/Store';
import route from './Config/Route';
import 'swiper'
import './Style/dps.less';


ReactDOM.render(
	<Provider store={store}>
		{route}
	</Provider>,
	document.getElementById('app')
);

