import React,{Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';
import Home from '../page/Home'
import PromotionCode from '../page/PromotionCode';
import FashionMoment from '../page/FashionMoment';


const RouteConfig = (
    <Router>
        <div>
            <Route path="/" component={Home} />
            <Route path="/fashionMoment" component={FashionMoment} />
            <Route path="/promotionCode" component={PromotionCode} />
        </div>

    </Router>
)

export default RouteConfig;