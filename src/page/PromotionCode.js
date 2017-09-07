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
					<ul className="flex-box exchange-code-area" >
						<li>
							<input type="text" placeholder="输入优惠码" maxLength="6" defaultValue={this.state.promotionCode} onChange={(e) => { this.setState({ promotionCode: e.target.value.trim() }) }} />
						</li>
						<li>
							<button className="btn" onClick={this.exchange.bind(this)}>立即兑换</button>
						</li>
					</ul>
				</header>
				<ul className="promotion-list-area">
					<li>
						<Link to="/">
							<ul className="flex-box list-box">
								<li>
									<img className="lcicle" src="/assets/img/promotion/lcircle.jpg" />
									<img className="border-center" src="/assets/img/promotion/border-center.jpg" />
									<ul className="price-area">
										<li>
											<span className="money-icon">
												<span className="icon icon-money-overdue"></span>
											</span>
											<span className="num">19</span>
										</li>
										<li>
											<span className="icon icon-promotion-font"></span>
											<br />
											<span className="icon icon-all-server-use-font"></span>
										</li>
									</ul>
									<time className="text-center time">有效期至2017-9-6</time>
								</li>
								<li>
									<span className="icon icon-use-font"></span>
									<img className="rcicle" src="/assets/img/promotion/rcircle.jpg" />
								</li>
							</ul>
						</Link>
					</li>
					<li className="promotion-past">
						<Link to="/">
							<ul className="flex-box list-box">
								<li>
									<img className="lcicle" src="/assets/img/promotion/lcircle-gray.jpg" />
									<img className="border-center" src="/assets/img/promotion/border-center-gray.jpg" />
									<ul className="price-area">
										<li>
											<span className="money-icon">
												<span className="icon icon-money-overdue-gray"></span>
											</span>
											<span className="num">19</span>
										</li>
										<li>
											<span className="icon icon-promotion-font"></span>
											<br />
											<span className="icon icon-all-server-use-font"></span>
										</li>
									</ul>
									<time className="text-center time">有效期至2017-9-6</time>
								</li>
								<li>
									<span className="icon icon-use-font"></span>
									<img className="rcicle" src="/assets/img/promotion/rcircle-gray.jpg" />
								</li>
							</ul>
						</Link>
					</li>
				</ul>
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