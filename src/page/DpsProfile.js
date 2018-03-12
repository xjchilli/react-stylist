/**
 * 搭配师个人信息
 * Created by potato on 2017/5/23 0023.
 */
import React, { Component } from 'react';
import qs from 'query-string';
import { Link } from 'react-router-dom';
import { DataLoad, GetData, PreviewImg, Msg } from '../Component/index';
import { ToolDps } from '../ToolDps';
import { watchOrCancel } from 'ToolAjax';



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
            concern: props.data.concern,//是否关注
            previewBigImg: false,//是否预览大图
            bigImgUrl: '',//大图url
            tab: Number(props.tab) || 1,//1:时尚圈  2：现有服务
            dpsServerDetail: false,
            msgShow: false,
            msgText: '', //提示内容
        }
    }

    componentDidMount() {
        document.title = "搭配师个人信息";
    }

    watchOrCancel() {
        watchOrCancel(this.props.data.collocation.id).then((res) => {
            if (res.succ) {
                this.setState({
                    concern: !this.state.concern
                });
            } else {
                this.setState({
                    msgShow: true,
                    msgText: '操作失败' //提示内容
                });
            }
        });
    }

    calculate(fashionListImg) {
        let col1Imgs = [],//时尚圈精选图片1列
            col2Imgs = [],//时尚圈精选图片2列
            col1H = 0,//时尚圈精选图片1列高度
            col2H = 0;//时尚圈精选图片2列高度
        let data = fashionListImg;
        let imgW = window.innerWidth / 2 - 10;//布局图片宽度
        for (let i = 0; i < data.length; i++) {
            let rate = imgW / data[i].width;//比率
            let height = data[i].height * rate + 100;
            if (col1H <= col2H) {
                col1Imgs.push(data[i]);
                col1H += height;
            } else {
                col2Imgs.push(data[i]);
                col2H += height;
            }
        }

        return {
            col1Imgs: col1Imgs,
            col2Imgs: col2Imgs
        }
    }


    render() {
        let { collocation, plans, shops } = this.props.data;
        let col1Imgs = [],//时尚圈精选图片1列
            col2Imgs = [];//时尚圈精选图片2列
        if (plans.length > 0) {
            let fashion = this.calculate(plans);
            col1Imgs = fashion.col1Imgs;
            col2Imgs = fashion.col2Imgs;
        }
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
            <section className="dps-profile-page">
                <header className='text-center'>
                    <div className="head-img" style={{ backgroundImage: 'url(' + collocation.headImg + ')' }} onClick={() => { this.setState({ previewBigImg: true, bigImgUrl: collocation.headImg }) }}>
                        {sex && sex === 2 ? (
                            <span className="icon icon-girl"><span className="path1"></span><span className="path2"></span><span className="path3"></span></span>
                        ) : (
                                <span className="icon icon-man"><span className="path1"></span><span className="path2"></span><span className="path3"></span></span>
                            )
                        }
                    </div>
                    <p className="nickname">{collocation.nickName}</p>
                    <section className="level-area">
                        <img src={collocation.auditState == 2 ? "/assets/img/icon/auth-yes.png" : "/assets/img/icon/auth-no.png"} />
                        <span className="level-name">{collocation.levelName}</span>
                    </section>
                    <div className='header-btn-area'>
                        <Link to={`/chat?selToID=${collocation.timId}&&headUrl=${collocation.headImg}&&nickname=${collocation.nickName}`} className='btn question-btn'>咨询</Link>
                        <button className={this.state.concern ? 'btn watch-btn active' : 'btn watch-btn'} onClick={this.watchOrCancel.bind(this)} >{this.state.concern ? "已关注" : "+关注"}</button>
                    </div>
                    <p className="styles">擅长风格：{collocation.goodsStyle}</p>
                    <p className='remark'>{collocation.honor}</p>
                </header>
                <section className="tab-area">
                    <ul className="tab-switch clear">
                        <li className={this.state.tab === 1 ? "active" : ""} onClick={() => { this.setState({ tab: 1 }) }}>
                            <span>时尚圈</span>
                        </li>
                        <li className={this.state.tab === 2 ? "active" : ""} onClick={() => { this.setState({ tab: 2 }) }}>
                            <span>现有服务</span>
                        </li>
                    </ul>
                    <div className={this.state.tab === 1 ? "fashion-list clear active" : "fashion-list clear"}>
                        <ul>
                            {
                                col1Imgs.map((item, index) => {
                                    return (
                                        <li className='box' key={index}>
                                            <Link to={"/fashionMomentDetail?planId=" + item.id}>
                                                <img src={item.masterImage} className="main-img" />
                                            </Link>
                                            <div className='text-area'>
                                                <Link to={"/fashionMomentDetail?planId=" + item.id}>
                                                    <div className="list-title">{item.planName}</div>
                                                </Link>
                                                <div className="dps-info">
                                                    <Link to={"/dpsProfile?collocationId=" + item.collocationId}>
                                                        <img src={collocation.headImg} className="head-img" />
                                                        <span className="nickname">{item.collocationNickName}</span>
                                                    </Link>
                                                    <div className="zan">
                                                        {item.agreeValue === 1 ? <span className="icon icon-heart-selected"></span> : <span className="icon icon-heart"></span>}
                                                        {item.agreeNum}
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        <ul>
                            {
                                col2Imgs.map((item, index) => {
                                    return (
                                        <li className='box' key={index}>
                                            <Link to={"/fashionMomentDetail?planId=" + item.id}>
                                                <img src={item.masterImage} className="main-img" />
                                            </Link>
                                            <div className='text-area'>
                                                <Link to={"/fashionMomentDetail?planId=" + item.id}>
                                                    <div className="list-title">{item.planName}</div>
                                                </Link>
                                                <div className="dps-info">
                                                    <Link to={"/dpsProfile?collocationId=" + item.collocationId}>
                                                        <img src={collocation.headImg} className="head-img" />
                                                        <span className="nickname">{item.collocationNickName}</span>
                                                    </Link>
                                                    <div className="zan">
                                                        {item.agreeValue === 1 ? <span className="icon icon-heart-selected"></span> : <span className="icon icon-heart"></span>}
                                                        {item.agreeNum}
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
    
                    <div className={this.state.tab === 2 ? "service-list active" : "service-list"}>
                        <ul className="flex-box">
                            {
                                shops.map((item, index) => {
                                    return (
                                        <li className="item-2" key={index} onClick={() => { this.setState({ dpsServerDetail: true, shopId: item.id }) }} >
                                            <div className='server-img' style={{ backgroundImage: 'url(' + item.imgUrl + ')' }}></div>
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
                {this.state.msgShow ? <Msg msgShow={() => { this.setState({ msgShow: false }) }} text={this.state.msgText} /> : null}
            </section>
        );
    }
}


class DpsServer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            windowShow: false, //是否显示窗口
            data: null
        }
    }

    componentDidMount() {
        ToolDps.get("/wx/fashion/" + this.props.shopId + "/topic").then((res) => {
            if (res.succ) {
                this.setState({
                    windowShow: true,
                    data: res.data
                });
            }
        });
    }



    render() {
        let main = this.state.windowShow ? <DpsServerDetail close={this.props.close} data={this.state.data} /> : null;
        return main;
    }
}

class DpsServerDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            path: '', //url路径
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
                    <Link to={service.url} className="btn buy-btn text-center" >立即购买</Link>
                    <span className="icon icon-close-gray" onClick={this.props.close}></span>
                </section>
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