/**
 * 优惠码
 *
 * Created by potato on 2017/5/9 0009.
 */
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { GetData, DataLoad, Msg } from "../Component/index";
import { ToolDps } from '../ToolDps';
// import MyPromotionCode from './component/MyPromotionCode';



class Main extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		let {
			data,
			loadAnimation,
			loadMsg
		} = this.props.state;
		const main = data.succ ? <PromotionCode {...data} /> : <DataLoad loadAnimation={loadAnimation} loadMsg={loadMsg} />
		return (
			main
		)
	}
}

class PromotionCode extends Component {
	constructor(props) {
		super(props);
		this.state = {
			couponsCode: this.props.couponsCode || '', //我的优惠码
			promotionCode: '', //优惠码
			msgShow: false,
			msgText: '', //提示内容
			data: this.props.data || [], //优惠码列表
		}
	}

	componentDidMount() {
		document.title = "优惠码";
	}

	/**
	 * [exchange 优惠码兑换]
	 * @Author   potato
	 * @DateTime 2017-06-02T14:48:39+0800
	 * @return   {[type]}                 [description]
	 */
	exchange() {
		if (this.state.promotionCode === "") {
			return;
		} else if (this.state.promotionCode.length != 6) {
			this.setState({
				msgShow: true,
				msgText: '优惠码长度为6位' //提示内容
			});
			return;
		}

		ToolDps.post('/wx/coupons/exchange', {
			couponsCode: this.state.promotionCode
		}).then((res) => {
			// console.log(res);
			if (res.succ) {
				let data = Array.prototype.slice.apply(this.state.data);
				data.splice(0, 0, res.data);
				this.setState({
					msgShow: true,
					msgText: '兑换成功', //提示内容
					data: data
				});
			} else {
				this.setState({
					msgShow: true,
					msgText: res.msg, //提示内容
				});
			}

		}).catch(() => {
			alert('兑换失败');
		});
	}


	render() {



		return (
			<div className='promotionCode-area'>
				<div className="">
					<header>
						<p className="text-right help-link-area">
							<Link to="/usage">
								<svg viewBox="0 0 1024 1024" className="icon-svg-question" >
									<use xlinkHref="/assets/img/icon.svg#svg-question" />
								</svg>
								使用规则
							</Link>
						</p>
						{/*兑换优惠码*/}
						<section className="exchange-code-area" >
							<input type="text" placeholder="输入优惠码" maxLength="6" defaultValue={this.state.promotionCode} onChange={(e) => { this.setState({ promotionCode: e.target.value.trim() }) }} />
							<button className="btn" onClick={this.exchange.bind(this)}>兑换</button>
						</section>



						<p className="text-center tips">优惠码将在下次使用时自动抵消费用</p>
					</header>
					<ul className="promotion-list-area">
						{
							this.state.data.map((promotion, index) => {
								return (
									<li key={index}>
										<h5>{promotion.name}</h5>
										<p className="time">有效期至{promotion.expiryDate}</p>
										<p className="tips">好友分享优惠码获得</p>
										<div className="price-area">
											<small>￥</small>
											{promotion.price}
										</div>
										{
											promotion.status === 2 ? (
												<svg viewBox="0 0 190 150" className="icon-svg-promotion-code">
													<use xlinkHref="/assets/img/icon.svg#svg-used" />
												</svg>
											) : null
										}
										{
											promotion.status === 3 ? (
												<svg viewBox="0 0 190 150" className="icon-svg-promotion-code">
													<use xlinkHref="/assets/img/icon.svg#svg-past" />
												</svg>
											) : null
										}

									</li>
								)
							})
						}
					</ul>
				</div>
				{this.state.msgShow ? <Msg msgShow={() => { this.setState({ msgShow: false }) }} text={this.state.msgText} /> : null}
				{/*暂时隐藏  */}
				 {/* {this.state.couponsCode ? <MyPromotionCode userId={this.props.userId} couponsCode={this.state.couponsCode} /> : null}  */}
			</div>
		)
	}
}


export default GetData({
	id: 'PromotionCodeList', //应用关联使用的redux
	component: Main, //接收数据的组件入口
	url: '/wx/coupons/getMy',
	data: function () {
		// ToolDps.reloadUrl();
		return '';
	},
	success: (state) => {
		return state;
	}, //请求成功后执行的方法
	error: (state) => {
		return state
	} //请求失败后执行的方法
});