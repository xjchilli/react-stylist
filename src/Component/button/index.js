/**
 * 按钮组件
 * 
 * Usage:
 * <Button className='btn extract-money-btn'  shineColor="red" >去提现</Button>
 * shineColor：发光颜色
 * note：发光的颜色默认继承父级
 */
import React from 'react';

class Button extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            click: false
        }
        this._time = 0;
    }

    /**
     * 点击事件处理
     */
    clickHandle(e) {
        this.setState({
            click: true
        });
        this._time = setTimeout(() => {
            this.setState({
                click: false
            });
        }, 300);
        this.props.onClick ? this.props.onClick(e) : null;
    }

    componentWillUnmount() {
        clearTimeout(this._time);
    }

    render() {
        return (
            <button className={this.state.click ? (this.props.className ? this.props.className + ' btn-clicked' : '' + ' btn-clicked') : (this.props.className ? this.props.className : '')}
                onClick={this.clickHandle.bind(this)}
                style={{ borderColor: this.props.shineColor ? this.props.shineColor : '' }}
            >
                {this.props.children}
            </button>
        )
    }
}

export default Button;