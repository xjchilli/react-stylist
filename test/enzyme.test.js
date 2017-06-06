import React from 'react';
import {
	shallow,
	mount,
	render
} from 'enzyme';
import {
	expect
} from 'chai';
import App from '../src/App.js';

describe('Enzyme Shallow', function() {
	it('App\'s Test', function() {
		let app = shallow(<App/>);
		// console.log(app);
		expect(app.find('h1').text()).to.equal('Todos');
	});
});