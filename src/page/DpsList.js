/**
 * 搭配师列表
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { DataLoad, GetNextPage } from '../Component/index';
import { Msg, News } from '../Component/index';
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
        new Swiper('.my-watch', {
            slidesPerView: 'auto',
            observer:true,
            spaceBetween: 20
        });
        this.swiperInit();

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            list: nextProps.state.data
        })
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
                <h5 className="title" >我关注的搭配师</h5>
                <section className='my-watch-area'>
                    <div className='swiper-container my-watch'>
                        <div className='swiper-wrapper'>
                            <div className='swiper-slide text-center'>
                                <img src='https://img.dapeis.net/resources/head/20180226161145869689.jpg'/>
                                <p className='nickname'>111</p>
                            </div>
                            <div className='swiper-slide text-center'>
                                <img src='https://img.dapeis.net/resources/head/20180226161145869689.jpg'/>
                                <p className='nickname'>111</p>
                            </div>
                            <div className='swiper-slide text-center'>
                                <img src='https://img.dapeis.net/resources/head/20180226161145869689.jpg'/>
                                <p className='nickname'>111</p>
                            </div>
                            <div className='swiper-slide text-center'>
                                <img src='https://img.dapeis.net/resources/head/20180226161145869689.jpg'/>
                                <p className='nickname'>111</p>
                            </div>
                            <div className='swiper-slide text-center'>
                                <img src='https://img.dapeis.net/resources/head/20180226161145869689.jpg'/>
                                <p className='nickname'>111</p>
                            </div>
                            <div className='swiper-slide text-center'>
                                <img src='https://img.dapeis.net/resources/head/20180226161145869689.jpg'/>
                                <p className='nickname'>111</p>
                            </div>
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
                {/* <News /> */}
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