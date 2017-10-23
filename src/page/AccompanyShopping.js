/**
 * 陪逛
 * Created by potato on 2017/4/24 0024.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import qs from 'query-string';
import City from "../Component/city/city";
import Category from "./component/Category";
import MatchScene from "./component/MatchScene";
import { Msg } from "../Component/index";
import { ToolDps } from '../ToolDps';
import flatpickr from 'flatpickr';
import { DataLoad, GetData } from '../Component/index';
const zh = require("flatpickr/dist/l10n/zh.js").zh;

class AccompanyShopping extends Component {
    constructor(props) {
        super(props);
        let { serverId } = qs.parse(props.location.search);
        this.state = {
            serverId: serverId || '', //服务id 只有在搭配师服务入口才有
            btn: '发布',
            msgShow: false,
            msgText: '', //提示内容
            sex: props.data.info.sex || 2, //性别
            scene: [], //场景
            shop: [], //商品
            date: '', //日期
            costCode: '1', //预期花费
            currArea: '', //选择的城市
            addres: '', //详细地址
            remark: '', //需求描述
            cityShow: false, //是否显示城市窗口
            provinceCode: '330000', //省代码
            cityCode: '330100', //市代码
            countyCode: '330106', //区代码
            fullCityName: '' //省市区名称

        }
        this._time = 0;
    }

    componentDidMount() {
        document.title = "陪逛";
        let nowDate = new Date();
        this.flatpickr = flatpickr("#date", {
            locale: zh,
            minDate: nowDate,
            disableMobile: "true",
            enableTime: true,
            time_24hr:true,
            onChange: (selectedDates, dateStr, instance) => {
                nowDate = selectedDates[0];
                this.setState({
                    date: dateStr
                });
            },
            onOpen: () => {
                this.setState({
                    date: ToolDps.convertDate(nowDate, 'YYYY-MM-DD hh:mm')
                });
            }
        });

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            sex: nextProps.data.info.sex
        });
    }

    componentWillUnmount() {
        clearTimeout(this._time);
        this.flatpickr.destroy();
    }




    /**
     * 获取城市数据
     */
    getCity(city) {
        let {
            currProvince,
            currCity,
            currArea,
            provinceName,
            cityName,
            areaName
        } = city;
        this.setState({
            provinceCode: currProvince, //省代码
            cityCode: currCity, //市代码
            currArea: currArea, //区代码
            countyCode: currArea, //区代码
            fullCityName: provinceName + cityName + areaName, //省市区名称
            cityShow: false
        });
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

        if (!this.state.date) {
            this.setState({
                msgShow: true,
                msgText: '请选择约定时间', //提示内容
            });
            return;
        }
        if (this.state.currArea === "") {
            this.setState({
                msgShow: true,
                msgText: '请选择城市', //提示内容
            });
            return;
        }

        if (this.state.addres === "") {
            this.setState({
                msgShow: true,
                msgText: '请填写详细地址', //提示内容
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
            time: this.state.date, //时间
            countyCode: this.state.currArea, //当前选择区域
            addres: this.state.addres, //详细地址
            remark: this.state.remark, //需求描述
            costCode: this.state.costCode,
            scene: this.state.scene,
            sex: this.state.sex,
            shop: this.state.shop
        }

        if (this.state.serverId) {
            data['shopId'] = this.state.serverId;
        }

        this.setState({
            btn: '发布中...'
        });
        ToolDps.ajax({
            url: '/wx/requirement/add_shop',
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
                }.bind(this), 1500);
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
                    <h3 className="title">约定时间</h3>
                    <input id="date" type="text" value={this.state.date} readOnly={true} placeholder='请选择约定时间' onFocus={(e) => { e.target.blur() }} />
                    {/* <div id="date" className={this.state.date ? "date-area t-active" : "date-area"}>
                        {this.state.date ? this.state.date : '请选择约定时间'}
                    </div> */}
                    <h3>约定地址</h3>
                    <input id="city" type="text" value={this.state.fullCityName} readOnly={true} placeholder='请选择城市' onClick={() => { this.setState({ cityShow: true }) }} onFocus={(e) => { e.target.blur() }} />
                    {this.state.cityShow ? <City defaultProvince={this.state.provinceCode} defaultCity={this.state.cityCode} defaultArea={this.state.countyCode} getCity={this.getCity.bind(this)} close={() => { this.setState({ cityShow: false }) }} /> : null}
                    <h3>详细地址</h3>
                    <input type="text" placeholder="请填写详细地址" onChange={(e) => { this.setState({ addres: e.target.value }) }} />
                    <h3>预期花费</h3>
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


AccompanyShopping.contextTypes = {
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
        let main = data.succ ? <AccompanyShopping data={data} location={this.props.location} /> : <DataLoad loadAnimation={loadAnimation} loadMsg={loadMsg} />;

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