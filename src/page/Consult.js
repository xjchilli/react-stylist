/**
 * 咨询
 * Created by potato on 2017/3/20.
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




class Consult extends Component {
    constructor(props) {
        super(props);
        let { serverId } = qs.parse(props.location.search);
        this.state = {
            serverId: serverId || '',//服务id 只有在搭配师服务入口才有
            btn: '发布需求',
            msgShow: false,
            msgText: '', //提示内容
            myWardrobe: false, //我的衣橱
            sex: props.data.info.sex || 2, //性别
            scene: [], //场景
            shop: [], //商品
            costCode: '1', //预期花费价格
            remark: '', //需求描述
            garderobeArr: [], //选择的服装
        }
        this._time = 0;
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            sex: nextProps.data.info.sex
        });
    }


    componentDidMount() {
        document.title = "咨询";
    }

    componentWillUnmount() {
        clearTimeout(this._time);
    }


    /**
     * 搭配场景
     */
    getScene(sceneArr) {
        this.setState({
            scene: sceneArr
        });
    }

    /**
     * 获取选择场景的值
     */
    getShop(shopArr) {
        this.setState({
            shop: shopArr
        })
    }

    /**
     * 发布
     */
    publish() {
        if (this.state.scene.length === 0) {
            this.setState({
                msgShow: true,
                msgText: '请选择场景', //提示内容
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

        if (this.state.garderobeArr.length === 0) {
            this.setState({
                msgShow: true,
                msgText: '请选择搭配物品', //提示内容
            });
            return;
        }

        let garderobe_ids = [];
        this.state.garderobeArr.forEach((item) => {
            garderobe_ids.push(item.id);
        });

        let data = {
            remark: this.state.remark, //需求描述
            costCode: this.state.costCode,
            scene: this.state.scene,
            sex: this.state.sex,
            shop: this.state.shop,
            garderobe_ids: garderobe_ids
        }
        if (this.state.serverId) {
            data['shopId'] = this.state.serverId;
        }

        this.setState({
            btn: '发布中...'
        });
        ToolDps.ajax({
            url: '/wx/requirement/add_cons',
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
                    msgText: '发布'
                });
            }
        });
    }

    /**
     * 添加选择的服装
     */
    addCloth(cloths) {
        this.setState({
            garderobeArr: cloths,
            myWardrobe: false
        });
    }

    /**
     * 删除服装
     * */
    deleteCloth(id) {
        let newGarderobeArr = Array.prototype.slice.apply(this.state.garderobeArr);
        for (let i = 0; i < newGarderobeArr.length; i++) {
            if (newGarderobeArr[i].id == id) {
                newGarderobeArr.splice(i, 1);
            }
        }
        this.setState({
            garderobeArr: newGarderobeArr
        });
    }

    render() {
        return (
            <section className='matchService'>
                <section className="box sex-switch-area">
                    <h3>性别</h3>
                    <select className="sex-area" onChange={(e) => { this.setState({ sex: Number(e.target.value) }) }} value={this.state.sex}>
                        <option value="1">男</option>
                        <option value="2">女</option>
                    </select>
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
                    <h3>搭配物品</h3>
                    <ul className="flex-box matchGoods-area">
                        {
                            this.state.garderobeArr.map((item, index) => {
                                return (
                                    <li className="item-3" key={index}>
                                        <div className="goods-img-show" style={{ backgroundImage: 'url(' + item.url + ')' }}>
                                            <span className="icon icon-fault" onClick={this.deleteCloth.bind(this, item.id)}><span className="path1"></span><span className="path2"></span></span>
                                        </div>
                                    </li>
                                )
                            })
                        }

                        {
                            this.state.garderobeArr.length < 6 ? (
                                <li className="item-3">
                                    <div className="goods-img-show add-btn" onClick={() => { this.setState({ myWardrobe: true }) }}></div>
                                </li>
                            ) : null
                        }
                    </ul>
                    <button className="btn publishBtn" onClick={this.publish.bind(this)}>{this.state.btn}</button>
                </section>

                {this.state.myWardrobe ? <MyWardrobe sex={this.state.sex} garderobeArr={this.state.garderobeArr} addCloth={this.addCloth.bind(this)} closeMyWardrobe={() => { this.setState({ myWardrobe: false }) }} /> : null}
                {this.state.msgShow ? <Msg msgShow={() => { this.setState({ msgShow: false }) }} text={this.state.msgText} /> : null}
            </section>
        );
    }
}

Consult.contextTypes = {
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
        let main = data.succ ? <Consult data={data} location={this.props.location} /> : <DataLoad loadAnimation={loadAnimation} loadMsg={loadMsg} />;

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