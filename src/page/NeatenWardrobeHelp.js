/**
 * 陪逛介绍
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ToolDps } from '../ToolDps';
import BindTel from './component/BindTel';

class NeatenWardrobeHelp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contact: '',
            path: '', //url路径
            isBingTelShow: false //是否显示绑定手机窗口
        }
    }
    componentDidMount() {
        document.title = "整理详情";
        ToolDps.get('/wx/user/info').then((res) => {
            if (res.succ) {
                this.setState({
                    contact: res.contact
                });
            }
        });


    }

    /**
     * 
     * [verifyUser 验证是否绑定过手机]
     * @param  {[type]} path  [url路由]
     * @param  {[type]} event [点击事件]
     * @return {[type]}       [description]
     */
    verifyUser(path, event) {
        if (!this.state.contact) {
            event.preventDefault();
            this.setState({
                path: path,
                isBingTelShow: true
            });
            return;
        }

    }

    render() {
        return (
            <div className="match-intruduce-page">
                <img src="/assets/img/match4.jpg" className="response_img" alt="" />
                <div className="content">
                    <h2>整 理</h2>
                    <p>换季没有衣服穿？总感觉去年是在裸奔？全世界的美衣都在你的衣橱里，只是你自己不知道而已。约个搭配师到家里整理衣橱，也许不用买买买，照样每天穿出新花样。</p>
                    <p>
                        每个搭配师根据自身的经验水平，会有自己的定价，但是Ms搭配师官方给出了统一的优惠价
                        <br />
                        <em>只要是在官方入口发布的需求，统一定价：99元/小时</em>
                    </p>
                    <p>两个小时起购，具体服务时间如果不足，可以在服务过程中，再另行向搭配师协商支付。</p>
                </div>
                <Link to='/neatenWardrobe' className='publish-btn text-center' onClick={this.verifyUser.bind(this, '/neatenWardrobe')}>发布需求</Link>
                {this.state.isBingTelShow ? <BindTel path={this.state.path} move={() => { this.setState({ isBingTelShow: false }) }} /> : null}
            </div>
        )
    }
}

export default NeatenWardrobeHelp;