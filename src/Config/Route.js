import React from 'react';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { wechatAuth } from './WechatAuth';
// 异步引入
import {
    Home,
    NeedMatch,
    Profile,
    WardrobeList,
    WardrobeModify,
    PromotionCode,
    Test
} from './RouteLazy'

class App extends React.Component{
    constructor(props){
        super(props);

        this.state={
            auth:true
        };
        this.setAuth=()=>{
            this.setState({
                auth:true
            });
        };
    }

    componentDidMount(){
        this.state.auth ? null : wechatAuth(this.props,this.setAuth);
    }

    render(){

        let main = this.state.auth ? (
            <Switch>
                {/*<ReactCSSTransitionGroup*/}
                    {/*transitionName="fade"*/}
                    {/*transitionEnterTimeout={300}*/}
                    {/*transitionLeaveTimeout={300}>*/}
                    {/*<div key={this.props.location.pathname}>     </div>*/}
                {/*</ReactCSSTransitionGroup>*/}
                <Route exact path="/" component={Home}/>
                <Route  path="/profile"  component={Profile} />
                <Route path="/needMatch" component={NeedMatch} />
                {/*我的衣橱*/}
                <Route path="/wardrobeList" component={WardrobeList}/>
                {/*衣橱修改*/}
                <Route path='/wardrobeModify' component={WardrobeModify}/>
                <Route path="/promotionCode" component={PromotionCode} />
                <Route path="/test" component={Test} />

            </Switch>
        ) : null;
        return main;
    }
}
const RouteConfig =(
    <Router>
        <Route render={({...props})=>{
            return  <App {...props}/>
        }}/>

    </Router>
)

export default RouteConfig;