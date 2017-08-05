/**
 * 购物介绍
 */

import React, { Component } from 'react';
import { Link } from 'react-router';
import { ToolDps } from '../ToolDps';
import BindTel from './component/BindTel';

class ShoppingHelp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contact: '',
            path: '', //url路径
            isBingTelShow: false //是否显示绑定手机窗口
        }
    }
    componentDidMount() {
        document.title = "购物详情";
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
                <img src="/assets/img/match2.jpg" className="response_img" alt="" />
                <div className="content">
                    <h2>购 物</h2>
                    <p>你可以体验一下明星般的服务，只需要告知你要买什么，在什么场合穿的，搭配师就可以根据你的需求，并且结合你自身的个人特点，告诉你最优的搭配购买方案。</p>
                    <p>
                        每个搭配师根据自身的经验水平，会有自己的定价，但是Ms搭配师官方给出了统一的优惠价
                        <br />
                        <em>只要是在官方入口发布的需求，统一定价：19.9元/次</em>
                    </p>
                </div>
                <Link to='/shopping' className='publish-btn text-center' onClick={this.verifyUser.bind(this, '/shopping')}>发布需求</Link>
                {this.state.isBingTelShow ? <BindTel path={this.state.path} move={() => { this.setState({ isBingTelShow: false }) }} /> : null}
            </div>
        )
    }
}

export default ShoppingHelp;