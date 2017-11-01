/**
 * 搭配师列表
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { DataLoad, GetNextPage } from '../Component/index';
import { Msg, Footer, News } from '../Component/index';
import { ToolDps } from '../ToolDps';




class DpsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msgShow: false,
            msgText: '', //提示内容
            list: props.state.data || []
        }
    }


    componentDidMount() {
        document.title = "搭配师列表";
    }


    //取消关注
    cancelWatch(collocationId) {
        ToolDps.post('/wx/concern/doAddOrDel', { collocationId: collocationId }).then((res) => {
            if (res.succ) {
                let copyData = Array.prototype.slice.apply(this.state.list);
                for (let i = 0; i < copyData.length; i++) {
                    if (copyData[i].collocationId == collocationId) {
                        copyData[i].concern = !copyData[i].concern;
                        break;
                    }
                }
                this.setState({
                    data: copyData
                });
            } else {
                this.setState({
                    msgShow: true,
                    msgText: '操作失败' //提示内容
                });
            }

        });
    }

    render() {
        return (
            <section className="dps-list-page">
                <Footer tab="2" />
                <section className="list-area">
                    <h5 className="title" style={{borderBottomWidth:ToolDps.iphone ? '0.5px' : '1px'}}>热门搭配师</h5>
                    <ul>
                        {
                            this.state.list.map((item, index) => {
                                return (
                                    <li key={index}>
                                        <section className="dps-info">
                                            <Link to={"/dpsProfile?collocationId=" + item.collocationId}>
                                                <img src={item.headImg} />
                                                <span className="nickname">{item.nickName}</span>
                                            </Link>
                                            <div className="btn-area">
                                                <Link to={"/dpsProfile?collocationId=" + item.collocationId + "&tab=2"} className="btn question-btn">咨询</Link>
                                                <button className={item.concern ? "btn watch-btn watched" : "btn watch-btn"} onClick={this.cancelWatch.bind(this, item.collocationId)}>{item.concern ? "已关注" : "+关注"}</button>
                                            </div>
                                        </section>
                                        <Link to={"/dpsProfile?collocationId=" + item.collocationId}>
                                            <section className="main-img-area" style={{ backgroundImage: 'url(' + item.backgroundImg + ')' }}>
                                                <p className="describe">
                                                    <span>
                                                        {item.honor}
                                                    </span>
                                                </p>
                                            </section>
                                        </Link>
                                        <ul className="flex-box small-img-area">
                                            {
                                                item.plans.map((plan, i) => {
                                                    return (
                                                        <li className="item-3" key={i}>
                                                            <Link to={"/fashionMomentDetail?planId=" + plan.planId}>
                                                                <div className="small-img" style={{ backgroundImage: 'url(' + plan.masterImgae + ')' }}></div>
                                                            </Link>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </li>
                                )
                            })
                        }

                    </ul>
                </section>
                {this.props.children}
                <News />
                {this.state.msgShow ? <Msg msgShow={() => { this.setState({ msgShow: false }) }} text={this.state.msgText} /> : null}
            </section>
        )
    }
}


export default GetNextPage({
    id: 'HotDpsList', //应用关联使用的redux
    component: DpsList, //接收数据的组件入口
    url: '/wx/hostDps',
    data: (props, state) => { //发送给服务器的数据
        let {
            currentPager
        } = state;
        return {
            currentPager
        }
    },
    success: (state) => {
        return state;
    }, //请求成功后执行的方法
    error: (state) => {
        return state
    } //请求失败后执行的方法
});