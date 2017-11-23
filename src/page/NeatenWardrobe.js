/**
 * 整理衣橱
 * Created by potato on 2017/4/25 0025.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import qs from 'query-string';
import { ToolDps } from '../ToolDps';
import { City, Msg, Button } from "../Component/index";
import flatpickr from 'flatpickr';
const zh = require("flatpickr/dist/l10n/zh.js").zh;

class NeatenWardrobe extends Component {
    constructor(props) {
        super(props);
        let { serverId } = qs.parse(props.location.search);
        this.state = {
            serverId: serverId || '', //服务id 只有在搭配师服务入口才有
            btn: '发布',
            msgShow: false,
            msgText: '', //提示内容
            date: '', //日期
            currArea: '', //选择的城市
            addres: '', //详细地址
            remark: '', //需求描述
            cityShow: false, //是否显示城市窗口
            provinceCode: '330000', //省代码
            cityCode: '330100', //市代码
            countyCode: '330106', //区代码
            fullCityName: '', //省市区名称
            timeShow: false,//时间窗口显示
        }
        this._time = 0;
    }

    componentDidMount() {
        document.title = "衣橱整理";
        // let nowDate = new Date();
        // this.flatpickr = flatpickr("#date", {
        //     locale: zh,
        //     minDate: nowDate,
        //     disableMobile: "true",
        //     enableTime: true,
        //     time_24hr:true,
        //     onChange: (selectedDates, dateStr, instance) => {
        //         nowDate = selectedDates[0];
        //         this.setState({
        //             date: dateStr
        //         });
        //     },
        //     onOpen: () => {
        //         this.setState({
        //             date: ToolDps.convertDate(nowDate, 'YYYY-MM-DD hh:mm')
        //         });
        //     }
        // });
    }


    componentWillUnmount() {
        clearTimeout(this._time);
        // this.flatpickr.destroy();
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
     * 发布
     */
    publish() {
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
        }

        if (this.state.serverId) {
            data['shopId'] = this.state.serverId;
        }

        this.setState({
            btn: '发布中...'
        });

        ToolDps.ajax({
            url: '/wx/requirement/add_finishing',
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
        return (
            <section className='matchService'>
                <section className="box other-area">
                    <h3 className="title">约定时间</h3>
                    <div id="date" className="date" onClick={() => { this.setState({ timeShow: true }) }}>
                        {this.state.date}
                        {this.state.timeShow ? <Time closeTimeWindow={() => { this.setState({ timeShow: false }) }} initDate={this.state.date} getDate={(val) => { this.setState({ date: val }) }} /> : null}
                    </div>
                    {/* <input id="date" type="text" value={this.state.date} readOnly={true} placeholder='请选择约定时间' onFocus={(e) => { e.target.blur() }} /> */}
                    <h3>约定地址</h3>
                    <input id="city" type="text" value={this.state.fullCityName} readOnly={true} placeholder='请选择城市' onClick={() => { this.setState({ cityShow: true }) }} onFocus={(e) => { e.target.blur() }} />
                    {this.state.cityShow ? <City defaultProvince={this.state.provinceCode} defaultCity={this.state.cityCode} defaultArea={this.state.countyCode} getCity={this.getCity.bind(this)} close={() => { this.setState({ cityShow: false }) }} /> : null}
                    <h3>详细地址</h3>
                    <input type="text" placeholder="请填写详细地址" onChange={(e) => { this.setState({ addres: e.target.value }) }} />
                    <h3>需求描述</h3>
                    <textarea className="word-describe" placeholder="您描述的越仔细，搭配师能给您更精准的服务哦 ~" onChange={(e) => { this.setState({ remark: e.target.value }) }}></textarea>
                    <Button className="btn publishBtn" onClick={this.publish.bind(this)} shineColor="#1a1a1a" >{this.state.btn}</Button>
                    {/* <button className="btn publishBtn" onClick={this.publish.bind(this)}>{this.state.btn}</button> */}
                </section>
                {this.state.msgShow ? <Msg msgShow={() => { this.setState({ msgShow: false }) }} text={this.state.msgText} /> : null}
            </section>
        );
    }
}

NeatenWardrobe.contextTypes = {
    router: PropTypes.object.isRequired
}


/**
 * 时间
 */
class Time extends Component {
    componentDidMount() {
        let nowDate = new Date();
        this.flatpickr = flatpickr("#date", {
            locale: zh,
            minDate: nowDate,
            disableMobile: "true",
            enableTime: true,
            time_24hr: true,
            defaultDate: this.props.initDate,
            onChange: (selectedDates, dateStr, instance) => {
                this.props.getDate(dateStr);
            },
            onClose: (selectedDates, dateStr, instance) => {
                this.props.closeTimeWindow();
            }
        });
        this.flatpickr.open();

    }

    componentWillUnmount() {
        this.flatpickr.close();

    }

    render() {
        return null;
    }
}


export default NeatenWardrobe;