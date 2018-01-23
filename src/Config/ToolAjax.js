/**
 * ajax请求
 */
import { ToolDps } from 'ToolDps';
//common  start------
export const UploadImg = (formdata) => ToolDps.post('/wx/upload/images', formdata, { 'Content-Type': "multipart/form-data" });
//common  end------
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