/**
 * IM登录 退出
 */

import React, {
	Component
} from 'react';
import {
	ToolDps
} from '../../ToolDps';

class IM extends Component {
	constructor() {
		super();
		//参数：loginInfo
		this.loginInfo = {
			'sdkAppID': '', //用户所属应用id,必填
			'accountType': '', //用户所属应用帐号类型，必填
			'identifier': '', //当前用户ID,必须是否字符串类型，必填
			'userSig': '', //当前用户身份凭证，必须是字符串类型，必填
			'identifierNick': '', //当前用户昵称，不用填写，登录接口会返回用户的昵称，如果没有设置，则返回用户的id
			'headurl': '' //当前用户默认头像，选填，如果设置过头像，则可以通过拉取个人资料接口来得到头像信息
		};
		//参数：listeners
		this.listeners = {
			"onConnNotify": this.onConnNotify, //监听连接状态回调变化事件,必填
			"onMsgNotify": this.onMsgNotify.bind(this) //监听新消息(私聊，普通群(非直播聊天室)消息，全员推送消息)事件，必填
		};
		//参数:options
		//初始化时，其他对象，选填
		this.options = {
			'isAccessFormalEnv': true, //是否访问正式环境，默认访问正式，选填
			'isLogOn': false //是否开启控制台打印日志,默认开启，选填
		}
	}

	/**
	 * [signature 获取签名]
	 * @Author   potato
	 * @DateTime 2017-06-01T10:26:06+0800
	 * @param    {Function}               cb [回调函数]
	 * @return   {[type]}                    [description]
	 */
	signature(cb) {
		ToolDps.get('/wx/tim/getSignature').then((res) => {
			// console.log(res);
			if (res.succ) {
				let {
					data
				} = res;
				cb(data);
			} else {
				alert('签名失败');
			}

		});

	}


	/**
	 * 登录
	 * @param data
	 */
	login(data, cb) {
		//当前用户身份
		this.loginInfo.sdkAppID = data.sdkAppId;
		this.loginInfo.accountType = data.accountType;
		this.loginInfo.identifier = data.identifier;
		this.loginInfo.userSig = data.userSig;
		this.loginInfo.identifierNick = data.identifierNick;
		this.loginInfo.headurl = data.headUrl;

		webim.login(
			this.loginInfo, this.listeners, this.options,
			(resp) => {
				// console.log(resp);
				cb();
			},
			(err) => {
				console.log(err.ErrorInfo);
			}
		);
	}


	/**
	 * 监听连接状态回调变化事件
	 */
	onConnNotify(resp) {
		let info;
		switch (resp.ErrorCode) {
			case webim.CONNECTION_STATUS.ON:
				webim.Log.warn('建立连接成功: ' + resp.ErrorInfo);
				break;
			case webim.CONNECTION_STATUS.OFF:
				info = '连接已断开，无法收到新消息，请检查下你的网络是否正常: ' + resp.ErrorInfo;
				// alert(info);
				webim.Log.warn(info);
				break;
			case webim.CONNECTION_STATUS.RECONNECT:
				info = '连接状态恢复正常: ' + resp.ErrorInfo;
				// alert(info);
				webim.Log.warn(info);
				break;
			default:
				webim.Log.error('未知连接状态: =' + resp.ErrorInfo);
				break;
		}
	}

	/**
	 * [signOut 登出]
	 * @Author   potato
	 * @DateTime 2017-06-01T10:42:27+0800
	 * @return   {[type]}                 [description]
	 */
	signOut() {
		if (this.loginInfo.identifier) {
			//sdk登出
			webim.logout(
				function(resp) {
					console.log(resp);
				}
			);
		} else {
			alert('未登录');
		}

	}
}

export default IM;