/**
 * 优惠码
 *
 * Created by potato on 2017/5/9 0009.
 */
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { GetData, DataLoad, Msg } from "../Component/index";
import { ToolDps } from '../ToolDps';



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
			exchangeBtn: true,//是否可以点击兑换按钮
			couponsCode: '', //我的优惠码
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
		}
		this.setState({
			exchangeBtn: false
		});

		ToolDps.post('/wx/coupons/exchange', {
			couponsCode: this.state.promotionCode
		}).then((res) => {
			if (res.succ) {
				let data = Array.prototype.slice.apply(this.state.data);
				data.splice(0, 0, res.data);
				this.setState({
					exchangeBtn: true,
					msgShow: true,
					msgText: '兑换成功', //提示内容
					data: data
				});
			} else {
				this.setState({
					exchangeBtn: true,
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
							<input type="text" placeholder="输入优惠码" maxLength="100" defaultValue={this.state.promotionCode} onChange={(e) => { this.setState({ promotionCode: e.target.value.trim() }) }} />
						</li>
						<li>
							<button className="btn" onClick={this.state.exchangeBtn ? this.exchange.bind(this) : null}>立即兑换</button>
						</li>
					</ul>
				</header>
				<ul className="promotion-list-area">
					{
						this.state.data.map((item, index) => {
							return (
								<li className={item.status == 2 || item.status == 3 ? "promotion-invalid" : ""} key={index}>
									<Link to="/needMatch">
										<ul className="flex-box list-box">
											<li>
												<img className="lcicle" src={item.status == 2 || item.status == 3 ? "/assets/img/promotion/lcircle-gray.jpg" : "/assets/img/promotion/lcircle.jpg"} />
												<img className="border-center" src={item.status == 2 || item.status == 3 ? "/assets/img/promotion/border-center-gray.jpg" : "/assets/img/promotion/border-center.jpg"} />
												<ul className="price-area">
													<li>
														<span className="money-icon">
															{item.status == 2 || item.status == 3 ? <span className="icon icon-money-overdue-gray"></span> : <span className="icon icon-money-overdue"></span>}
														</span>
														<span className="num">{item.price}</span>
													</li>
													<li>
														<span className="icon icon-promotion-font"></span>
														<br />
														<span className="icon icon-all-server-use-font"></span>
													</li>
												</ul>
												<time className="text-center time">有效期至{item.expiryDate}</time>
												{
													item.status == 2 ? <span className="icon icon-used"></span> : null
												}
												{
													item.status == 3 ? <span className="icon icon-pasted"></span> : null
												}


											</li>
											<li>
												<span className="icon icon-use-font"></span>
												<img className="rcicle" src={item.status == 2 || item.status == 3 ? "/assets/img/promotion/rcircle-gray.jpg" : "/assets/img/promotion/rcircle.jpg"} />
											</li>
										</ul>
									</Link>
								</li>
							)
						})
					}
				</ul>
				{this.state.msgShow ? <Msg msgShow={() => { this.setState({ msgShow: false }) }} text={this.state.msgText} /> : null}
			</div>
		)
	}
}


export default GetData({
	id: 'PromotionCodeList', //应用关联使用的redux
	component: Main, //接收数据的组件入口
	url: '/wx/coupons/getMy',
	data: '',
	success: (state) => {
		return state;
	}, //请求成功后执行的方法
	error: (state) => {
		return state
	} //请求失败后执行的方法
});