/***
 * 我要搭配
 */
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { ToolDps } from '../ToolDps';
import { DataLoad, GetData } from '../Component/index';
import BindTel from "./component/BindTel";
import qs from 'query-string';
import { News } from '../Component/index';
// var FastClick = require('fastclick');


class NeedMatch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: props.list,
            contact: props.contact || '',
            path: '', //url路径
            isBingTelShow: false, //是否显示绑定手机窗口
            typeTips: 0,//1:咨询 2:购买 3：陪逛 4：衣橱整理 5：素人改造套餐一 6：素人改造套餐二 7：素人改造套餐三
        }
    }
    componentDidMount() {
        document.title = "我要搭配";
        // FastClick.attach(this.page);
    }

    /**
     * 隐藏提示
     */
    hideTips(e) {
        let targetEle = e.target
        while (targetEle.getAttribute('class') != "price-item-box") {
            targetEle = targetEle.parentElement;
            if (targetEle == e.currentTarget) {
                break;
            }
        }
        if (targetEle.getAttribute('class') != "price-item-box") {
            this.setState({
                typeTips: 0
            });
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
        return (
            // ref={(el) => this.page = el}
            <section className="to-match-page"  onClick={this.hideTips.bind(this)}>
                <img src="/assets/img/needMatch/head.jpg" className="response_img top-img" />
                <h2 className="title">选择服务类型</h2>
                <ul className="type-select">
                    {
                        this.state.list.map((item, index) => {
                            if (this.props.plain && index < 4) {//表示是首页跳转过来的
                                return;
                            }
                            return (
                                <li key={index}>
                                    <h3 className="type-title">
                                        {item.name}
                                        <span className="price">&yen;{item.transactionPrice}</span>
                                        {
                                            item.originalPrice != item.transactionPrice ? (<del className="origin-price">原价&yen;{item.originalPrice}</del>) : null
                                        }
                                    </h3>
                                    <p className="introduce">{item.remarks}</p>
                                    <section className="price-item-box">
                                        <ul className="price-item" onClick={() => { this.setState({ typeTips: this.state.typeTips === item.id ? 0 : item.id }) }}>
                                            {
                                                item.items.map((list, i) => {
                                                    return (
                                                        <li className="flex-box" key={i}>
                                                            <div className="item">{list.title}</div>
                                                            <div className="item">&yen;{list.money}/{list.unit}</div>
                                                            <div className="item">x{list.num}</div>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                        {
                                            this.state.typeTips === 1 && item.id == "1" ? (
                                                <ul className="tips">
                                                    {
                                                        item.specification.map((description, j) => {
                                                            return (<li key={j}>{description}</li>)
                                                        })
                                                    }

                                                </ul>
                                            ) : null
                                        }

                                        {
                                            this.state.typeTips === 2 && item.id == "2" ? (
                                                <ul className="tips tips2">
                                                    {
                                                        item.specification.map((description, j) => {
                                                            return (<li key={j}>{description}</li>)
                                                        })
                                                    }
                                                </ul>
                                            ) : null
                                        }
                                        {
                                            this.state.typeTips === 3 && item.id == "3" ? (
                                                <ul className="tips tips2">
                                                    {
                                                        item.specification.map((description, j) => {
                                                            return (<li key={j}>{description}</li>)
                                                        })
                                                    }
                                                </ul>
                                            ) : null
                                        }
                                        {
                                            this.state.typeTips === 4 && item.id == "4" ? (
                                                <ul className="tips tips2">
                                                    {
                                                        item.specification.map((description, j) => {
                                                            return (<li key={j}>{description}</li>)
                                                        })
                                                    }
                                                </ul>
                                            ) : null
                                        }
                                        {
                                            this.state.typeTips === 5 && item.id == "5" ? (
                                                <ul className="tips tips3">
                                                    {
                                                        item.specification.map((description, j) => {
                                                            return (<li key={j}>{description}</li>)
                                                        })
                                                    }
                                                </ul>
                                            ) : null
                                        }
                                        {
                                            this.state.typeTips === 6 && item.id == "6" ? (
                                                <ul className="tips tips3">
                                                    {
                                                        item.specification.map((description, j) => {
                                                            return (<li key={j}>{description}</li>)
                                                        })
                                                    }
                                                </ul>
                                            ) : null
                                        }
                                        {
                                            this.state.typeTips === 7 && item.id == "7" ? (
                                                <ul className="tips tips3">
                                                    {
                                                        item.specification.map((description, j) => {
                                                            return (<li key={j}>{description}</li>)
                                                        })
                                                    }
                                                </ul>
                                            ) : null
                                        }
                                    </section>
                                    {
                                        item.id == 1 ? <Link to="/consult" className="btn to-buy-btn" onClick={this.verifyUser.bind(this, '/consult')}>立刻购买</Link> : null
                                    }
                                    {
                                        item.id == 2 ? <Link to="/shopping" className="btn to-buy-btn" onClick={this.verifyUser.bind(this, '/shopping')}>立刻购买</Link> : null
                                    }
                                    {
                                        item.id == 3 ? <Link to="/accompanyShopping" className="btn to-buy-btn" onClick={this.verifyUser.bind(this, '/accompanyShopping')}>立刻购买</Link> : null
                                    }
                                    {
                                        item.id == 4 ? <Link to="/neatenWardrobe" className="btn to-buy-btn" onClick={this.verifyUser.bind(this, '/neatenWardrobe')}>立刻购买</Link> : null
                                    }
                                    {
                                        item.id == 5 ? <Link to={"/plainPeopleChange?projectId=5"} className="btn to-buy-btn" onClick={this.verifyUser.bind(this, '/plainPeopleChange?projectId=5')}>立刻购买</Link> : null
                                    }
                                    {
                                        item.id == 6 ? <Link to="/plainPeopleChange?projectId=6" className="btn to-buy-btn" onClick={this.verifyUser.bind(this, '/plainPeopleChange?projectId=6')}>立刻购买</Link> : null
                                    }
                                    {
                                        item.id == 7 ? <Link to="/plainPeopleChange?projectId=7" className="btn to-buy-btn" onClick={this.verifyUser.bind(this, '/plainPeopleChange?projectId=7')}>立刻购买</Link> : null
                                    }
                                </li>
                            )
                        })
                    }
                </ul>
                {this.state.isBingTelShow ? <BindTel path={this.state.path} move={() => { this.setState({ isBingTelShow: false }) }} /> : null}
                <News />
            </section>
        );
    }
}


class Main extends Component {
    constructor(props) {
        super(props);
        let { plain } = qs.parse(props.location.search);//是否是首页跳转过来
        this.state = {
            plain: plain || null,
            getUser: false,//是否已经获取用户信息
            contact: ''
        }
    }

    componentDidMount() {
        ToolDps.get('/wx/user/info').then((res) => {
            if (res.succ) {
                this.setState({
                    getUser: true,
                    contact: res.contact
                })
            }
        });
    }


    componentWillReceiveProps(nextProps) {
        let { plain } = qs.parse(nextProps.location.search);//是否是首页跳转过来
        this.setState({
            plain: plain || null
        });
    }


    render() {
        let {
            data,
            loadAnimation,
            loadMsg
        } = this.props.state;
        let main = data && data.succ && this.state.getUser ? <NeedMatch plain={this.state.plain} list={data.project} contact={this.state.contact} /> : <DataLoad loadAnimation={loadAnimation} loadMsg={''} />;

        return main;
    }
}

export default GetData({
    id: 'NeedMatch', //应用关联使用的redux
    component: Main, //接收数据的组件入口
    url: '/wx/project',
    data: '', //发送给服务器的数据
    success: (state) => {
        return state;
    }, //请求成功后执行的方法
    error: (state) => {
        return state
    } //请求失败后执行的方法
});