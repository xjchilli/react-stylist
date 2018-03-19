/**
 * ajax请求
 */
import { ToolDps } from 'ToolDps';
//common  start------
// 上传图片
export const UploadImg = (formdata) => ToolDps.post('/wx/upload/images', formdata, { 'Content-Type': "multipart/form-data" });
//所有门店
export const storeList = () => ToolDps.get('/wx/requirement/store');
//common  end------
//用户信息
export const userInfo = () => ToolDps.get('/wx/user/info');
//用户商品评价
export const UserGoodsComment = (data) => ToolDps.post('/wx/goods/order/comment', data, { 'Content-Type': "application/json" });
//时尚圈分类
export const FashionType = () => ToolDps.get('/wx/fashion/type/config');
//订单取消
export const orderCancel = (orderId) => ToolDps.post('/wx/goods/order/close', { orderId: orderId });
//合并付款
export const mergePay = (orderIdArr) => ToolDps.post('/wx/goods/order/getMergeUnifeid', { orderId: orderIdArr });
//确认收货
export const receiveGoods = (orderId) => ToolDps.post('/wx/goods/order/receiving', { orderId: orderId });
//我的订单
export const orderList = (status) => ToolDps.get('/wx/goods/order/my', { status: status });
//删除订单
export const deleteOrder = (orderId) => ToolDps.post('/wx/goods/order/delete', { orderId: orderId });
//创建订单
export const createOrder = (data) => ToolDps.post('/wx/goods/order/createOrder', data, { 'Content-Type': 'application/json' });
//修改收货地址
export const modifyReceiveAddress = (data) => ToolDps.post('/wx/shipping/address/wechat', data);
//我的购物车
export const myShopCart = () => ToolDps.get('/wx/cart/my');
//删除购物车
export const deleteShopCart = (cartIdArr) => ToolDps.post('/wx/cart/delete', { cartId: cartIdArr });
//我关注的搭配师列表
export const myWatchDpsList = () => ToolDps.get('/wx/concern/getMy');
//关注或者取消关注
export const watchOrCancel = (collocationId) => ToolDps.post('/wx/concern/doAddOrDel', { collocationId: collocationId });
//服务start
//线上咨询
export const onlineServer = (data) => ToolDps.post('/wx/requirement/online', data);
//线下体验
export const offlineServer = (data) => ToolDps.post('/wx/requirement/offline', data);
//服务end
//发布时尚圈
export const publishFashion = (data) => ToolDps.post('/wx/fashion/add', data);