import React,{Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Home from '../page/Home'
import Profile from '../page/Profile';
import NeedMatch from '../page/NeedMatch';
import WardrobeList from '../page/WardrobeList';
import WardrobeModify from '../page/WardrobeModify';
import PromotionCode from '../page/PromotionCode';


const RouteConfig = (
    <Router>
        <Route render={({location})=> {
            console.log(location);
            return (<ReactCSSTransitionGroup
                transitionName="fade"
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}>
                <div key={location.pathname}>
                    <Route exact path="/" component={Home}/>
                    <Route  path="/profile" component={Profile} />
                    <Route path="/needMatch" component={NeedMatch} />
                    {/*我的衣橱*/}
                    <Route path="/wardrobeList" component={WardrobeList}/>
                    {/*衣橱修改*/}
                    <Route path='/wardrobeModify/:gid' component={WardrobeModify}/>
                    <Route path="/promotionCode" component={PromotionCode} />
                </div>
            </ReactCSSTransitionGroup>)
        }}/>

    </Router>
)

export default RouteConfig;