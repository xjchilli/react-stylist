/**
 * 感恩活动
 */
import React from 'react';
import { Msg, DataLoad, GetData } from "../Component/index";
import { ToolDps } from '../ToolDps';
import PropTypes from 'prop-types';


class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            queryPeopleLoad: false,//查询推广人数是否查询完成
            peopleData: null//订单数
        }
    }

    componentDidMount() {
        ToolDps.get('/wx/active/getPromotionNum', { activeId: 2 }).then((res) => {
            if (res.succ) {
                this.setState({
                    queryPeopleLoad: true,
                    peopleData: res
                })
            }
        });
    }

    render() {
        let {
            data,
            loadAnimation,
            loadMsg
        } = this.props.state;
        let main = data.succ && this.state.queryPeopleLoad ? <GratefulParentActivity data={data} peopleData={this.state.peopleData} /> : <DataLoad loadAnimation={loadAnimation} loadMsg={''} />;

        return main;
    }
}


class GratefulParentActivity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            msgShow: false,
            msgText: '', //提示内容
            activityShow: true,
            mealType: 1,//套餐
            name: '',//姓名
            contact: props.data.contact || '',//联系方式
            wechat: '',//微信
            remark: ''//备注
        }
        this._time = 0;
    }

    componentDidMount() {
        document.title = "感恩节活动";
    }


    componentWillUnMount(nextProps) {
        clearTimeout(this._time);
    }


    //提交表单
    publish() {
        let flag = this.valideForm();
        if (!flag) return;
        let param = {
            mealType: this.state.mealType,
            name: this.state.name,
            contact: this.state.contact,
            wechat: this.state.wechat,
            remark: this.state.remark
        }
        ToolDps.post('/wx/active/applyThanks', param).then((res) => {
            console.log(res);
            if (res.succ) {
                this.setState({
                    btn: '发布',
                    msgShow: true,
                    msgText: '发布成功'
                });
                this._time = setTimeout(function () {
                    this.context.router.history.push('/payActivity?orderId=' + res.orderNumber);
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

    tips(text) {
        this.setState({
            msgShow: true,
            msgText: text, //提示内容
        });
    }

    //验证表单
    valideForm() {
        if (this.state.name == "") {
            this.tips('姓名不能为空');
            return false;
        }
        if (this.state.contact == "") {
            this.tips('手机号不能为空');
            return false;
        }
        return true;
    }



    render() {
        return (
            <section className="grateful-page">
                {
                    this.state.activityShow ? (
                        <header>
                            <p>您已邀请{this.props.peopleData.promotionNum}人关注，拥有{Number(this.props.peopleData.promotionNum) * 58}元抵用券</p>
                            <p>1位好友关注=58元抵用券，分享海报去邀请好友扫码关注吧！</p>
                            <span className="icon icon-close2" onClick={() => { this.setState({ activityShow: false }) }}></span>
                        </header>
                    ) : null
                }
                <h1>选择预约套餐</h1>
                <ul className="select-item">
                    <li onClick={() => { this.setState({ mealType: 1 }) }}>
                        <ul className="layout">
                            <li className="lside">
                                <img src="/assets/img/grateful/A.jpg" width="92" height="92" />
                            </li>
                            <li className="rside">
                                <strong>A：家庭套餐</strong>
                                <p className="text-1">价值4600元，可预约4人</p>
                                <p>邀请80位好友关注即可免费参与</p>
                                {
                                    this.state.mealType === 1 ? <span className="icon icon-gou2"><span className="path1"></span><span className="path2"></span></span> : null
                                }

                            </li>
                        </ul>
                    </li>
                    <li onClick={() => { this.setState({ mealType: 2 }) }}>
                        <ul className="layout">
                            <li className="lside">
                                <img src="/assets/img/grateful/B.jpg" width="92" height="92" />
                            </li>
                            <li className="rside">
                                <strong>B：双人套餐</strong>
                                <p className="text-1">价值2300元，可预约2人</p>
                                <p>邀请40位好友关注即可免费参与</p>
                                {
                                    this.state.mealType === 2 ? <span className="icon icon-gou2"><span className="path1"></span><span className="path2"></span></span> : null
                                }
                            </li>
                        </ul>
                    </li>
                    <li onClick={() => { this.setState({ mealType: 3 }) }}>
                        <ul className="layout">
                            <li className="lside">
                                <img src="/assets/img/grateful/C.jpg" width="92" height="92" />
                            </li>
                            <li className="rside">
                                <strong>C：单人套餐</strong>
                                <p className="text-1">价值1150元，可预约1人</p>
                                <p>邀请20位好友关注即可免费参与</p>
                                {
                                    this.state.mealType === 3 ? <span className="icon icon-gou2"><span className="path1"></span><span className="path2"></span></span> : null
                                }
                            </li>
                        </ul>
                    </li>
                </ul>
                <section className="form-area">
                    <label>预约姓名 *</label>
                    <input placeholder="请填写真实姓名" value={this.state.name} onChange={(e) => { this.setState({ name: e.target.value }) }} />
                    <label>预约门店  *</label>
                    <input value="华彩国际店" readOnly={true} />
                    <address>杭州市西湖区三墩镇华彩国际3幢8楼902室</address>
                    <label>手机号 *</label>
                    <input type="tel" maxLength="11" placeholder="务必填写正确的手机号" value={this.state.contact} onChange={(e) => { this.setState({ contact: e.target.value }) }} />
                    <label>微信号</label>
                    <input placeholder="请输入微信号" value={this.state.wechat} onChange={(e) => { this.setState({ wechat: e.target.value }) }} />
                    <label>备注</label>
                    <textarea placeholder="您对此次改造有何期望~" value={this.state.remark} onChange={(e) => { this.setState({ remark: e.target.value }) }} />
                    {
                        this.props.peopleData.haveJoinInfo ? <button className="btn send-btn noJoin-btn">提交</button> : <button className="btn send-btn" onClick={this.publish.bind(this)}>提交</button>
                    }
                    <dl className="tips-area">
                        <dt>温馨提示</dt>
                        <dd style={{ color: '#cc3333' }}>1、此活动只限参加一次；</dd>
                        <dd>2、预约完成后，Ms搭配师会在2-5个工作日之内和您沟通具体改造需求；</dd>
                        <dd>3、预约门店目前只支持杭州地区，外地用户可选择线上改造，或者来杭参加，另外Ms搭配师分店也在筹备中，敬请期待；</dd>
                        <dd>4、预约终生有效；</dd>
                        <dd>5、如有任何疑问，可加客服微信号“Astar198521”。</dd>
                    </dl>
                </section>
                {this.state.msgShow ? <Msg msgShow={() => { this.setState({ msgShow: false }) }} text={this.state.msgText} /> : null}
            </section>
        )
    }
}

GratefulParentActivity.contextTypes = {
    router: PropTypes.object.isRequired
}

// export default GratefulParentActivity;

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