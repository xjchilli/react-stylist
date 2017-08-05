/**
 * 我的分享码
 */

import React, { Component } from 'react';
import { ToolDps } from '../../ToolDps';
import ShareConfig from './ShareConfig';

class MyPromotionCode extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isTips: false, //是否显示分享指示
			userId: this.props.userId || 0 //	用户ID
		}
	}

	componentDidMount() {
		let userId = this.state.userId;

		//分享配置
		ShareConfig({
			title: '[Ms搭配师]你的好友分享了您一份优惠码', // 分享标题
			desc: '赶紧来MS搭配师找个漂亮的小姐姐教你怎么搭配衣服吧~', // 分享描述
			link: ToolDps.getHost + '/share?userId=' + userId, // 分享链接
			imgUrl: ToolDps.getHost + '/assets/img/logo.jpg', // 分享图标
		});

	}

	render() {
		return (
			<section className="my-promotion-code-area">
				 {/* <h5>优惠码分享</h5>  */}
				<section className="text-center">
					<span className="code">{this.props.couponsCode ? this.props.couponsCode : ''}</span>
					{/* <svg viewBox="0 0 1024 1024" className="icon-svg-share-btn" onClick={() => { this.setState({ isTips: true }) }}>
						<use xlinkHref="/assets/img/icon.svg#svg-share-btn" />
					</svg> */}
				</section>
				<p className="text-center tip">好友使用你的优惠码时，你会获得一张咨询优惠券</p>
				{/* {
					this.state.isTips ? (
						<section className="share-tips-area text-center" onClick={() => { this.setState({ isTips: false }) }}>
							<svg viewBox="0 0 540 307.5" className="icon-svg-share-tips">
								<use xlinkHref="/assets/img/icon.svg#svg-share-tips" />
							</svg>
						</section>
					) : null
				} */}

			</section>
		)
	}
}

export default MyPromotionCode;