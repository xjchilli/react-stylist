/**
 * 搭配师列表
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { DataLoad, GetNextPage } from '../Component/index';
import { Msg } from '../Component/index';
import { myWatchDpsList, watchOrCancel } from 'ToolAjax';
import HomeTab from './component/HomeTab';




class DpsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msgShow: false,
            msgText: '', //提示内容
            myWatchDps: [],//我关系的搭配师
            list: props.state.data || []
        }
    }


    componentDidMount() {
        document.title = "搭配师列表";
        this.getWatchDpsList();
        this.swiperInit();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            list: nextProps.state.data
        })
    }

    /**
     * 获取关注的搭配师列表
     * */
    getWatchDpsList() {
        myWatchDpsList().then((res) => {
            if (res.succ) {
                if (res.data.length <= 6) {
                    this.setState({
                        myWatchDps: res.data
                    });
                } else {
                    this.setState({
                        myWatchDps: res.data.slice(0, 6)
                    });
                }
                new Swiper('.my-watch', {
                    slidesPerView: 'auto',
                    observer: true,
                    spaceBetween: 20
                });
            }
        });
    }


    //取消关注
    cancelWatch(collocationId) {
        watchOrCancel(collocationId).then((res) => {
            if (res.succ) {
                let copyData = Array.prototype.slice.apply(this.state.list);
                for (let i = 0; i < copyData.length; i++) {
                    if (copyData[i].collocationId == collocationId) {
                        copyData[i].concern = !copyData[i].concern;
                        break;
                    }
                }
                this.getWatchDpsList();
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


    componentDidUpdate() {
        this.swiperInit();
    }

    swiperInit() {
        let list = this.state.list;
        for (let i = 0; i < list.length; i++) {
            if (list[i].plans.length > 0) {
                new Swiper('.swiper-' + i, {
                    slidesPerView: 'auto',
                    spaceBetween: 5
                });
            }
        }
    }

    render() {
        return (
            <section className="dps-list-page">
                <HomeTab tab='2'/>
                <h5 className="title" >
                    我关注的搭配师
                    <Link to="/myWatch">更多</Link>
                </h5>
                <section className='my-watch-area'>
                    <div className='swiper-container my-watch'>
                        <div className='swiper-wrapper'>
                            {
                                this.state.myWatchDps.map((item, index) => {
                                    return (
                                        <div className='swiper-slide text-center' key={index}>
                                            <Link to={"/dpsProfile?collocationId=" + item.collocationId}>
                                                <img src={item.headImg} />
                                                <p className='nickname'>{item.nickName}</p>
                                            </Link>
                                        </div>
                                    )
                                })
                            }
                            {
                                this.state.myWatchDps.length === 0 ? (
                                    <p>
                                        暂时没有您关注的搭配师
                                    </p>
                                ) : null
                            }
                        </div>
                    </div>
                </section>
                <h5 className="title" >热门搭配师</h5>
                <section className="list-area">
                    <ul>
                        {
                            this.state.list.map((item, index) => {
                                return (
                                    <li key={index}>
                                        <div className='lside'>
                                            <section className="dps-info">
                                                <Link to={"/dpsProfile?collocationId=" + item.collocationId}>
                                                    <img src={item.headImg} />
                                                </Link>
                                                <div className="btn-area">
                                                    <button className={item.concern ? "btn watch-btn watched" : "btn watch-btn"} onClick={this.cancelWatch.bind(this, item.collocationId)}>{item.concern ? "取注" : "+关注"}</button>
                                                </div>
                                            </section>
                                        </div>
                                        <div className='rside'>
                                            <div className={'swiper-container swiper-' + index}>
                                                <div className='swiper-wrapper'>
                                                    <div className='swiper-slide'>
                                                        <h5 className='text-center nickname'>{item.nickName}</h5>
                                                        <p className="describe">{item.honor}</p>
                                                    </div>
                                                    {
                                                        item.plans.map((plan, i) => {
                                                            return (
                                                                <div className='swiper-slide' key={i} style={{ backgroundImage: 'url(' + plan.masterImgae + ')' }}>
                                                                    <Link to={"/fashionMomentDetail?planId=" + plan.planId}></Link>
                                                                </div>
                                                            )
                                                        }
                                                        )
                                                    }
                                                    {
                                                        item.plans.length > 3 ? (
                                                            <div className='swiper-slide'>
                                                                <Link to={"/dpsProfile?collocationId=" + item.collocationId}>
                                                                    <div className='more'></div>
                                                                </Link>
                                                            </div>
                                                        ) : null
                                                    }

                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                )
                            })
                        }

                    </ul>
                </section>
                {this.props.children}
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