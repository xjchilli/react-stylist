/**
 * 个人信息
 *
 * Created by potato on 2017/3/15.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ToolDps } from '../ToolDps';

class Test extends React.Component {
    /**
     * 切换账号
     */
    changeAccount(val) {
        let User = JSON.parse(ToolDps.localItem('User'));
        User.openId = val;
        ToolDps.localItem('User', JSON.stringify(User));
        window.location.href = ToolDps.getHost + "/my";
    }

    render() {
        return (
            <section className="test-page">
                <h1 className="text-center" style={{ color: 'red' }}>测试前先切换到自己的账号</h1>
                <ul >
                    <li onClick={this.changeAccount.bind(this, 'oGHrAv2QLJaScmtYKnK-oVvF81S8')}>[Smart]potato[Smart]</li>
                    <li onClick={this.changeAccount.bind(this, 'oGHrAvwpDzGjKnPRxHIiCamlAR2o')}>potato</li>
                    <li onClick={this.changeAccount.bind(this, 'oGHrAvxWYOEx-C_BnZWf4E4hvXEQ')}>袁勇</li>
                    <li onClick={this.changeAccount.bind(this, 'oGHrAv3Q8GjPTnotMSkdvulza2oM')}>金理宠@Ms搭配师</li>
                    <li onClick={this.changeAccount.bind(this, 'oGHrAv_dxbFLIsc1JeuiwuDoLeZg')}>star</li>
                    <li onClick={this.changeAccount.bind(this, 'oGHrAv8iz0Y1BUl3lqycWGgPd3I4')}>A-Rachel</li>
                    <li onClick={this.changeAccount.bind(this, 'oGHrAv55dlS3cYg05eqCNIoSCaks')}>小饭桶💭</li>
                    <li onClick={this.changeAccount.bind(this, 'oGHrAv4TpsohDg8fsUTzVpVYY3RQ')}>ycm</li>
                </ul>
            </section>
        )
    }
}

export default Test;