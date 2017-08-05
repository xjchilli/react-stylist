/**
 * Created by potato on 2017/4/15.
 */
import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import action from '../../Action/Index';
import merged from 'obj-merged';
import { ToolDps } from '../../ToolDps';


/**
 * 模块入口方法
 *
 * @param {Object} mySeting
 * @returns
 */

const Main = (mySeting) => {
    var seting = {
        id: '', //应用唯一id表示
        type: 'GET', //请求类型
        url: '', //请求地址
        stop: false, //true 拦截请求，false不拦截请求
        data: null, //发送给服务器的数据
        component: <div></div>, //数据回调给的组件
        success: (state) => {
            return state;
        }, //请求成功后执行的方法
        error: (state) => {
            return state;
        } //请求失败后执行的方法
    };

    /**
     * 覆盖默认设置
     */
    for (let key in mySeting) {
        seting[key] = mySeting[key];
    }

    /**
     * 组件入口
     *
     * @class Index
     * @extends {Component}
     */
    class Index extends React.Component {
        constructor(props) {
            super(props);

            /**
             * 初始化状态
             *
             * @param {Object} props
             */
            this.initState = (props) => {
                let { state, location } = props;
                let { pathname, search } = location;
                this.path = pathname + search;

                if (typeof state.path[this.path] === 'object' && state.path[this.path].path === this.path) {
                    this.state = state.path[this.path];
                } else {
                    this.state = merged(state.defaults); //数据库不存在当前的path数据，则从默认对象中复制，注意：要复制对象，而不是引用
                    this.state.path = this.path;
                }

            }


            this.redayDOM = () => {
                let {
                    success,
                    error
                } = this.props.seting;
                this.get = ToolDps.get(this.getUrl(), this.getData()).then((res) => {
                    this.state.loadMsg = '加载成功';
                    if (!res.succ) {
                        this.state.loadMsg = '加载失败';
                    }
                    this.state.loadAnimation = false;
                    this.state.data = res;
                    this.props.setState(success(this.state) || this.state);
                }).catch(() => {
                    this.state.loadMsg = '加载失败';
                    this.state.loadAnimation = false;
                    this.props.setState(success(this.state) || this.state);
                });

            }

            /**
             * 获取ajax 请求url
             *
             * @returns Object
             */
            this.getUrl = () => {
                var {
                    url
                } = this.props.seting;
                if (typeof url === 'function') {
                    return url(this.props, this.state);
                } else if (url && typeof url === 'string') {
                    return url;
                } else {
                    return this.props.location.pathname;
                }
            }


            /**
             * 获取要发送的数据
             *
             * @returns
             */
            this.getData = () => {
                var {
                    data
                } = this.props.seting;
                if (typeof data === 'function') {
                    return data(this.props, this.state);
                } else if (data && typeof data === 'string') {
                    return data;
                } else {
                    return this.props.location.query;
                }
            }

            this.initState(this.props);
        }

        componentDidMount() {
            this.redayDOM();
        }

        render() {
            return <this.props.seting.component {...this.props} state={this.state} />
        }
    }

    Index.defaultProps = {
        seting
    };

    return withRouter(connect((state) => {
        return {
            state: state[seting.id]
        }
    }, action(seting.id))(Index)); //连接redux
}


export default Main;