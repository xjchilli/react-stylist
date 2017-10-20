import { combineReducers } from 'redux';
// import { combineReducers } from 'redux-immutablejs';
import merged from 'obj-merged';
import { ToolDps } from '../ToolDps';



/**
 * 存储登录的用户信息
 *
 * @param {string} [state=JSON.parse(ToolDps.localItem('User'))]
 * @param {Object} action
 * @returns Object
 */
const User = (state = JSON.parse(ToolDps.localItem('User')), action) => {
  switch (action.type) {
    case 'signinSuccess': //登录成功
      ToolDps.localItem('User', JSON.stringify(action.target));
      return action.target;
    case 'signin': //退出
      ToolDps.removeLocalItem('User');
      return null;
    default:
      return state;
  }

}

//新消息
const MyNews = (state = { newMsg: false }, action) => {
  switch (action.type) {
    case 'setNews': //获取新消息
      return action.target;
    default:
      return state;
  }
}

let plain = {
  sex: 2, //性别
  faceshpe: '', //脸型
  colorofskin: '', //肤色
  bodySize: '', //体型
  problems: [], //解决问题
  styles: [], //风格
  heigh: '165', //身高
  weight: '60', //体重
  chest: '80', //胸围
  waist: '70', //腰围
  hip: '90', //臀围
  professional: '', //职业
  provinceCode: '330000', //省默认浙江省
  cityCode: '330100', //城市默认杭州市
  countyCode: '330106', //区默认西湖区
  fullCityName: '', //地址
  birthday: '', //生日
}
//素人改造
const PlainChange = (state = plain, action) => {
  switch (action.type) {
    case 'setPlainChange': 
      return action.target;
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

const Home = DB('Home', {
  data: null
}); //首页
const MyWatch = DB('MyWatch', {
  data: null
}); //我的关注
const HotDpsList = DB('HotDpsList', {
  currentPager: 1,
  nextBtn: true,
  data: []
}); //热门搭配师列表
const FashionMoment = DB('FashionMoment', {
  currentPager: 1,
  nextBtn: true,
  data: []
}); //时尚圈
const FashionMomentDetail = DB('FashionMomentDetail', {
  data: null
}); //时尚圈详情
const Profile = DB('Profile', {
  data: []
}); //个人信息
const DpsProfile = DB('DpsProfile'); //搭配师个人信息

const DpsServerDetail = DB('DpsServerDetail'); //搭配师服务详情

const OrderList = DB('OrderList', {
  data: []
}); //我的订单
const OrderDetail = DB('OrderDetail', {
  data: []
}); //订单详情
const PromotionCodeList = DB('PromotionCodeList', {
  data: []
}); //优惠码列表


const reducers = combineReducers({
  User,
  MyNews,
  Home,
  MyWatch,
  HotDpsList,
  FashionMoment,
  Profile,
  DpsProfile,
  DpsServerDetail,
  OrderList,
  OrderDetail,
  FashionMomentDetail,
  PromotionCodeList,
  PlainChange
});



export default reducers;