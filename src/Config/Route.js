import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { wechatAuth } from './WechatAuth';
import routers from './RouteLazy';// 懒加载
import { Footer } from '../Component/index';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            auth: false,//是否微信授权
            filterRouter: this.filterLogin(props) || false
        };
        this.setAuth = () => {
            this.setState({
                auth: true
            });
        };
    }

    componentDidMount() {
        this.state.auth ? null : wechatAuth(this.props, this.setAuth);
    }


    componentWillReceiveProps(nextProps) {
        this.setState({
            filterRouter: this.filterLogin(nextProps) || false
        });
    }



    /**
     * 拦截登录路由 
     * 首页: /
     * 热门搭配师:/dpsList 
     * 我要搭配:/needMatch
     * 发现:/fashionMoment
     * 我的：/my
     */
    filterLogin(props) {
        const { pathname } = props.location;
        return /(^\/$|^\/dpsList|^\/needMatch|^\/fashionMoment$|^\/my)/g.test(pathname);
    }

    render() {
        let layout = this.state.filterRouter ? (
            <section>
                <Footer />
                {this.props.children}
            </section>
        ) : this.props.children;
        let main = this.state.auth ? layout : null;
        return main;
    }
}


const RouteConfig = (
    <Router>
        <Route render={({ ...props }) => {
            return <App {...props} >
                <Switch>
                    {
                        routers.map((route, index) => (
                            <Route
                                key={index}
                                path={route.path}
                                exact={route.exact}
                                component={route.component}
                            />
                        ))
                    }
                    <Redirect from="*" to="/404" />
                </Switch>
            </App>
        }} />
    </Router>
)

export default RouteConfig;