import React from 'react';
import ReactDOM from 'react-dom';


require('./style/app.css');

const render = () => {
    ReactDOM.render(
       <div>1</div>,
        document.getElementById('app')
    );
};

render();
