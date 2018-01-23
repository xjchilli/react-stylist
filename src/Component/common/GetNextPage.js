/**
 * Created by potato on 2016/12/5.
 */
import React from 'react';
import { connect } from 'react-redux';
import action from '../../Action/Index';
import merged from 'obj-merged';
import GetNextPage from './get-next-page';
import { DataLoad } from './index';

/*import {
    target
} from '../../Config/Config';
*/

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

    class Index extends React.Component {
        constructor(props) {
            super(props);
            /**
             * 初始化状态
             * @param props
             */
            this.initState = (props) => {
                var { state, location } = props;
                var { pathname, search } = location;
                this.path = pathname + search;

                if (typeof this.action == 'undefined' && location.action == 'PUSH') {
                    this.action = false;
                } else {
                    this.action = true;
                }

                if (typeof state.path[this.path] === 'object' && state.path[this.path].path === this.path && this.action) {
                    this.myState = state.path[this.path];
                } else {
                    this.myState = merged(state.defaults); //数据库不存在当前的path数据，则从默认对象中复制，注意：要复制对象，而不是引用
                    this.myState.path = this.path;
                    this.action = false;
                }

            }
            /**
             * DOM初始化完成后执行回调
             */
            this.readyDOM = () => {
                var { scrollX, scrollY } = this.myState;
                if (this.get) return false; //已经加载过
                window.scrollTo(scrollX, scrollY);
                this.get = new GetNextPage(this.dataload, {
                    url: this.getUrl(),
                    data: this.getData(),
                    start: this.start,
                    load: this.load,
                    error: this.error
                });
            }

            /**
            * url更改时
            */
            this.unmount = () => {
                this.get ? this.get.end() : null;
                delete this.get;
                delete this.action;
                this.myState.scrollX = window.scrollX; //记录滚动条位置
                this.myState.scrollY = window.scrollY;

                this.props.setState(this.myState);
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
                this.myState.loadAnimation = true;
                this.myState.loadMsg = '正在加载中...';
                this.props.setState(this.myState);
            }

            /**
             * 请求失败时
             */
            this.error = () => {
                this.myState.loadAnimation = false;
                this.myState.loadMsg = '加载失败';
                this.props.setState(this.myState);
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
                    return data(this.props, this.myState);
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
                    myState
                } = this;
                // console.log(this.myState);
                let {
                    pager
                } = res;
                if (!pager.arrays.length && pager.arrays.length < 15) {
                    myState.nextBtn = false;
                    myState.loadMsg = '- end -';
                    this.get ? this.get.end() : null;
                } else {
                    myState.nextBtn = true;
                    myState.loadMsg = '上拉加载更多';
                    myState.currentPager = ++myState.currentPager;
                }
                Array.prototype.push.apply(myState.data, pager.arrays);
                myState.loadAnimation = false;
                this.props.setState(myState);

            }

            this.initState(props);
        }

        /**
         * 在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）。
         * 在生命周期中的这个时间点，组件拥有一个 DOM 展现，
         * 你可以通过 this.getDOMNode() 来获取相应 DOM 节点。
         */
        componentDidMount() {
            this.readyDOM();
        }

        /**
          * 在组件接收到新的 props 的时候调用。在初始化渲染的时候，该方法不会调用
          */
        componentWillReceiveProps(np) {
            var { location } = np;
            var { pathname, search } = location;
            let path = pathname + search;
            if (this.path !== path) {
                this.unmount(); //地址栏已经发生改变，做一些卸载前的处理
            }
            this.initState(np);
        }

        /**
         * 在组件的更新已经同步到 DOM 中之后立刻被调用。该方法不会在初始化渲染的时候调用。
         * 使用该方法可以在组件更新之后操作 DOM 元素。
         */
        componentDidUpdate() {
            this.readyDOM();
        }

        componentWillUnmount() {
            this.unmount();
        }
        

        render() {
            var {
                loadAnimation,
                loadMsg
            } = this.myState;
            return (
                <this.props.setting.component {...this.props} state={this.myState}>
                    <div ref={el => this.dataload = el}>
                        <DataLoad loadAnimation={loadAnimation} loadMsg={loadMsg} />
                    </div>
                </this.props.setting.component>
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