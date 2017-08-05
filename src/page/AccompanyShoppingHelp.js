/**
 * 陪逛介绍
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import { ToolDps } from '../ToolDps';
import BindTel from './component/BindTel';

class AccompanyShoppingHelp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contact: '',
            path: '', //url路径
            isBingTelShow: false //是否显示绑定手机窗口
        }
    }
    componentDidMount() {
        document.title = "陪逛详情";
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
                <img src="/assets/img/match3.jpg" className="response_img" alt="" />
                <div className="content">
                    <h2>陪 逛</h2>
                    <p>逛街效率太低，怕被导购忽悠？可以约上搭配师陪你一起逛街，专业的搭配师给你的购买提供合理的建议，高效完成购物服务。</p>
                    <p>
                        每个搭配师根据自身的经验水平，会有自己的定价，但是Ms搭配师官方给出了统一的优惠价
                        <br />
                        <em>只要是在官方入口发布的需求，统一定价：99元/小时</em>
                    </p>
                    <p>两个小时起购，具体服务时间如果不足，可以在服务过程中，再另行向搭配师协商支付。</p>
                </div>
                <Link to='/accompanyShopping' className='publish-btn text-center' onClick={this.verifyUser.bind(this, '/accompanyShopping')}>发布需求</Link>
                {this.state.isBingTelShow ? <BindTel path={this.state.path} move={() => { this.setState({ isBingTelShow: false }) }} /> : null}

            </div>
        )
    }
}

export default AccompanyShoppingHelp;