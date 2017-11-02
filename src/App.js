// import "babel-polyfill";
import React from 'react';
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
// import initReactFastclick from 'react-fastclick';//处理react click失效问题
// initReactFastclick();
// var FastClick = require('fastclick');
// if ('addEventListener' in document) {
// 	document.addEventListener('DOMContentLoaded', function () {
// 		FastClick.attach(document.body);
// 	}, false);
// }


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
