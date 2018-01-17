/**
 * 储存工具
 */

import { ToolDps } from '../ToolDps';

export let setGoodsInfo = (data) => ToolDps.sessionItem('goodsInfo', JSON.stringify(data));

export let getGoodsInfo = () => JSON.parse(ToolDps.sessionItem('goodsInfo')); 