/**
 * 购物
 * Created by potato on 2017/4/24 0024.
 */
import React,{Component} from  'react'
import classNames from 'classnames';
import {Tips} from '../Component/index'
import GirlCategory from "./component/GirlCategory";
import BoyCategory from "./component/BoyCategory";
import MatchScene from "./component/MatchScene";
import { ToolDps } from '../ToolDps';
import {Msg} from "../Component/index";



class Shopping extends Component{
    constructor(props){
        super(props);
        this.state={
            btn:'发布',
            msgShow:false,
            msgText:'',//提示内容
            sex:2,//性别
            remark:'',//需求描述
            costCode:'1',//预期花费价格
            scene:[],//场景
            shop:[],//商品
        }
        this._time=0;
    }
    componentDidMount(){

    }


    componentWillUnmount(){
        clearTimeout(this._time);
    }



    /**
     * 搭配场景
     */
    getScene(sceneArr){
        this.setState({
            scene:sceneArr,
            msgShow:false
        });
    }
    /**
     * 获取选择场景的值
     */
    getShop(shopArr){
        this.setState({
            shop:shopArr,
            msgShow:false
        })
    }

    /**
     * 发布
     */
    publish(){
        if(this.state.scene.length === 0){
            this.setState({
                msgShow:true,
                msgText:'请选择搭配场景',//提示内容
            });
            return;
        }
        if(this.state.shop.length === 0){
            this.setState({
                msgShow:true,
                msgText:'请选择商品',//提示内容
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
            sex:this.state.sex,
            scene:this.state.scene,
            shop:this.state.shop,
            costCode:this.state.costCode,
            remark:this.state.remark,//需求描述
        }

        this.setState({
            btn:'发布中...'
        });

        ToolDps.ajax({
            url:'/wx/requirement/add_buy',
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
                    this.context.router.push('/weixin/pay?orderId='+res.orderId+"&type=2");
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
        let sexGirl = classNames({
            'active':this.state.sex === 2
        });
        let sexBoy = classNames({
            'active':this.state.sex === 1
        });
        return (
            <section className="full-page matchService">
                <section className="box occasion">
                    <h4 className="title">搭配场景</h4>
                    <MatchScene getScene={this.getScene.bind(this)}/>
                </section>
                <section className="box">
                    <h4 className="title">
                        商品选择
                        <div className="sex-switch">
                            <a href="javascript:void(0)" className={sexGirl} onClick={()=>{this.setState({sex:2,shop:this.state.sex === 2 ? this.state.shop : []})}}>♀</a>
                            <a href="javascript:void(0)" className={sexBoy} onClick={()=>{this.setState({sex:1,shop:this.state.sex === 1 ? this.state.shop : []})}}>♂</a>
                        </div>
                    </h4>
                    {this.state.sex === 2 ? <GirlCategory getShop={this.getShop.bind(this)} /> : null}
                    {this.state.sex === 1 ? <BoyCategory getShop={this.getShop.bind(this)} /> : null}
                </section>
                <section className="box">
                    <h4 className="title">预期花费</h4>
                    <div className="expect-fare-area">
                        <select onChange={(e)=>{this.setState({costCode:e.target.value})}}>
                            <option value="1">0-300</option>
                            <option value="2">300-500</option>
                            <option value="3">500-1000</option>
                            <option value="4">1000-3000</option>
                            <option value="5">>3000</option>
                            <option value="6">不限</option>
                        </select>
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

Shopping.contextTypes={
    router:React.PropTypes.object.isRequired
}



export default Shopping;