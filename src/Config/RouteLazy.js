/**
 * 路由懒加载
 * Created by potato on 2017/8/4 0004.
 */
// bundle模型用来异步加载组件
import Bundle from './bundle.js';

import HomeContainer from 'bundle-loader?lazy&name=[name]!../page/Home';
import NeedMatchContainer from 'bundle-loader?lazy&name=[name]!../page/NeedMatch';
import ProfileContainer from 'bundle-loader?lazy&name=[name]!../page/Profile';
import WardrobeListContainer from 'bundle-loader?lazy&name=[name]!../page/WardrobeList';
import WardrobeModifyContainer from 'bundle-loader?lazy&name=[name]!../page/WardrobeModify';
import PromotionCodeContainer from 'bundle-loader?lazy&name=[name]!../page/PromotionCode';
import TestContainer from 'bundle-loader?lazy&name=[name]!../page/Test';


//首页
const Home = () => (
    <Bundle load={HomeContainer} >
        {(Home) => <Home />}
    </Bundle>
);

//我要搭配入口
const NeedMatch = () => (
    <Bundle load={NeedMatchContainer} >
        {(NeedMatch) => <NeedMatch />}
    </Bundle>
);

//个人信息
const Profile = () => (
    <Bundle load={ProfileContainer} >
        {(Profile) => <Profile />}
    </Bundle>
);

//衣橱列表
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
//优惠码
const PromotionCode = () => (
    <Bundle load={PromotionCodeContainer}>
        {(PromotionCode) => <PromotionCode  />}
    </Bundle>
);
//测试
const Test = () => (
    <Bundle load={TestContainer}>
        {(Test) => <Test />}
    </Bundle>
);

export {
    Home,
    NeedMatch,
    Profile,
    WardrobeList,
    WardrobeModify,
    PromotionCode,
    Test
}