/**
 * 绑定手机号
 * Created by potato on 2017/5/5 0005.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import action from '../../Action/Index';
import {Tool} from '../../Tool';
import {ToolDps} from '../../ToolDps';
import Msg from "../../Component/tips/msg";

class BindTel extends Component{
    constructor(props){
        super(props);
        this.state={
            msgShow:false,
            msgText:'',//提示内容
            getCodeBtnText:'获取验证码',
            second:60,//默认60秒
            pending:false,//验证码发送中
            tel:'',
            verifyCode:''
        }
        this._time=0;
        this._time2=0;
    }

    componentWillUnmount(){
        clearTimeout(this._time);
        clearTimeout(this._time2);
    }

    /**
     * 获取验证码
     */
    getCodeBtn(){
        if(this.state.pending){//是否已经发送验证码
            return;
        }
        let flag=ToolDps.reg.tel(this.state.tel);
        if(!flag){
            this.setState({
                msgShow:true,
                msgText:'请输入正确手机号',//提示内容
            });
            return;
        }
        if(this.state.tel === ""){
            this.setState({
                msgShow:true,
                msgText:'请输入手机号',//提示内容
            });
            return;
        }
        ToolDps.post('/wx/sms/bind/send',{contact:this.state.tel}).then((res)=>{
           if(res.succ){
                this.setState({
                    msgShow:true,
                    msgText:'已发送验证码',//提示内容
                });
               this.startTimer();
           }else{
               this.setState({
                   msgShow:true,
                   msgText:'发送失败',//提示内容
               });
           }
        }).catch(()=>{
            this.setState({
                msgShow:true,
                msgText:'发送失败',//提示内容
            });
        });
    }

    /**
     * 绑定
     */
    bindTel(){
        if(this.state.tel === ""){
            this.setState({
                msgShow:true,
                msgText:'请输入手机号',//提示内容
            });
            return;
        }
        if(this.state.verifyCode === ""){
            this.setState({
                msgShow:true,
                msgText:'请输入验证码',//提示内容
            });
            return;
        }
        ToolDps.post('/wx/user/bind',{contact:this.state.tel,verifyCode:this.state.verifyCode}).then((res)=>{
            if(res.succ){
                this.setState({
                    msgShow:true,
                    msgText:'绑定成功',//提示内容
                });

                this._time2=setTimeout(function () {
                    this.props.move();
                    let {User}=this.props;
                    User.contact=this.state.tel;
                    this.props.signinSuccess(User);
                }.bind(this),1000);
            }else{
                this.setState({
                    msgShow:true,
                    msgText:'请检查手机号和验证码',//提示内容
                });
            }
        }).catch(()=>{
            this.setState({
                msgShow:true,
                msgText:'绑定失败',//提示内容
            });
        });
    }

    /**
     * 启动定时器
     */
    startTimer(){
        let second=this.state.second;//秒
       this._time=setInterval(function () {
           second--;
           this.setState({
               second:second,
               getCodeBtnText:second+'秒后重发',
               pending:true//发送中
           });
           if(second === 0){
               clearInterval(this._time);
               this.setState({
                   second:60,
                   getCodeBtnText:'重发',
                   pending:false//发送中
               });
               return;
           }

        }.bind(this),1000);
    }

  render(){
      return (
          <section className="full-page bind-tel-container">
                <div className="box">
                    <div className="form-ground">
                        <div className="item">
                            <input type="tel" placeholder="手机号" maxLength={11} value={this.state.tel} onChange={(e)=>{this.setState({tel:e.target.value})}}/>
                            <span className="getCodeBtn" onClick={this.getCodeBtn.bind(this)}>{this.state.getCodeBtnText}</span>
                        </div>
                    </div>
                    <div className="form-ground">
                        <div className="item">
                            <input type="tel" placeholder="验证码" maxLength={4} value={this.state.verifyCode} onChange={(e)=>{this.setState({verifyCode:e.target.value})}}/>
                        </div>
                    </div>
                    <button className="btn bindBtn" onClick={this.bindTel.bind(this)}>绑定</button>
                    <p className="text-center tips">绑定后可体验更多服务</p>
                </div>
              {this.state.msgShow ? <Msg msgShow={()=>{this.setState({msgShow:false})}} text={this.state.msgText}/> : null}
          </section>
      )
  }

}

export default connect((state)=>{return {User:state.User}},action('User'))(BindTel);//连接redux