/**
 * 用户意见反馈
 */
import React from 'react';
import { Link } from 'react-router-dom';

class UserFeedbackLayer extends React.Component {

    closeShake() {
        shake().remove();
    }

    render() {
        return (
            <section className="feedback-container-layer">
                <section className="box">
                    <h5>请问需要反馈什么问题?</h5>
                    <ul>
                        <li>
                            <Link to='/feedback' onClick={() => { this.props.closeShake() }}>
                                意见建议
                            </Link>
                        </li>
                        <li onClick={() => { this.props.disableShake() }}>关闭摇一摇反馈</li>
                        <li onClick={() => { this.props.closeShake() }}>没啥事</li>
                    </ul>
                </section>
            </section>
        )
    }
}

export default UserFeedbackLayer;