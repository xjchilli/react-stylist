import React from 'react';
import {
	render
} from 'react-dom'
import {
	Provider
} from 'react-redux';


import store from './Config/Store';
import route from './Config/Route';
import './Style/dps.less';

render(
	<Provider store={store}>
        {route}
    </Provider>,
	document.getElementById('app')
);