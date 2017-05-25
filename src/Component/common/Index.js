import React, { Component, PropTypes } from 'react';
import GetNextPage from './GetNextPage';
import GetData from './GetData';



/**
 * (加载动画)
 *
 * @class DataLoad
 * @extends {Component}
 */
class DataLoad extends Component {
    render() {
        let {loadAnimation, loadMsg} = this.props;
        return (
            <div className={'data-load data-load-' + loadAnimation}>
                <div className="msg">{loadMsg}</div>
            </div>
        );
    }
}
DataLoad.defaultProps = {
    loadAnimation: true, //默认显示加载动画
    loadMsg: '正在加载中'
}

export {GetNextPage,GetData,DataLoad};