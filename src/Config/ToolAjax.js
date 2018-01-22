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