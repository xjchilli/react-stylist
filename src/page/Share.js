/**
 * 分享
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import qs from 'query-string';
import { DataLoad, GetData } from "../Component/index";
import { ToolDps } from '../ToolDps';



class Main extends Component {

	componentDidMount() {
		document.title = "分享";

	}

	render() {
		let {
			data,
			loadAnimation,
			loadMsg
		} = this.props.state;
		let main = data.succ ? <Share data={data.data} /> : <DataLoad loadAnimation={loadAnimation} loadMsg={loadMsg} />;
		return (
			<div>
				{main}
			</div>
		)
	}
}

class Share extends Component {
	constructor() {
		super();
	}

	render() {
		let {
			couponsCode,
			headImg,
			nickName
		} = this.props.data;
		return (
			<section className="bgWhite user-share-area">
				<p className="text-right help-link-area">
					<Link to="/usage">
						<svg viewBox="0 0 1024 1024" className="icon-svg-question" >
							<use xlinkHref="/assets/img/icon.svg#svg-question" />
						</svg>
						使用规则
						</Link>
				</p>

				<div className="text-center share-user-info">
					<img src={headImg} alt="" />
					{nickName}
				</div>
				<p className="text-center">分享你一枚优惠码</p>

				<div className="promotion-code-img">
					<img src="/assets/img/promotionCode.png" alt="" />
					<p className="">{couponsCode}</p>
				</div>
				<p className="text-center">扫码或搜索关注「Ms搭配师」</p>
				<p className="text-center">即可兑换一次免费咨询的机会</p>

				<img src="/assets/img/qrcode.png" alt="" className="qrcode" />

			</section>
		)
	}
}


export default GetData({
	id: 'Profile', //应用关联使用的redux
	component: Main, //接收数据的组件入口
	url: (props, state) => {
		const { userId } = qs.parse(props.location.search);
		return "/wx/user/" + userId + "/share";
	},
	data: '', //发送给服务器的数据
	success: (state) => {
		return state;
	}, //请求成功后执行的方法
	error: (state) => {
		return state
	} //请求失败后执行的方法
});