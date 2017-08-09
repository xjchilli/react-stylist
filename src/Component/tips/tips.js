/**
 * tips组件
 *
 * Created by potato on 2017/3/17.
 * usage:
 * import {Tips} from '../Component/index'
 *
 * this.state={ tipsShow:false //是否显示tips}
 *
 * 隐藏tips窗口
 *  hideTips(nextState){
 *       this.setState({
 *           tipsShow:nextState
 *       });
 *   }
 *
 * 跳过按钮
 * skipBtn(e){}
 *
 * 去完善按钮
 * perfectBtn(e){}
 *
 * <Tips isShow={this.state.tipsShow} hideTips={this.hideTips.bind(this)} skipBtn={this.skipBtn} perfectBtn={this.perfectBtn} />
 *
 *
 */
import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

class Tips extends React.Component {
    static defaultProps = {
        isShow: false//是否显示tips
    }

    constructor(props) {
        super(props);
        this.state = {
            isShow: this.props.isShow
        }
    }

    componentDidMount() {
        this.dpsTips.addEventListener('click', this.hideTips.bind(this));
    }
    /**
     * 隐藏tips窗口
     *
     */
    hideTips(e) {
        let bgEle = e.target.getAttribute('data-bg');
        if (bgEle) {
            const newState = false;
            this.props.hideTips(newState);//更新父组件状态
        }

    }

    /**
     * props更新后
     *
     * @param nextProps
     */
    componentWillReceiveProps(nextProps) {
        this.setState({
            isShow: nextProps.isShow
        });
    }

    render() {
        let tips = classNames('dps-tips', {
            'active': this.state.isShow
        });
        return (
            <div ref={el => this.dpsTips = el} className={tips} data-bg="true">
                <div className="dps-tips-box">
                    <p>填写完整信息</p>
                    <p>让我们更了解你～</p>
                    <div className="dps-tips-btn-area">
                        <Link to={this.props.skipPath}>跳过</Link>
                        <Link to={this.props.perfectPath}>去完善</Link>
                    </div>
                </div>
            </div>
        );
    }
}


export default Tips;