/**
 * 优惠码
 *
 * Created by potato on 2017/5/9 0009.
 */
import React, {
	Component
} from 'react';
import {
	Link
} from "react-router-dom";

class PromotionCode extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		document.title = "优惠码";
	}


	render() {
		return (
			<div className='full-page promotionCode-area'>
				<header>
					<p className="text-right help-link-area">
						<Link to="/">
							<svg viewBox="0 0 1024 1024" className="icon-svg-question" >
                                <use xlinkHref="/assets/img/icon.svg#svg-question"/>
                            </svg>
							使用规则
						</Link>
					</p>
					{/*兑换优惠码*/}
					<section className="exchange-code-area" >
						<input type="text" placeholder="输入优惠码"/>
						<button className="btn">兑换</button>
					</section>
					{/*发布需求*/}
					<Link to="/needMatch" className="publish-link" style={{display:'none'}}>
						发布需求
					</Link>
					{/*我的分享码*/}
					<section className="exchange-code-area my-share-code" style={{display:'none'}}>
		{ /*				<input type="text" placeholder="输入优惠码" defaultValue="A465DSFD15" readOnly disabled/>*/ }
						<p className="code">A465DSFD15</p>
					</section>


					<p className="text-center tips">优惠码将在下次使用时自动抵消费用</p>
				</header>
				<ul className="promotion-list-area">
					<li>
						<h5>咨询优惠券</h5>	
						<p className="time">有效期至2017-9-9</p>	
						<p className="tips">好友分享优惠码获得</p>
						<div className="price-area">
							<small>￥</small>
							29
						</div>	
					</li>
					<li>
						<h5>咨询优惠券</h5>	
						<p className="time">有效期至2017-9-9</p>	
						<p className="tips">好友分享优惠码获得</p>
						<div className="price-area">
							<small>￥</small>
							29
						</div>	
					</li>
					<li>
						<h5>咨询优惠券</h5>	
						<p className="time">有效期至2017-9-9</p>	
						<p className="tips">好友分享优惠码获得</p>
						<div className="price-area">
							<small>￥</small>
							29
						</div>	
					</li>
					<li>
						<h5>咨询优惠券</h5>	
						<p className="time">有效期至2017-9-9</p>	
						<p className="tips">好友分享优惠码获得</p>
						<div className="price-area">
							<small>￥</small>
							29
						</div>	
					</li>
				</ul>
			</div>
		)
	}
}


export default PromotionCode;