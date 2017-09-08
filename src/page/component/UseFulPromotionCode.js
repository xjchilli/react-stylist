/**
 * 可用的优惠卷
 */
import React, {
    Component
} from 'react';

class UseFulPromotionCode extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({

        });
    }


    render() {
        let { data } = this.props;
        return (
            <section className="pay-select-promotion">
                <section className="box">
                    <h4 className="title">选择可用优惠劵</h4>
                    <i className="close" onClick={this.props.hide}></i>
                    <ul className="list">
                        <li className="active">
                            <ul className="flex-box content">
                                <li className="text-center">
                                    ￥
                                    <span>19</span>
                                </li>
                                <li>
                                    <p className="service-type">全场服务通用</p>
                                    <time>有效期至2017-9-8</time>
                                    <i className="yes"></i>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <ul className="flex-box content">
                                <li className="text-center">
                                    ￥
                                    <span>19</span>
                                </li>
                                <li>
                                    <p className="service-type">全场服务通用</p>
                                    <time>有效期至2017-9-8</time>
                                    <i className="yes"></i>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <ul className="flex-box content">
                                <li className="text-center">
                                    ￥
                                    <span>19</span>
                                </li>
                                <li>
                                    <p className="service-type">全场服务通用</p>
                                    <time>有效期至2017-9-8</time>
                                    <i className="yes"></i>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <ul className="flex-box content">
                                <li className="text-center">
                                    ￥
                                    <span>19</span>
                                </li>
                                <li>
                                    <p className="service-type">全场服务通用</p>
                                    <time>有效期至2017-9-8</time>
                                    <i className="yes"></i>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <ul className="flex-box content">
                                <li className="text-center">
                                    ￥
                                    <span>19</span>
                                </li>
                                <li>
                                    <p className="service-type">全场服务通用</p>
                                    <time>有效期至2017-9-8</time>
                                    <i className="yes"></i>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <ul className="flex-box content">
                                <li className="text-center">
                                    ￥
                                    <span>19</span>
                                </li>
                                <li>
                                    <p className="service-type">全场服务通用</p>
                                    <time>有效期至2017-9-8</time>
                                    <i className="yes"></i>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </section>
            </section>
        )
    }
}

export default UseFulPromotionCode;