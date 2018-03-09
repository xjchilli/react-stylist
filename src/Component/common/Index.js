import React from 'react';
import { withRouter } from 'react-router'
import GetNextPage from './GetNextPage';
import GetData from './GetData';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import action from '../../Action/Index';
import MyNews from './MyNews';




/**
 * (加载动画)
 *
 * @class DataLoad
 * @extends {Component}
 */
class DataLoad extends React.Component {
    render() {
        let { loadAnimation, loadMsg } = this.props;
        return (
            <div className={'data-load data-load-' + loadAnimation}>
                <div className="msg">{loadMsg}</div>
            </div>
        );
    }
}
DataLoad.defaultProps = {
    loadAnimation: true, //默认显示加载动画
    loadMsg: '正在加载中'
}

/**
 * 服务入口
 */
class Server extends React.Component{
    render(){
        return (
            <section className='match-server-area'>
                <div className='bg' onClick={this.props.close}></div>
                <ul className='flex-box box'>
                    <li className='item-2'>
                        <Link className='entry' to='/consult'>
                            <img src='/assets/img/needMatch/online-consut.jpg'/>
                            <span>线上咨询</span>
                        </Link>
                    </li>
                    <li className='item-2'>
                        <Link className='entry' to='/plainPeopleChange?projectId=5'>
                            <img src='/assets/img/needMatch/offline-experience.jpg'/>
                            <span>线下体验</span>
                        </Link>
                    </li>
                </ul>   
            </section>
        )
    }
}

//底部tab
class PageFooter extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            isServer:false//是否显示服务入口
        }  
    }
    
    render() {
        const { pathname } = this.props.location;
        let tab = '1';
        if (/(^\/$)/.test(pathname) || /(^\/dpsList$)/.test(pathname)) {//首页
            tab = '1';
        } else if (/(^\/fashionMoment$)/.test(pathname)) {//发现
            tab = '2';
        }else if (/(^\/myDps$)/.test(pathname)) {//我的搭配师
            tab = '4';
        } else if (/(^\/my$)/.test(pathname)) {//我的
            tab = '5';
        }
        return (
            // ref={(el) => this.footer = el}
            <ul className="footer clear">
                <li>
                    <NavLink to="/" activeClassName={tab == 1 ? "active" : ""}>
                        <span className={tab == 1 ? "icon icon-home-selected" : "icon icon-home-normal"}></span>
                        <p>首页</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/fashionMoment" activeClassName={tab == 2 ? "active" : ""} >
                        <span className={tab == 2 ? "icon icon-find-selected" : "icon icon-find-normal"}></span>
                        <p>发现</p>
                    </NavLink>
                </li>
                <li>
                    <img className="da-img" src='/assets/img/icon/tab-3-1.png' onClick={()=>{this.setState({isServer:true})}}/>
                    {
                        this.state.isServer ? <Server close={()=>{this.setState({isServer:false})}}/> : null
                    }
                    
                </li>
                <li>
                    <NavLink to="/myDps" activeClassName={tab == 4 ? "active" : ""} >
                        <span className={tab == 4 ? "icon icon-info-active" : "icon icon-info"} >
                            {
                                tab == 4 ? null : <MyNews />
                            }
                        </span>
                        <p>消息</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/my" activeClassName={tab == 5 ? "active" : ""}>
                        <span className={tab == 5 ? "icon icon-my-selected" : "icon icon-my-normal"}></span>
                        <p>我的</p>
                    </NavLink>
                </li>
            </ul >
        )
    }
}

let Footer = withRouter(PageFooter);

export { GetNextPage, GetData, DataLoad, Footer };