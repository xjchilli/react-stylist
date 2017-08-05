/**
 * 搭配服务详情
 */

import React, { Component } from 'react';
import { DataLoad, GetData } from '../Component/index';
import BindTel from "./component/BindTel";
import { Link } from 'react-router';
import { ToolDps } from '../ToolDps';


class Main extends Component {

    render() {
        let { data, loadAnimation, loadMsg } = this.props.state;

        let main = data && data.succ ? <DpsServerDetail data={data.data} /> : <DataLoad loadAnimation={loadAnimation} loadMsg={loadMsg} />;
        return main;
    }
}

class DpsServerDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contact: '',
            path: '', //url路径
            isBingTelShow: false //是否显示绑定手机窗口
        }

    }

    componentDidMount() {
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
    verifyUser(event) {
        if (!this.state.contact) {
            event.preventDefault();
            this.setState({
                isBingTelShow: true
            });
            return;
        }

    }

    //
    render() {
        let { id, type, price, content } = this.props.data;//type 1:咨询,2:购物,3:逛街,4：衣橱整理
        let service = {
            url: '',
            price: '',
            typeName: '',
            backgroundImage: 'url(/assets/img/dapei-service-' + type + '.jpg)',
        }

        if (type === 1) {//咨询
            service.price = price + "/次";
            service.typeName = "在线咨询";
            service.url = "/consult?serverId=" + id;
            document.title = "在线咨询";
        } else if (type === 2) {//购物
            service.price = price + "/次";
            service.typeName = "购物服务";
            service.url = "/shopping?serverId=" + id;
            document.title = "购物服务";
        } else if (type === 3) {//逛街
            service.price = price + "/2小时";
            service.typeName = "线下陪购";
            service.url = "/accompanyShopping?serverId=" + id;
            document.title = "线下陪购";
        } else if (type === 4) {//整理
            service.price = price + "/2小时";
            service.typeName = "整理衣橱";
            service.url = "/neatenWardrobe?serverId=" + id;
            document.title = "整理衣橱";
        }

        return (
            <div className="service-detail-page" style={{ backgroundImage: service.backgroundImage }}>
                <div className="content">
                    <header>
                        <p>服务类别：{service.typeName}</p>
                        <p>服务价格：{service.price}</p>
                    </header>
                    <section className="remark">
                        {content}
                    </section>
                    <Link to={service.url} className="text-center btn" onClick={this.verifyUser.bind(this)}>立即购买</Link>
                </div>
                {this.state.isBingTelShow ? <BindTel path={this.state.path} move={() => { this.setState({ isBingTelShow: false }) }} /> : null}
            </div>
        )
    }


}

export default GetData({
    id: 'DpsServerDetail', //应用关联使用的redux
    component: Main, //接收数据的组件入口
    url: (props, state) => {
        let { shopId } = props.location.query;
        return "/wx/fashion/" + shopId + "/topic";
    },
    data: '', //发送给服务器的数据
    success: (state) => {
        return state;
    }, //请求成功后执行的方法
    error: (state) => {
        return state
    } //请求失败后执行的方法
});