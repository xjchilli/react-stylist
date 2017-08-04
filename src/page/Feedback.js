/**
 * 吐槽
 */

import React, { Component } from 'react';
import { Msg } from '../Component/index';
import { ToolDps } from '../ToolDps';



class Feedback extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msgShow: false,
            msgText: '', //提示内容
            suggest: '',//建议
            contact: ''//联系方式
        }
    }

    componentDidMount() {
        document.title = "意见反馈";
    }

    /**
     * 提交建议
     */
    send() {
        if (this.state.suggest == '') {
            this.setState({
                msgShow: true,
                msgText: '请填写建议', //提示内容 
            });
            return;
        }
        ToolDps.post('/wx/user/feedback', {
            content: this.state.suggest,
            contact: this.state.contact
        }).then((res) => {
            if (res.succ) {
                this.setState({
                    suggest: '',
                    contact: '',
                    msgShow: true,
                    msgText: '提交成功', //提示内容 
                });
            } else {
                this.setState({
                    msgShow: true,
                    msgText: '提交失败', //提示内容 
                });
            }
        });


    }

    render() {
        return (
            <div className="full-page feedback-page">
                <textarea placeholder="在这里输入您的意见和建议，若您的意见被采纳，我们将有纪念品相送！" value={this.state.suggest} onChange={(e) => { this.setState({ suggest: e.target.value }) }}></textarea>
                <label className="tel-label" htmlFor="tel">请留下您的联系方式以便我们与您联系，我们会替您保密</label>
                <input id="tel" className="tel-input" type="text" placeholder="联系方式（手机/QQ/邮箱）" value={this.state.contact} onChange={(e) => { this.setState({ contact: e.target.value }) }} />
                <button className="btn" onClick={this.send.bind(this)}>提交</button>
                {this.state.msgShow ? <Msg msgShow={() => { this.setState({ msgShow: false }) }} text={this.state.msgText} /> : null}
            </div>
        )
    }
}

export default Feedback;