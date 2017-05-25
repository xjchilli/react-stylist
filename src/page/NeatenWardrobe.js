/**
 * 整理衣橱
 * Created by potato on 2017/4/25 0025.
 */
import React,{Component} from  'react'
import { ToolDps } from '../ToolDps';
import {City,Msg} from "../Component/index";



class NeatenWardrobe extends Component{
    constructor(props){
        super(props);
        this.state={
            btn:'发布',
            msgShow:false,
            msgText:'',//提示内容
            date:'',//日期
            time:'',//时间
            currArea:'',//当前选择区域
            addres:'',//详细地址
            remark:'',//需求描述
        }
        this._time=0;
    }

    componentDidMount(){

    }


    componentWillUnmount(){
        clearTimeout(this._time);
    }

    /**
     * 获取城市数据
     */
    getCity(data){
        let {currArea} = data;
        this.setState({
            currArea:currArea,
            msgShow:false
        });
    }

    /**
     * 发布
     */
    publish(){
        if(this.state.date === "" || this.state.time === ""){
            this.setState({
                msgShow:true,
                msgText:'请选择约定时间',//提示内容
            });
            return;
        }
        if(this.state.currArea === ""){
            this.setState({
                msgShow:true,
                msgText:'请选择城市',//提示内容
            });
            return;
        }

        if(this.state.addres === ""){
            this.setState({
                msgShow:true,
                msgText:'请填写详细地址',//提示内容
            });
            return;
        }

        if(this.state.remark === ""){
            this.setState({
                msgShow:true,
                msgText:'请填写需求描述',//提示内容
            });
            return;
        }


        let data={
            time:this.state.date + ' ' +this.state.time,//时间
            cityCode:this.state.currArea,//当前选择区域
            addres:this.state.addres,//详细地址
            remark:this.state.remark,//需求描述
        }

        this.setState({
            btn:'发布中...'
        });

        ToolDps.ajax({
            url:'/wx/requirement/add_finishing',
            type:'post',
            data:data
        }).then((res)=>{
            if(res.succ){
                this.setState({
                    btn:'发布',
                    msgShow:true,
                    msgText:'发布成功'
                });
                this._time=setTimeout(function () {
                    this.context.router.push('/weixin/pay?orderId='+res.orderId+"&type=4");
                }.bind(this),1000);
            }else{
                this.setState({
                    btn:'发布',
                    msgShow:true,
                    msgText:'发布失败'
                });
            }
        });

    }

    render(){
        return (
            <section className="full-page matchService">
                <section className="box">
                    <h4 className="title">约定时间</h4>
                    <div className="date-area">
                        <input type="date" onChange={(e)=>{this.setState({date:e.target.value})}}/>
                        <input type="time" onChange={(e)=>{this.setState({time:e.target.value})}}/>
                    </div>
                    <h4 className="title">约定地址</h4>
                    <div className="agreement-address-area">
                        <City defaultPlaceholder="请选择城市" getCity={this.getCity.bind(this)}/>
                    </div>
                    <h4 className="title">详细地址</h4>
                    <div className="agreement-address-area">
                        <input type="text" placeholder="请填写详细地址" onChange={(e)=>{this.setState({addres:e.target.value})}}/>
                    </div>
                    <h4 className="title">需求描述</h4>
                    <textarea  rows="10" className="word-describe" placeholder="有什么需要对搭配师说的嘛" onChange={(e)=>{this.setState({remark:e.target.value})}}></textarea>
                </section>
                <button className="btn publishBtn" onClick={this.publish.bind(this)}>{this.state.btn}</button>
                {this.state.msgShow ? <Msg msgShow={()=>{this.setState({msgShow:false})}} text={this.state.msgText}/> : null}
            </section>
        );
    }
}

NeatenWardrobe.contextTypes={
    router:React.PropTypes.object.isRequired
}





export default NeatenWardrobe;