import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { wechatAuth } from './WechatAuth';
import routers from './RouteLazy';// 懒加载
import { Footer, shake, UserFeedbackLayer } from '../Component/index';
import { ToolDps } from '../ToolDps';
const dpsShake = shake();//摇一摇实例化

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            auth: false,//是否微信授权
            filterRouter: this.filterRouter(props) || false,
            shake: false//是否显示摇一摇
        };
        this.setAuth = () => {
            this.setState({
                auth: true
            });
        };

        //如果禁用过就不能启动摇一摇
        if (!ToolDps.localItem('disableShake')) {
            dpsShake.add(() => {
                this.setState({
                    shake: true
                });
            });
        }

    }

    componentDidMount() {
        this.state.auth ? null : wechatAuth(this.props, this.setAuth);
    }


    componentWillReceiveProps(nextProps) {
        this.setState({
            filterRouter: this.filterRouter(nextProps) || false
        });
    }


    /**
     * 禁用摇一摇
     */
    disableShake() {
        dpsShake.remove();
        this.setState({
            shake: false
        });
        ToolDps.localItem('disableShake', 'true');
    }

    /**
     * 关闭摇一摇功能
     */
    closeShake() {
        this.setState({
            shake: false
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
    filterRouter(props) {
        const { pathname } = props.location;
        return /(^\/$|^\/dpsList$|^\/needMatch|^\/fashionMoment$|^\/my$)/.test(pathname);
    }

    render() {
        let layout = this.state.filterRouter ? (
            <section>
                {/* 底部tab */}
                <Footer />
                {this.props.children}
                {/* 摇一摇显示反馈入口 */}
                {this.state.shake ? <UserFeedbackLayer closeShake={this.closeShake.bind(this)} disableShake={this.disableShake.bind(this)} /> : null}
            </section>
        ) : (
                <section>
                    {this.props.children}
                    {/* 摇一摇显示反馈入口 */}
                    {this.state.shake ? <UserFeedbackLayer closeShake={this.closeShake.bind(this)} disableShake={this.disableShake.bind(this)} /> : null}
                </section>
            );
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