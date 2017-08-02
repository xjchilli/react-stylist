import React,{Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
// bundle模型用来异步加载组件
import Bundle from './bundle.js';
// 异步引入
import PromotionCodeContainer from 'bundle-loader?lazy&name=[name]!../page/PromotionCode';
import WardrobeListContainer from 'bundle-loader?lazy&name=[name]!../page/WardrobeList';
import WardrobeModifyContainer from 'bundle-loader?lazy&name=[name]!../page/WardrobeModify';
import ProfileContainer from 'bundle-loader?lazy&name=[name]!../page/Profile';
import TestContainer from 'bundle-loader?lazy&name=[name]!../page/Test';
import Home from '../page/Home'
import NeedMatch from '../page/NeedMatch';


const Profile = () => (
    <Bundle load={ProfileContainer} >
        {(Profile) => <Profile />}
    </Bundle>
)


const WardrobeList = () => (
    <Bundle load={WardrobeListContainer} >
        {(WardrobeList) => <WardrobeList  />}
    </Bundle>
)

const WardrobeModify = () => (
    <Bundle load={WardrobeModifyContainer} >
        {(WardrobeModify) => <WardrobeModify />}
    </Bundle>
)

const PromotionCode = () => (
    <Bundle load={PromotionCodeContainer}>
        {(PromotionCode) => <PromotionCode  />}
    </Bundle>
)

const Test = () => (
    <Bundle load={TestContainer}>
        {(Test) => <Test />}
    </Bundle>
)

const RouteConfig = (
    <Router>
        <Route render={({...props})=> {
            return (<ReactCSSTransitionGroup
                transitionName="fade"
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}>
                <div key={props.location.pathname}>
                    <Route exact path="/" component={Home}/>
                    <Route  path="/profile"  component={Profile} />
                    <Route path="/needMatch" component={NeedMatch} />
                    {/*我的衣橱*/}
                    <Route path="/wardrobeList" component={WardrobeList}/>
                    {/*衣橱修改*/}
                    <Route path='/wardrobeModify/:gid' component={WardrobeModify}/>
                    <Route path="/promotionCode" component={PromotionCode} />
                    <Route path="/test" component={Test} />
                </div>
            </ReactCSSTransitionGroup>)
        }}/>

    </Router>
)

export default RouteConfig;