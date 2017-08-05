/**
 * 路由懒加载
 * Created by potato on 2017/8/4 0004.
 */
// bundle模型用来异步加载组件
import Bundle from './bundle.js';

import HomeContainer from 'bundle-loader?lazy&name=[name]!../page/Home';
import DpsProfileContainer from 'bundle-loader?lazy&name=[name]!../page/DpsProfile';
import DpsServerDetailContainer from 'bundle-loader?lazy&name=[name]!../page/DpsServerDetail';
import ProfileContainer from 'bundle-loader?lazy&name=[name]!../page/Profile';
import NeedMatchContainer from 'bundle-loader?lazy&name=[name]!../page/NeedMatch';
import ConsultContainer from 'bundle-loader?lazy&name=[name]!../page/Consult';
import ConsultHelpContainer from 'bundle-loader?lazy&name=[name]!../page/ConsultHelp';
import ShoppingContainer from 'bundle-loader?lazy&name=[name]!../page/Shopping';
import ShoppingHelpContainer from 'bundle-loader?lazy&name=[name]!../page/ShoppingHelp';
import AccompanyShoppingContainer from 'bundle-loader?lazy&name=[name]!../page/AccompanyShopping';
import AccompanyShoppingHelpContainer from 'bundle-loader?lazy&name=[name]!../page/AccompanyShoppingHelp';
import NeatenWardrobeContainer from 'bundle-loader?lazy&name=[name]!../page/NeatenWardrobe';
import NeatenWardrobeHelpContainer from 'bundle-loader?lazy&name=[name]!../page/NeatenWardrobeHelp';
import PayContainer from 'bundle-loader?lazy&name=[name]!../page/Pay';
import CustomSuitContainer from 'bundle-loader?lazy&name=[name]!../page/CustomSuit';
import FashionMomentContainer from 'bundle-loader?lazy&name=[name]!../page/FashionMoment';
import FashionMomentDetailContainer from 'bundle-loader?lazy&name=[name]!../page/FashionMomentDetail';
import MyDpsContainer from 'bundle-loader?lazy&name=[name]!../page/MyDps';
import ArrangementSchemeContainer from 'bundle-loader?lazy&name=[name]!../page/ArrangementScheme';
import ChatContainer from 'bundle-loader?lazy&name=[name]!../page/Chat';
import WardrobeListContainer from 'bundle-loader?lazy&name=[name]!../page/WardrobeList';
import WardrobeModifyContainer from 'bundle-loader?lazy&name=[name]!../page/WardrobeModify';
import OrderListContainer from 'bundle-loader?lazy&name=[name]!../page/OrderList';
import OrderDetailContainer from 'bundle-loader?lazy&name=[name]!../page/OrderDetail';
import PromotionCodeContainer from 'bundle-loader?lazy&name=[name]!../page/PromotionCode';
import ShareContainer from 'bundle-loader?lazy&name=[name]!../page/Share';
import UsageContainer from 'bundle-loader?lazy&name=[name]!../page/Usage';
import FeedbackContainer from 'bundle-loader?lazy&name=[name]!../page/Feedback';
import NotFoundPageContainer from 'bundle-loader?lazy&name=[name]!../page/NotFoundPage';
import Server500Container from 'bundle-loader?lazy&name=[name]!../page/Server500';
import TestContainer from 'bundle-loader?lazy&name=[name]!../page/Test';


//首页
const Home = () => (
    <Bundle load={HomeContainer} >
        {(Home) => <Home />}
    </Bundle>
);

//搭配师个人信息
const DpsProfile = () => (
    <Bundle load={DpsProfileContainer} >
        {(DpsProfile) => <DpsProfile />}
    </Bundle>
);

//搭配师服务详情
const DpsServerDetail = () => (
    <Bundle load={DpsServerDetailContainer} >
        {(DpsServerDetail) => <DpsServerDetail />}
    </Bundle>
);

//个人信息
const Profile = () => (
    <Bundle load={ProfileContainer} >
        {(Profile) => <Profile />}
    </Bundle>
);

//我要搭配入口
const NeedMatch = () => (
    <Bundle load={NeedMatchContainer} >
        {(NeedMatch) => <NeedMatch />}
    </Bundle>
);


//咨询
const Consult = () => (
    <Bundle load={ConsultContainer} >
        {(Consult) => <Consult />}
    </Bundle>
);


//咨询介绍
const ConsultHelp = () => (
    <Bundle load={ConsultHelpContainer} >
        {(ConsultHelp) => <ConsultHelp />}
    </Bundle>
);

//购物
const Shopping = () => (
    <Bundle load={ShoppingContainer} >
        {(Shopping) => <Shopping />}
    </Bundle>
);

//购物介绍
const ShoppingHelp = () => (
    <Bundle load={ShoppingHelpContainer} >
        {(ShoppingHelp) => <ShoppingHelp />}
    </Bundle>
);

//陪逛
const AccompanyShopping = () => (
    <Bundle load={AccompanyShoppingContainer} >
        {(AccompanyShopping) => <AccompanyShopping />}
    </Bundle>
);

//陪逛介绍
const AccompanyShoppingHelp = () => (
    <Bundle load={AccompanyShoppingHelpContainer} >
        {(AccompanyShoppingHelp) => <AccompanyShoppingHelp />}
    </Bundle>
);

//整理衣橱
const NeatenWardrobe = () => (
    <Bundle load={NeatenWardrobeContainer} >
        {(NeatenWardrobe) => <NeatenWardrobe />}
    </Bundle>
);

//整理衣橱介绍
const NeatenWardrobeHelp = () => (
    <Bundle load={NeatenWardrobeHelpContainer} >
        {(NeatenWardrobeHelp) => <NeatenWardrobeHelp />}
    </Bundle>
);

//支付
const Pay = () => (
    <Bundle load={PayContainer} >
        {(Pay) => <Pay />}
    </Bundle>
);

//搭配测试
const CustomSuit = () => (
    <Bundle load={CustomSuitContainer} >
        {(CustomSuit) => <CustomSuit />}
    </Bundle>
);

//时尚圈
const FashionMoment = () => (
    <Bundle load={FashionMomentContainer} >
        {(FashionMoment) => <FashionMoment />}
    </Bundle>
);

//时尚圈详情
const FashionMomentDetail = () => (
    <Bundle load={FashionMomentDetailContainer} >
        {(FashionMomentDetail) => <FashionMomentDetail />}
    </Bundle>
);

//我的搭配师
const MyDps = () => (
    <Bundle load={MyDpsContainer} >
        {(MyDps) => <MyDps />}
    </Bundle>
);

//搭配方案
const ArrangementScheme = () => (
    <Bundle load={ArrangementSchemeContainer} >
        {(ArrangementScheme) => <ArrangementScheme />}
    </Bundle>
);

//聊天
const Chat = () => (
    <Bundle load={ChatContainer} >
        {(Chat) => <Chat />}
    </Bundle>
);

//我的衣橱
const WardrobeList = () => (
    <Bundle load={WardrobeListContainer} >
        {(WardrobeList) => <WardrobeList  />}
    </Bundle>
);
//衣橱修改
const WardrobeModify = () => (
    <Bundle load={WardrobeModifyContainer} >
        {(WardrobeModify) => <WardrobeModify />}
    </Bundle>
);

//我的订单
const OrderList = () => (
    <Bundle load={OrderListContainer} >
        {(OrderList) => <OrderList />}
    </Bundle>
);

//订单详情
const OrderDetail = () => (
    <Bundle load={OrderDetailContainer} >
        {(OrderDetail) => <OrderDetail />}
    </Bundle>
);


//优惠码
const PromotionCode = () => (
    <Bundle load={PromotionCodeContainer}>
        {(PromotionCode) => <PromotionCode  />}
    </Bundle>
);


//分享
const Share = () => (
    <Bundle load={ShareContainer} >
        {(Share) => <Share />}
    </Bundle>
);


//使用规则
const Usage = () => (
    <Bundle load={UsageContainer} >
        {(Usage) => <Usage />}
    </Bundle>
);


//反馈
const Feedback = () => (
    <Bundle load={FeedbackContainer} >
        {(Feedback) => <Feedback />}
    </Bundle>
);


//测试
const Test = () => (
    <Bundle load={TestContainer}>
        {(Test) => <Test />}
    </Bundle>
);


//404
const NotFoundPage = () => (
    <Bundle load={NotFoundPageContainer} >
        {(NotFoundPage) => <NotFoundPage />}
    </Bundle>
);


//500
const Server500 = () => (
    <Bundle load={Server500Container} >
        {(Server500) => <Server500 />}
    </Bundle>
);


export {
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
}