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
import { onlineServer } from 'ToolAjax';
import { DataLoad, GetData, Button } from '../Component/index';




class Consult extends Component {
    constructor(props) {
        super(props);
        let { serverId } = qs.parse(props.location.search);
        this.state = {
            serverId: serverId || '',//服务id 只有在搭配师服务入口才有
            btn: '发布需求',
            msgShow: false,
            msgText: '', //提示内容
            sex: props.data.info.sex || 2, //性别
            scene: [], //场景
            costCode: '1', //预期花费价格
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
       

        let data = {
            costCode: this.state.costCode,
            scene: this.state.scene,
            sex: this.state.sex,
        }
        if (this.state.serverId) {
            data['shopId'] = this.state.serverId;
        }

        this.setState({
            btn: '发布中...'
        });
        onlineServer(data).then((res)=>{
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
                    <Button className="btn publishBtn" onClick={this.publish.bind(this)}  shineColor="#1a1a1a" >{this.state.btn}</Button>
                </section>
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