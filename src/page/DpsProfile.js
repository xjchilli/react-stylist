/**
 * 搭配师个人信息
 * Created by potato on 2017/5/23 0023.
 */
import React, { Component } from 'react';
import qs from 'query-string';
import { Link } from 'react-router-dom';
import { DataLoad, GetData, PreviewImg } from '../Component/index';
import { ToolDps } from '../ToolDps';
import BindTel from "./component/BindTel";



class Main extends Component {
    render() {
        let { tab } = qs.parse(this.props.location.search);
        let {
            data,
            loadAnimation,
            loadMsg
        } = this.props.state;

        let main = data && data.succ ? <DpsProfile data={data} tab={tab} /> : <DataLoad loadAnimation={loadAnimation} loadMsg={loadMsg} />;

        return main
    }
}

class DpsProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            previewBigImg: false,//是否预览大图
            bigImgUrl: '',//大图url
            tab: Number(props.tab) || 1,//1:时尚圈  2：现有服务
            dpsServerDetail: false
        }
    }

    componentDidMount() {
        document.title = "搭配师个人信息";
    }



    render() {
        let { collocation, plans, shops } = this.props.data;
        shops.map((item, index) => {
            if (item.type === 1) {
                item['typeName'] = "咨询";
            } else if (item.type === 2) {
                item['typeName'] = "购物";
            } else if (item.type === 3) {
                item['typeName'] = "陪逛";
            } else if (item.type === 4) {
                item['typeName'] = "整理";
            }
            item['url'] = "/dpsServerDetail?shopId=" + item.id;
            item['imgUrl'] = "/assets/img/server" + item.type + ".jpg";
        });
        let sex = collocation.sex;
        return (
            <section className="full-page dps-profile-page">
                <header>
                    <ul className="flex-box">
                        <li>
                            <div className="head-img" style={{ backgroundImage: 'url(' + collocation.headImg + ')' }} onClick={() => { this.setState({ previewBigImg: true, bigImgUrl: collocation.headImg }) }}>
                                {sex && sex === 2 ? (
                                    <span className="icon icon-girl"><span className="path1"></span><span className="path2"></span><span className="path3"></span></span>
                                ) : (
                                        <span className="icon icon-man"><span className="path1"></span><span className="path2"></span><span className="path3"></span></span>
                                    )
                                }
                            </div>
                        </li>
                        <li>
                            <p className="nickname">{collocation.nickName}</p>
                            <p className="styles">擅长风格：{collocation.goodsStyle}</p>
                            <section className="level-area">
                                <img src={collocation.auditState == 2 ? "/assets/img/icon/auth-yes.png" : "/assets/img/icon/auth-no.png"} />
                                <span className="level-name">{collocation.levelName}</span>
                            </section>
                        </li>
                    </ul>
                </header>
                <section className="remark-area">
                    <h3 className="text-center">个人简介</h3>
                    <p>{collocation.honor}</p>
                </section>
                <section className="tab-area">
                    <ul className="tab-switch clear">
                        <li className={this.state.tab === 1 ? "active" : ""} onClick={() => { this.setState({ tab: 1 }) }}>
                            <span>时尚圈</span>
                        </li>
                        <li className={this.state.tab === 2 ? "active" : ""} onClick={() => { this.setState({ tab: 2 }) }}>
                            <span>现有服务</span>
                        </li>
                    </ul>
                    <ul className={this.state.tab === 1 ? "fashion-list active" : "fashion-list"}>
                        {
                            plans.map((item, index) => {
                                return (
                                    <ListItem item={item} key={index} />
                                )
                            })
                        }
                    </ul>
                    <div className={this.state.tab === 2 ? "service-list active" : "service-list"}>
                        <ul className="flex-box">
                            {
                                shops.map((item, index) => {
                                    return (
                                        <li className="item-2" key={index} onClick={() => { this.setState({ dpsServerDetail: true, shopId: item.id }) }} >
                                            <img src={item.imgUrl} />
                                            <p className="text-center">{item.typeName}</p>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </section>
                {this.state.dpsServerDetail ? <DpsServer close={() => { this.setState({ dpsServerDetail: false }) }} shopId={this.state.shopId} /> : null}
                {this.state.previewBigImg ? <PreviewImg url={this.state.bigImgUrl} hidePreviewBigImg={() => { this.setState({ previewBigImg: false }) }} /> : null}
            </section>
        );
    }
}


class ListItem extends Component {
    render() {
        let { item } = this.props;
        let p = document.createElement('p');
        p.innerHTML = item.content;
        return (
            <li>
                <Link to={"/fashionMomentDetail?planId=" + item.id}>
                    <ul className="flex-box clear">
                        <li>
                            <div className="main-img" style={{ backgroundImage: 'url(' + item.masterImage + ')' }}></div>
                        </li>
                        <li className="fashion-content">
                            <h3>{item.planName}</h3>
                            <div className="text">
                                <p>{p.textContent}</p>
                            </div>
                            <div className="num-area">
                                <span className="icon-area">
                                    <span className="icon icon-heart-icon"></span>
                                    {item.agreeNum}
                                </span>
                                <span className="icon-area">
                                    <span className="icon icon-comment"></span>
                                    {item.commentNum}
                                </span>
                                <span className="time">
                                    {item.time2ago}
                                </span>
                            </div>
                        </li>
                    </ul>
                </Link>
            </li>
        )
    }
}

class DpsServer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contact: '',
            windowShow: false, //是否显示窗口
            data: null
        }
    }

    componentDidMount() {
        ToolDps.get('/wx/user/info').then((res) => {
            if (res.succ) {
                this.setState({
                    contact: res.contact
                });
                ToolDps.get("/wx/fashion/" + this.props.shopId + "/topic").then((res) => {
                    if (res.succ) {
                        this.setState({
                            windowShow: true,
                            data: res.data
                        });
                    }
                });
            }
        });
    }



    render() {
        let main = this.state.windowShow ? <DpsServerDetail close={this.props.close} contact={this.state.contact} data={this.state.data} /> : null;
        return main;
    }
}

class DpsServerDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contact: props.contact || '',
            path: '', //url路径
            isBingTelShow: false //是否显示绑定手机窗口
        }
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
        let { id, type, price, content } = this.props.data;//type 1:咨询,2:购物,3:逛街,4：衣橱整理
        let service = {
            url: '',
            price: '',
            typeName: '',
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
            <section className="dpsServerDetail-area">
                <section className="content-area">
                    <header>
                        <p>服务类别：{service.typeName}</p>
                        <p className="price">服务价格：{service.price}</p>
                    </header>
                    <section className="content">
                        {content}
                    </section>
                    <Link to={service.url} className="btn buy-btn text-center" onClick={this.verifyUser.bind(this, service.url)}>立即购买</Link>
                    <span className="icon icon-close-gray" onClick={this.props.close}></span>
                </section>
                {this.state.isBingTelShow ? <BindTel path={this.state.path} move={() => { this.setState({ isBingTelShow: false }) }} /> : null}
            </section>
        )
    }
}

export default GetData({
    id: 'DpsProfile', //应用关联使用的redux
    component: Main, //接收数据的组件入口
    url: (props, state) => {
        let { collocationId } = qs.parse(props.location.search);
        return "/wx/fashion/" + collocationId + "/dps";
    },
    data: '', //发送给服务器的数据
    success: (state) => {
        return state;
    }, //请求成功后执行的方法
    error: (state) => {
        return state
    } //请求失败后执行的方法
});

// export default DpsProfile;