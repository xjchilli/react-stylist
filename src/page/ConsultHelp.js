/**
 * 咨询介绍
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import { ToolDps } from '../ToolDps';
import BindTel from './component/BindTel';


class ConsultHelp extends Component{

    constructor(props) {
        super(props);
        this.state = {
            contact: '',
            path: '', //url路径
            isBingTelShow: false //是否显示绑定手机窗口
        }
    }
    componentDidMount() {
        document.title = "咨询详情";
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

    render(){
        return (
            <div className="match-intruduce-page">
                <img src="/assets/img/match1.jpg" className="response_img" alt=""/>
                <div className="content">
                    <h2>咨 询</h2>
                    <p>先入手了一双鞋，不知道搭什么衣服好？直接把鞋子照片发上来去问你的搭配师吧。想要约女票去看电影，想要有个新的形象？把衣橱里的一些衣物发给搭配师，搭配师会给你合理的建议。</p>
                    <p>总之，任何搭配类的问题，都可以直接问搭配师。</p>
                    <p>
                        每个搭配师根据自身的经验水平，会有自己的定价，但是Ms搭配师官方给出了统一的优惠价
                        <br/>
                        <em>只要是在官方入口发布的需求，统一定价：19.9元/次</em>
                    </p>
                </div>
                <Link to='/consult' className='publish-btn text-center' onClick={this.verifyUser.bind(this, '/consult')}>发布需求</Link>
                {this.state.isBingTelShow ? <BindTel path={this.state.path} move={() => { this.setState({ isBingTelShow: false }) }} /> : null}
            </div>
        )
    }
}


export default ConsultHelp;