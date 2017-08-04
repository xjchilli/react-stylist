/**
 * 使用规则
 * 
 */
import React, { Component } from 'react';
import { ToolDps } from '../ToolDps';


class Usage extends Component {

	constructor() {
		super();
	}

	componentDidMount() {
		document.title = '使用规则';
	
	}

	render() {
		return (
			<section className="full-page">
				<dl className="usage-area">
					<dt>1.	如何获得优惠券</dt>
					<dd>Ms搭配师官方会以各种形式向用户发送优惠券，请关注Ms搭配师官方微博和微信，获取活动信息</dd>
					<dt>2.	优惠券如何使用</dt>
					<dd>优惠码由字符串或汉字组成，输入对应优惠码，完成兑换；单个优惠码可兑换一张优惠券；一次订单只能使用一张优惠券，不支持叠加使用</dd>
					<dt>3.	优惠券抵扣规则</dt>
					<dd>优惠券用于抵扣咨询费用，不支持找零、提现、退款，不开发票；</dd>
					<dd>优惠券金额高于本次订单金额的，差额部分不找零；使用的该张优惠券即作废；</dd>
					<dd>优惠券金额低于本次订单金额的，差额部分由用户支付，补足；</dd>
					<dt>4.	优惠券使用规则</dt>
					<dd>在订单支付页面需手动选择可用的优惠券</dd>
					<dt>5.	优惠券有效期</dt>
					<dd>每张优惠券均存在有效期，必须在有效期内使用，过期作废</dd>
				</dl>
			</section>
		)
	}
}

export default Usage;