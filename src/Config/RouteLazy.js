/**
 * 路由懒加载
 * Created by potato on 2017/8/4 0004.
 */
// bundle模型用来异步加载组件
import Bundle from './bundle.js';

import HomeContainer from 'bundle-loader?lazy&name=[name]!../page/Home';
import GratefulParentActivity from 'bundle-loader?lazy&name=[name]!../page/GratefulParentActivity';
import PlainPeopleChangeContainer from 'bundle-loader?lazy&name=[name]!../page/PlainPeopleChange';
import MyWatchContainer from 'bundle-loader?lazy&name=[name]!../page/MyWatch';
import MyContainer from 'bundle-loader?lazy&name=[name]!../page/My';
import DpsListContainer from 'bundle-loader?lazy&name=[name]!../page/DpsList';
import DpsProfileContainer from 'bundle-loader?lazy&name=[name]!../page/DpsProfile';
import DpsServerDetailContainer from 'bundle-loader?lazy&name=[name]!../page/DpsServerDetail';
import ProfileContainer from 'bundle-loader?lazy&name=[name]!../page/Profile';
import NeedMatchContainer from 'bundle-loader?lazy&name=[name]!../page/NeedMatch';
import ConsultContainer from 'bundle-loader?lazy&name=[name]!../page/Consult';
import ShoppingContainer from 'bundle-loader?lazy&name=[name]!../page/Shopping';
import AccompanyShoppingContainer from 'bundle-loader?lazy&name=[name]!../page/AccompanyShopping';
import NeatenWardrobeContainer from 'bundle-loader?lazy&name=[name]!../page/NeatenWardrobe';
import PayContainer from 'bundle-loader?lazy&name=[name]!../page/Pay';
import PayActivityContainer from 'bundle-loader?lazy&name=[name]!../page/PayActivity';
import CustomSuitContainer from 'bundle-loader?lazy&name=[name]!../page/CustomSuit';
import FashionMomentContainer from 'bundle-loader?lazy&name=[name]!../page/FashionMoment';
import FashionMomentDetailContainer from 'bundle-loader?lazy&name=[name]!../page/FashionMomentDetail';
import MyDpsContainer from 'bundle-loader?lazy&name=[name]!../page/MyDps';
import ArrangementSchemeContainer from 'bundle-loader?lazy&name=[name]!../page/ArrangementScheme';
import ChatContainer from 'bundle-loader?lazy&name=[name]!../page/Chat';
import WardrobeListContainer from 'bundle-loader?lazy&name=[name]!../page/WardrobeList';
import OrderListContainer from 'bundle-loader?lazy&name=[name]!../page/OrderList';
import OrderDetailContainer from 'bundle-loader?lazy&name=[name]!../page/OrderDetail';
import PromotionCodeContainer from 'bundle-loader?lazy&name=[name]!../page/PromotionCode';
import GetPromotionContainer from 'bundle-loader?lazy&name=[name]!../page/GetPromotion';
import ShareContainer from 'bundle-loader?lazy&name=[name]!../page/Share';
import UsageContainer from 'bundle-loader?lazy&name=[name]!../page/Usage';
import FeedbackContainer from 'bundle-loader?lazy&name=[name]!../page/Feedback';
import NotFoundPageContainer from 'bundle-loader?lazy&name=[name]!../page/NotFoundPage';
import Server500Container from 'bundle-loader?lazy&name=[name]!../page/Server500';
import UserChangeContainer from 'bundle-loader?lazy&name=[name]!../page/UserChange';
import TestContainer from 'bundle-loader?lazy&name=[name]!../page/Test';


let getComponent = (props, ComponentFunc) => {
    return (
        <Bundle load={ComponentFunc} {...props}>
            {(Module) => <Module {...props} />}
        </Bundle>
    )
}

let routers = [
    {//首页
        path: '/',
        exact: true,
        component: (props) => getComponent(props, HomeContainer)
    },
    {//感恩活动
        path: '/gratefulParentActivity',
        exact: false,
        component: (props) => getComponent(props, GratefulParentActivity)
    },
    {//素人改造
        path: '/plainPeopleChange',
        exact: false,
        component: (props) => getComponent(props, PlainPeopleChangeContainer)
    },
    {//我的关注
        path: '/myWatch',
        exact: false,
        component: (props) => getComponent(props, MyWatchContainer)
    },
    {//我的
        path: '/my',
        exact: false,
        component: (props) => getComponent(props, MyContainer)
    },
    {//搭配师列表
        path: '/dpsList',
        exact: false,
        component: (props) => getComponent(props, DpsListContainer)
    },
    {//个人信息
        path: '/profile',
        exact: false,
        component: (props) => getComponent(props, ProfileContainer)
    },
    {//搭配师个人信息
        path: '/dpsProfile',
        exact: false,
        component: (props) => getComponent(props, DpsProfileContainer)
    },
    {//搭配师服务详情
        path: '/dpsServerDetail',
        exact: false,
        component: (props) => getComponent(props, DpsServerDetailContainer)
    },
    {//我要搭配入口
        path: '/needMatch',
        exact: false,
        component: (props) => getComponent(props, NeedMatchContainer)
    },
    {//咨询
        path: '/consult',
        exact: false,
        component: (props) => getComponent(props, ConsultContainer)
    },
    {//购物
        path: '/shopping',
        exact: false,
        component: (props) => getComponent(props, ShoppingContainer)
    },
    {//陪逛
        path: '/accompanyShopping',
        exact: false,
        component: (props) => getComponent(props, AccompanyShoppingContainer)
    },
    {//整理衣橱
        path: '/neatenWardrobe',
        exact: false,
        component: (props) => getComponent(props, NeatenWardrobeContainer)
    },
    {//支付
        path: '/pay',
        exact: false,
        component: (props) => getComponent(props, PayContainer)
    },
    {//支付-活动
        path: '/payActivity',
        exact: false,
        component: (props) => getComponent(props, PayActivityContainer)
    },
    {//搭配测试
        path: '/customSuit',
        exact: false,
        component: (props) => getComponent(props, CustomSuitContainer)
    },
    {//时尚圈
        path: '/fashionMoment',
        exact: false,
        component: (props) => getComponent(props, FashionMomentContainer)
    },
    {//时尚圈详情
        path: '/fashionMomentDetail',
        exact: false,
        component: (props) => getComponent(props, FashionMomentDetailContainer)
    },
    {//我的搭配师
        path: '/myDps',
        exact: false,
        component: (props) => getComponent(props, MyDpsContainer)
    },
    {//搭配方案
        path: '/arrangementScheme',
        exact: false,
        component: (props) => getComponent(props, ArrangementSchemeContainer)
    },
    {//聊天
        path: '/chat',
        exact: false,
        component: (props) => getComponent(props, ChatContainer)
    },
    {//我的衣橱
        path: '/wardrobeList',
        exact: false,
        component: (props) => getComponent(props, WardrobeListContainer)
    },
    {//我的订单
        path: '/orderList',
        exact: false,
        component: (props) => getComponent(props, OrderListContainer)
    },
    {//订单详情
        path: '/orderDetail',
        exact: false,
        component: (props) => getComponent(props, OrderDetailContainer)
    },
    {//优惠码
        path: '/promotionCode',
        exact: false,
        component: (props) => getComponent(props, PromotionCodeContainer)
    },
    {//成功领取优惠劵
        path: '/getPromotion',
        exact: false,
        component: (props) => getComponent(props, GetPromotionContainer)
    },
    {//分享
        path: '/share',
        exact: false,
        component: (props) => getComponent(props, ShareContainer)
    },
    {//使用规则
        path: '/usage',
        exact: false,
        component: (props) => getComponent(props, UsageContainer)
    },
    {//反馈
        path: '/feedback',
        exact: false,
        component: (props) => getComponent(props, FeedbackContainer)
    },
    {//切换用户
        path: '/userChange',
        exact: false,
        component: (props) => getComponent(props, UserChangeContainer)
    },
    {//test
        path: '/test',
        exact: false,
        component: (props) => getComponent(props, TestContainer)
    },
    {//反馈
        path: '/404',
        exact: false,
        component: (props) => getComponent(props, NotFoundPageContainer)
    },
    {//500
        path: '/500',
        exact: false,
        component: (props) => getComponent(props, Server500Container)
    },
];


export default routers;