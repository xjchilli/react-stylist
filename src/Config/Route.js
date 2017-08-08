import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { wechatAuth } from './WechatAuth';
import routers from './RouteLazy';// 懒加载

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            auth: false//是否微信授权
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

    render() {
        let main = this.state.auth ? this.props.children : null;
        return main;
    }
}


const RouteConfig = (
    <Router>
        <Route render={({ ...props }) => {
            return <App {...props} >
                <Switch>
                    {
                        routers.map((route,index) => (
                            <Route
                                key={index}
                                path={route.path}
                                exact={route.exact}
                                component={route.component}
                            />
                        ))
                    }
                </Switch>
            </App>
        }} />
    </Router>
)

export default RouteConfig;