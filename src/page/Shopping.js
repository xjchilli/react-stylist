/**
 * 购物
 * Created by potato on 2017/4/24 0024.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import qs from 'query-string';
import Category from "./component/Category";
import MyWardrobe from "./component/MyWardrobe";
import MatchScene from "./component/MatchScene";
import { Msg } from "../Component/index";
import { ToolDps } from '../ToolDps';
import { DataLoad, GetData } from '../Component/index';





class Shopping extends Component {
    constructor(props) {
        super(props);
        let { serverId } = qs.parse(props.location.search);
        this.state = {
            serverId: serverId || '',//服务id 只有在搭配师服务入口才有
            btn: '发布',
            msgShow: false,
            msgText: '', //提示内容
            sex: props.data.info.sex || 2, //性别
            remark: '', //需求描述
            costCode: '1', //预期花费价格
            scene: [], //场景
            shop: [], //商品
        }
        this._time = 0;
    }
    componentDidMount() {
        document.title = "购物";

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            sex: nextProps.data.info.sex
        });
    }

    componentWillUnmount() {
        clearTimeout(this._time);
    }



    /**
     * 搭配场景
     */
    getScene(sceneArr) {
        this.setState({
            scene: sceneArr,
            msgShow: false
        });
    }
    /**
     * 获取选择场景的值
     */
    getShop(shopArr) {
        this.setState({
            shop: shopArr,
            msgShow: false
        })
    }

    /**
     * 发布
     */
    publish() {
        if (this.state.scene.length === 0) {
            this.setState({
                msgShow: true,
                msgText: '请选择搭配场景', //提示内容
            });
            return;
        }
        if (this.state.shop.length === 0) {
            this.setState({
                msgShow: true,
                msgText: '请选择商品', //提示内容
            });
            return;
        }

        if (this.state.remark === "") {
            this.setState({
                msgShow: true,
                msgText: '请填写需求描述', //提示内容
            });
            return;
        }


        let data = {
            sex: this.state.sex,
            scene: this.state.scene,
            shop: this.state.shop,
            costCode: this.state.costCode,
            remark: this.state.remark, //需求描述
        }

        if (this.state.serverId) {
            data['shopId'] = this.state.serverId;
        }

        this.setState({
            btn: '发布中...'
        });

        ToolDps.ajax({
            url: '/wx/requirement/add_buy',
            type: 'post',
            data: data
        }).then((res) => {
            if (res.succ) {
                this.setState({
                    btn: '发布',
                    msgShow: true,
                    msgText: '发布成功'
                });
                this._time = setTimeout(function () {
                    this.context.router.history.push('/pay?orderId=' + res.orderId);
                }.bind(this), 1000);
            } else {
                this.setState({
                    btn: '发布',
                    msgShow: true,
                    msgText: '发布失败'
                });
            }
        });

    }

    render() {
        let sexGirl = classNames({
            'active': this.state.sex === 2
        });
        let sexBoy = classNames({
            'active': this.state.sex === 1
        });
        return (
            <section className='matchService'>
                <section className="box sex-switch-area">
                    <h3>性别</h3>
                    <ul className="sex-area">
                        <li className={this.state.sex === 2 ? "active" : ""} onClick={() => { this.setState({ sex: 2, garderobeArr: this.state.sex === 2 ? this.state.garderobeArr : [] }) }}>
                            <span className={this.state.sex === 2 ? "icon icon-girl-active" : "icon icon-girl"}><span className="path1"></span><span className="path2"></span><span className="path3"></span></span>
                            女
                        </li>
                        <li className={this.state.sex === 1 ? "active" : ""} onClick={() => { this.setState({ sex: 1, garderobeArr: this.state.sex === 1 ? this.state.garderobeArr : [] }) }}>
                            <span className={this.state.sex === 1 ? "icon icon-man-active" : "icon icon-man"}><span className="path1"></span><span className="path2"></span><span className="path3"></span></span>
                            男
                        </li>
                    </ul>
                </section>

                <section className="box occasion">
                    <h3>搭配场景</h3>
                    <MatchScene sex={this.state.sex} getScene={this.getScene.bind(this)} />
                </section>
                <section className="box shop-area">
                    <h3>商品选择</h3>
                    <Category sex={this.state.sex} getShop={this.getShop.bind(this)} />
                </section>
                <section className="box other-area">
                    <h3 className="title">预期花费</h3>
                    <div className="expect-fare-area">
                        <select onChange={(e) => { this.setState({ costCode: e.target.value }) }}>
                            <option value="1">0-300</option>
                            <option value="2">300-500</option>
                            <option value="3">500-1000</option>
                            <option value="4">1000-3000</option>
                            <option value="5">>3000</option>
                            <option value="6">不限</option>
                        </select>
                    </div>
                    <h3>需求描述</h3>
                    <textarea className="word-describe" placeholder="您描述的越仔细，搭配师能给您更精准的服务哦 ~" onChange={(e) => { this.setState({ remark: e.target.value }) }}></textarea>
                    <button className="btn publishBtn" onClick={this.publish.bind(this)}>{this.state.btn}</button>
                </section>
                {this.state.msgShow ? <Msg msgShow={() => { this.setState({ msgShow: false }) }} text={this.state.msgText} /> : null}
            </section>
        );
    }
}

Shopping.contextTypes = {
    router: PropTypes.object.isRequired
}



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
        let main = data.succ ? <Shopping data={data} location={this.props.location} /> : <DataLoad loadAnimation={loadAnimation} loadMsg={loadMsg} />;

        return main;
    }
}

export default GetData({
    id: 'Profile', //应用关联使用的redux
    component: Main, //接收数据的组件入口
    url: '/wx/user/info',
    data: '', //发送给服务器的数据
    success: (state) => {
        return state;
    }, //请求成功后执行的方法
    error: (state) => {
        return state
    } //请求失败后执行的方法
});