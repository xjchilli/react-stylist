/**
 * 搭配师个人信息
 * Created by potato on 2017/5/23 0023.
 */
import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import {ToolDps} from '../ToolDps'
import {DataLoad,GetData} from '../Component/index';

class Main extends Component{
    constructor(props){
        super(props);
    }

    render(){
        let {data, loadAnimation, loadMsg} = this.props.state;
        let main = data.succ ? <DpsProfile data={data} /> : <DataLoad loadAnimation={loadAnimation} loadMsg={loadMsg} />;

        return (
            <div className="full-page">
                {main}
            </div>
        )
    }
}

class DpsProfile extends Component{
    constructor(props){
        super(props);
        let {isFriend,collocation} = props.data;
        this.state={
            isFriend:isFriend || false,//和该用户是否是好友，true是好友，false 非好友
            headUrl:collocation.headUrl || '',//头像
            nickname:collocation.nickname || '',//昵称
            collocationId:collocation.id,//搭配师ID
            timId:collocation.timId,//即时通讯搭配师ID
        };

    }

    toChat(){
        if(!this.state.isFriend){
            this.addFriend();
        }else{
            this.toLink();
        }
    }

    /**
     * 加好友
     */
    addFriend(){
        ToolDps.post('/wx/tim/addFriend',{collocationId:this.state.collocationId}).then((res)=>{
            if(res.succ){
               this.toLink();
            }
        });
    }

    toLink(){
        browserHistory.push('/chat?selToID='+this.state.timId+"&headUrl="+this.state.headUrl+"&nickname="+this.state.nickname);
    }

    render(){
        let {collocation,plans} = this.props.data;
        return (
            <section className="full-page profile-container" >
                <header>
                    <div className="head-img">
                        <img src={collocation.headImg} alt=""/>
                         <span className="sex">{collocation.sex === 1 ? '♂' : '♀'}</span>
                    </div>
                </header>
                <p className="name">{collocation.nickName}</p>
                <div className="figure-info-area">
                    <h3 className="title">简介</h3>
                    <p className="text-center dps-style">{collocation.goodsStyle}</p>
                    <p className="dps-introduce-text">{collocation.remark}</p>
                    <button className="btn dps-chat-btn" onClick={this.toChat.bind(this)}>立即咨询</button>
                </div>
                <div className="photo-wall">
                    <h4 className="title">客户案例</h4>
                    <div className="photo-area">
                        {
                            plans.map((lifeImg,index)=>{
                                return (
                                    <div className="item" key={index}>
                                        <img src={lifeImg} alt=""/>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </section>
        );
    }
}



export default GetData({
    id: 'Profile',  //应用关联使用的redux
    component: Main, //接收数据的组件入口
    url: '/wx/fashion/collocation',
    data: (props,state)=>{
        let {collocationId} = props.params;
        return {
            collocationId:collocationId
        }
    },//发送给服务器的数据
    success: (state) => { return state; }, //请求成功后执行的方法
    error: (state) => { return state } //请求失败后执行的方法
});