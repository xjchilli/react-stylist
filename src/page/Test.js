/**
 * 时尚圈
 * Created by potato on 2017/4/8.
 */
import React, { Component } from 'react';
import { ToolDps } from '../ToolDps';
import { is, fromJS, Map } from 'immutable';



class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            times: 0,
            date: '1123'
        };

    }

    componentDidMount() {
        this.textInput.focus();
    }



    modifyTime(e) {
        this.setState({
            date: e.target.value
        });
    }

    render() {
        return (
            <div>
                <CustomTextInput
                    ref={(input) => { this.textInput = input; }} />
            </div>
        )
    }
}


class CustomTextInput extends React.Component {
    constructor(props) {
        super(props);
        // this.focus = this.focus.bind(this);
    }

    focus() {
        // 直接使用原生 API 使 text 输入框获得焦点
        this.textInput.focus();
    }

    render() {
        // 使用 `ref` 的回调将 text 输入框的 DOM 节点存储到 React 
        // 实例上（比如 this.textInput）
        return (
            <div>
                <input
                    type="text"
                    ref={(input) => { this.textInput = input; }} />
                {/* <input
                    type="button"
                    value="Focus the text input"
                    onClick={this.focus}
                /> */}
            </div>
        );
    }
}


export default Test;



