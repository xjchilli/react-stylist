/**
 * Created by potato on 2016/12/5.
 */
import React, {
    Component,
    PropTypes
} from 'react';
import {
    connect
} from 'react-redux';
import action from '../../Action/Index';
import merged from 'obj-merged';
import GetNextPage from './get-next-page';
import {
    DataLoad
} from './index';

import {
    target
} from '../../Config/Config';


/**
 * 主模块入口
 *
 * @param mySetting
 * @constructor
 */
const Main = (mySetting) => {
    var setting = {
        id: '', //应用唯一id表示
        type: 'GET', //请求类型
        url: '', //请求地址
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
    for (let key in mySetting) {
        setting[key] = mySetting[key];
    }

    class Index extends Component {
        constructor(props) {
            super(props);
            /**
             * 初始化状态
             * @param props
             */
            this.initState = (props) => {
                    var {
                        state,
                        location
                    } = props;
                    var {
                        pathname,
                        search
                    } = location;
                    this.path = pathname + search;

                    if (typeof this.action == 'undefined' && location.action == 'PUSH') {
                        this.action = false;
                    } else {
                        this.action = true;
                    }

                    if (typeof state.path[this.path] === 'object' && state.path[this.path].path === this.path && this.action) {
                        this.state = state.path[this.path];
                    } else {
                        this.state = merged(state.defaults); //数据库不存在当前的path数据，则从默认对象中复制，注意：要复制对象，而不是引用
                        this.state.path = this.path;
                    }

                }
                /**
                 * DOM初始化完成后执行回调
                 */
            this.redayDOM = () => {
                    var {
                        scrollX,
                        scrollY
                    } = this.state;
                    window.scrollTo(scrollX, scrollY);
                    this.get = new GetNextPage(this.refs.dataload, {
                        url: target + this.getUrl(),
                        data: this.getData(),
                        start: this.start,
                        load: this.load,
                        error: this.error
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
                } = this.props.setting;
                return url;
            }

            /**
             * 请求开始
             */
            this.start = () => {
                this.state.loadAnimation = true;
                this.state.loadMsg = '正在加载中...';
                this.props.setState(this.state);
            }

            /**
             * 请求失败时
             */
            this.error = () => {
                this.state.loadAnimation = false;
                this.state.loadMsg = '加载失败';
                this.props.setState(this.state);
            }

            /**
             * 获取要发送给服务器的数据
             *
             * @returns
             */
            this.getData = () => {
                let {
                    data
                } = this.props.setting;
                if (typeof data === 'function') {
                    return data(this.props, this.state);
                } else if (data && typeof data === 'string') {
                    return data;
                } else {
                    return this.props.location.query;
                }
            }

            /**
             * 下一页加载成功
             *
             * @param {Object} res
             */
            this.load = (res) => {
                let {
                    state
                } = this;
                let {
                    pager
                } = res;
                if (!pager.arrays.length && pager.arrays.length < 10) {
                    state.nextBtn = false;
                    state.loadMsg = '没有了';
                    this.get.end();
                } else {
                    state.nextBtn = true;
                    state.loadMsg = '上拉加载更多';
                    state.currentPager = ++state.currentPager;
                }
                Array.prototype.push.apply(state.data, pager.arrays);
                state.loadAnimation = false;
                this.props.setState(state);

            }

            this.initState(props);
        }

        /**
         * 在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）。
         * 在生命周期中的这个时间点，组件拥有一个 DOM 展现，
         * 你可以通过 this.getDOMNode() 来获取相应 DOM 节点。
         */
        componentDidMount() {
            this.redayDOM();
        }


        render() {
            var {
                loadAnimation,
                loadMsg
            } = this.state;
            return (
                <div className="full-page">
                    <this.props.setting.component {...this.props} state={this.state}/>
                    <div ref='dataload'>
                        <DataLoad loadAnimation={loadAnimation} loadMsg={loadMsg} />
                    </div>
                </div>
            );
        }
    }

    Index.defaultProps = {
        setting
    };

    return connect((state) => {
        return {
            state: state[setting.id]
        }
    }, action(setting.id))(Index);
}


export default Main;