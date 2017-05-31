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
import Home from '../page/Home'
// import Profile from '../page/Profile';
import NeedMatch from '../page/NeedMatch';
// import WardrobeList from '../page/WardrobeList';
// import WardrobeModify from '../page/WardrobeModify';
// import PromotionCode from '../page/PromotionCode';


let _routerProps=null;

const Profile = () => (
    <Bundle load={ProfileContainer} >
        {(Profile) => <Profile {..._routerProps} />}
    </Bundle>
)


const WardrobeList = () => (
    <Bundle load={WardrobeListContainer} >
        {(WardrobeList) => <WardrobeList {..._routerProps} />}
    </Bundle>
)

const WardrobeModify = () => (
    <Bundle load={WardrobeModifyContainer} >
        {(WardrobeModify) => <WardrobeModify {..._routerProps} />}
    </Bundle>
)

const PromotionCode = () => (
    <Bundle load={PromotionCodeContainer}>
        {(PromotionCode) => <PromotionCode {..._routerProps} />}
    </Bundle>
)

const RouteConfig = (
    <Router>
        <Route render={({...props})=> {
            _routerProps=props;
            console.log(props);
            return (<ReactCSSTransitionGroup
                transitionName="fade"
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}>
                <div key={location.pathname}>
                    <Route exact path="/" component={Home}/>
                    <Route  path="/profile"  component={Profile} />
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