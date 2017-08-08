/**
 * 咨询
 * Created by potato on 2017/3/20.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import qs from 'query-string';
import GirlCategory from "./component/GirlCategory";
import BoyCategory from "./component/BoyCategory";
import MyWardrobe from "./component/MyWardrobe";
import MatchScene from "./component/MatchScene";
import { Msg } from "../Component/index";
import { ToolDps } from '../ToolDps';




class Consult extends Component {
    constructor(props) {
        super(props);
        let { serverId } = qs.parse(props.location.search);
        this.state = {
            serverId: serverId || '',//服务id 只有在搭配师服务入口才有
            btn: '发布',
            msgShow: false,
            msgText: '', //提示内容
            myWardrobe: false, //我的衣橱
            sex: 2, //性别
            scene: [], //场景
            shop: [], //商品
            costCode: '1', //预期花费价格
            remark: '', //需求描述
            garderobeArr: [], //选择的服装
        }
        this._time = 0;
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
            garderobeArr: cloths
        });
    }

    /**
     * 删除服装
     * */
    deleteCloth(e) {
        let id = e.currentTarget.getAttribute('data-id');
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
        let myWardrobe = classNames('full-page matchService', {
            'remove-css-overflow-scrolling': this.state.myWardrobe
        });
        let sexGirl = classNames({
            'active': this.state.sex === 2
        });
        let sexBoy = classNames({
            'active': this.state.sex === 1
        });

        return (
            <section className={myWardrobe}>
                <section className="box occasion">
                    <h4 className="title">搭配场景</h4>
                    <MatchScene getScene={this.getScene.bind(this)} />
                </section>
                <section className="box">
                    <h4 className="title">
                        商品选择
                        <div className="sex-switch">
                            <a href="javascript:void(0)" className={sexGirl} onClick={() => { this.setState({ sex: 2, shop: this.state.sex === 2 ? this.state.shop : [] }) }}>♀</a>
                            <a href="javascript:void(0)" className={sexBoy} onClick={() => { this.setState({ sex: 1, shop: this.state.sex === 1 ? this.state.shop : [] }) }}>♂</a>
                        </div>
                    </h4>
                    {this.state.sex === 2 ? <GirlCategory getShop={this.getShop.bind(this)} /> : null}
                    {this.state.sex === 1 ? <BoyCategory getShop={this.getShop.bind(this)} /> : null}
                </section>
                <section className="box">
                    <h4 className="title">预期花费</h4>
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
                    <h4 className="title">需求描述</h4>
                    <textarea rows="10" className="word-describe" placeholder="有什么需要对搭配师说的嘛" onChange={(e) => { this.setState({ remark: e.target.value }) }}></textarea>
                </section>
                <section className="box">
                    <h4 className="title">搭配物品<span className="myWardrobeBtn" onClick={() => { this.setState({ myWardrobe: !this.state.myWardrobe }) }}>我的衣橱</span></h4>
                    <div className="matchGoods-area">
                        {
                            this.state.garderobeArr.map((item, index) => {
                                return (
                                    <div className="item" key={index}>
                                        <div className="goods-img-show">
                                            <img src={item.url} alt="" />
                                            <svg viewBox="0 0 100 100" data-id={item.id} className="icon-svg-delete" onClick={this.deleteCloth.bind(this)}>
                                                <use xlinkHref="/assets/img/icon.svg#svg-delete" />
                                            </svg>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </section>
                <button className="btn publishBtn" onClick={this.publish.bind(this)}>{this.state.btn}</button>
                {this.state.myWardrobe ? <MyWardrobe sex={this.state.sex} garderobeArr={this.state.garderobeArr} addCloth={this.addCloth.bind(this)} closeMyWardrobe={() => { this.setState({ myWardrobe: false }) }} /> : null}
                {this.state.msgShow ? <Msg msgShow={() => { this.setState({ msgShow: false }) }} text={this.state.msgText} /> : null}
            </section>
        );
    }
}

Consult.contextTypes = {
    router: PropTypes.object.isRequired
}



export default Consult;