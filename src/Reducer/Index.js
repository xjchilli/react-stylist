import {combineReducers} from 'redux';
import merged from 'obj-merged';
import {Tool} from '../Tool';

/**
 * 存储登录的用户信息
 *
 * @param {string} [state=JSON.parse(Tool.localItem('User'))]
 * @param {Object} action
 * @returns Object
 */
const User = (state = JSON.parse(Tool.localItem('User')), action) => {

    switch (action.type) {
        case 'signinSuccess': //登录成功
            Tool.localItem('User', JSON.stringify(action.target));
            return action.target;
        case 'signin': //退出
            Tool.removeLocalItem('User');
            return null;
        default:
            return state;
    }

}



const DB = (_ID = '', seting = {}) => {
    const cb = {
        setDefaut: () => {
            var defaults = merged({
                path: '', //当前页面的href
                loadAnimation: true, //true显示加载动画，false 不显示加载动画
                loadMsg: '加载中', //加载提示
                data: null, //页面的数据
                scrollX: 0, //滚动条X
                scrollY: 0, //滚动条Y
            }, seting);
            return {
                defaults,
                path: {}
            };
        },
        setState: (state, target) => {
            state.path[target.path] = target;
            return merged(state);
        }
    }
    return (state = {}, action = {}) => {
        if (action._ID && action._ID !== _ID) {
            return state;
        } else if (cb[action.type]) {
            return cb[action.type](state, action.target);
        } else {
            return cb.setDefaut();
        }
    }
}


const FashionMoment = DB('FashionMoment', { currentPager: 1, nextBtn: true, data: [] }); //时尚圈
const FashionMomentDetail = DB('FashionMomentDetail', {  data: null }); //时尚圈详情
const Profile = DB('Profile', {data: [] }); //个人信息
const DpsProfile = DB('DpsProfile', {data: null }); //个人信息
const WardrobeDetail = DB('WardrobeDetail'); //衣橱详情
const CustomSuit = DB('CustomSuit',{
   data:{
       sex: 2,//性别
       faceshpe: '1',//脸型
       colorofskin: '1',//肤色
       bodySize: '1',//体型
       problem: ['4'],//解决问题
       style: [],//风格
       heigh: '160',//身高
       weight: '60',//体重
       chest: '80',//胸围
       waist: '70',//腰围
       hip: '90',//臀围
       professional: '',//职业
       cityCode: '330100',//城市默认杭州市
       birthday: '1992-08-08',//生日
       lifeImg: []//生活照
   }
}); //搭配测试
const OrderList = DB('OrderList', { data: [] }); //我的订单
const OrderDetail = DB('OrderDetail', { data: [] }); //订单详情

const reducer=combineReducers({User, FashionMoment, Profile, DpsProfile, WardrobeDetail, CustomSuit, OrderList ,OrderDetail,FashionMomentDetail });




export default reducer;