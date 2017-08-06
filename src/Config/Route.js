import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { wechatAuth } from './WechatAuth';
// 异步引入
import {
    Home,
    DpsProfile,
    DpsServerDetail,
    Profile,
    NeedMatch,
    Consult,
    ConsultHelp,
    Shopping,
    ShoppingHelp,
    AccompanyShopping,
    AccompanyShoppingHelp,
    NeatenWardrobe,
    NeatenWardrobeHelp,
    Pay,
    CustomSuit,
    FashionMoment,
    FashionMomentDetail,
    MyDps,
    ArrangementScheme,
    Chat,
    WardrobeList,
    WardrobeModify,
    OrderList,
    OrderDetail,
    PromotionCode,
    Share,
    Usage,
    Feedback,
    NotFoundPage,
    Server500,
    Test
} from './RouteLazy'

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
        localStorage.setItem('User', JSON.stringify({ openId: 'oGHrAv2QLJaScmtYKnK-oVvF81S8' }));
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
                {/* <ReactCSSTransitionGroup
                    transitionName="fade"
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}>
                    <div key={props.location.pathname}>
                    </div>
                </ReactCSSTransitionGroup> */}
                <Switch>
                    {/*首页  */}
                    <Route exact path="/" component={Home} />
                    {/*个人信息*/}
                    <Route path="/profile" component={Profile} />
                    {/*搭配师个人信息*/}
                    <Route path="/dpsProfile" component={DpsProfile} />
                    {/*搭配师服务详情*/}
                    <Route path="/dpsServerDetail" component={DpsServerDetail} />
                    {/*我要搭配入口*/}
                    <Route path="/needMatch" component={NeedMatch} />
                    {/*咨询*/}
                    <Route path="/consult" component={Consult} />
                    {/*咨询介绍*/}
                    <Route path="/consultHelp" component={ConsultHelp} />
                    {/*购物*/}
                    <Route path="/shopping" component={Shopping} />
                    {/*购物介绍*/}
                    <Route path="/shoppingHelp" component={ShoppingHelp} />
                    {/*陪逛*/}
                    <Route path="/accompanyShopping" component={AccompanyShopping} />
                    {/*陪逛介绍*/}
                    <Route path="/accompanyShoppingHelp" component={AccompanyShoppingHelp} />
                    {/*整理衣橱*/}
                    <Route path="/neatenWardrobe" component={NeatenWardrobe} />
                    {/*整理衣橱介绍*/}
                    <Route path="/neatenWardrobeHelp" component={NeatenWardrobeHelp} />
                    {/*支付*/}
                    <Route path="/pay" component={Pay} />
                    {/*搭配测试*/}
                    <Route path="/customSuit" component={CustomSuit} />
                    {/*时尚圈*/}
                    <Route path="/fashionMoment" component={FashionMoment} />
                    {/*时尚圈详情*/}
                    <Route path="/fashionMomentDetail" component={FashionMomentDetail} />
                    {/*我的搭配师*/}
                    <Route path="/myDps" component={MyDps} />
                    {/*搭配方案*/}
                    <Route path="/arrangementScheme" component={ArrangementScheme} />
                    {/*聊天*/}
                    <Route path="/chat" component={Chat} />
                    {/*我的衣橱*/}
                    <Route path="/wardrobeList" component={WardrobeList} />
                    {/*衣橱修改*/}
                    <Route path='/wardrobeModify' component={WardrobeModify} />
                    {/*我的订单*/}
                    <Route path="/orderList" component={OrderList} />
                    {/*订单详情*/}
                    <Route path="/orderDetail" component={OrderDetail} />
                    {/*优惠码*/}
                    <Route path="/promotionCode" component={PromotionCode} />
                    {/*分享*/}
                    <Route path="/share" component={Share} />
                    {/*使用规则*/}
                    <Route path="/usage" component={Usage} />
                    {/*反馈*/}
                    <Route path="/feedback" component={Feedback} />
                    {/*测试用*/}
                    <Route path="/test" component={Test} />
                    {/*404*/}
                    <Route path="/404" component={NotFoundPage} />
                    {/*500*/}
                    <Route path="/500" component={Server500} />
                    <Redirect from="*" to="/404" />
                </Switch>
            </App>
        }} />
    </Router>
)

export default RouteConfig;