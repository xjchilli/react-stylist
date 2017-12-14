/**
 * 绑定手机号
 * Created by potato on 2017/5/5 0005.
 */
import React from 'react';
import { ToolDps } from '../../ToolDps';
import { Msg } from "../../Component/index";
import { clearInterval } from 'timers';

class BindTel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msgShow: false,
      msgText: '', //提示内容
      getCodeBtnText: '获取验证码',
      second: 60, //默认60秒
      pending: true, //验证码是否可以发送
      tel: '',
      verifyCode: ''
    }
    this._time = 0;
    this._time2 = 0;
  }

  componentWillUnmount() {
    clearTimeout(this._time);
    clearTimeout(this._time2);
  }



  /**
   * 获取验证码
   */
  getCodeBtn() {
    let flag = ToolDps.reg.tel(this.state.tel);
    if (!flag) {
      this.setState({
        msgShow: true,
        msgText: '请输入正确手机号', //提示内容
      });
      return;
    }
    if (this.state.tel === "") {
      this.setState({
        msgShow: true,
        msgText: '请输入手机号', //提示内容
      });
      return;
    }
    this.setState({
      pending: false
    });
    ToolDps.post('/wx/sms/bind/send', {
      contact: this.state.tel
    }).then((res) => {
      if (res.succ) {
        this.setState({
          msgShow: true,
          msgText: '已发送验证码', //提示内容
        });
        this.startTimer();
      } else {
        this.setState({
          msgShow: true,
          msgText: res.msg, //提示内容
        });
      }
    }).catch(() => {
      this.setState({
        msgShow: true,
        msgText: '发送失败', //提示内容
      });
    });
  }

  /**
   * 绑定
   */
  bindTel() {
    if (this.state.tel === "") {
      this.setState({
        msgShow: true,
        msgText: '请输入手机号', //提示内容
      });
      return;
    }
    if (this.state.verifyCode === "") {
      this.setState({
        msgShow: true,
        msgText: '请输入验证码', //提示内容
      });
      return;
    }
    ToolDps.post('/wx/user/bind', {
      contact: this.state.tel,
      verifyCode: this.state.verifyCode
    }).then((res) => {
      if (res.succ) {
        this.setState({
          msgShow: true,
          msgText: '绑定成功', //提示内容
        });

        this._time2 = setTimeout(() => {
          this.props.close(this.state.tel);
        }, 1000);

      } else {
        this.setState({
          msgShow: true,
          msgText: res.msg, //提示内容
        });
      }
    }).catch(() => {
      this.setState({
        msgShow: true,
        msgText: '绑定失败', //提示内容
      });
    });
  }

  /**
   * 启动定时器
   */
  startTimer() {
    this._time = setTimeout(this.time.bind(this), 1000);
  }

  time() {
    let second = this.state.second; //秒
    second--;
    if (second <= 0) {
      this.setState({
        second: 60,
        getCodeBtnText: '重发',
        pending: true //发送中
      });
    } else {
      this.setState({
        second: second,
        getCodeBtnText: second + '秒后重发',
      });
      this._time = setTimeout(this.time.bind(this), 1000);
    }
  }

  render() {
    return (
      <section className="full-page bind-tel-container">
        <div className="box">
          <div className="form-ground">
            <div className="item">
              <span className="icon icon-tel"></span>
              <input type="tel" placeholder="请输入11位手机号码" maxLength={11} value={this.state.tel} onChange={(e) => { this.setState({ tel: e.target.value }) }} />
            </div>
          </div>
          <div className="form-ground">
            <div className="item">
              <span className="icon icon-lock"></span>
              <input type="tel" placeholder="请输入验证码" maxLength={4} value={this.state.verifyCode} onChange={(e) => { this.setState({ verifyCode: e.target.value }) }} />
              <span className="getCodeBtn" onClick={this.state.pending ? this.getCodeBtn.bind(this) : null}>{this.state.getCodeBtnText}</span>
            </div>
          </div>
          <button className="btn bindBtn" onClick={this.bindTel.bind(this)}>绑定</button>
        </div>
        {this.state.msgShow ? <Msg msgShow={() => { this.setState({ msgShow: false }) }} text={this.state.msgText} /> : null}
      </section>
    )
  }

}


export default BindTel; //连接redux