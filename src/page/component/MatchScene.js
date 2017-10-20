/**
 *
 * 搭配场景
 * Created by potato on 2017/4/27 0027.
 */
import React, { Component } from 'react'
import classNames from 'classnames';


class MatchScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sex: props.sex,
            girlScene: [{ url: '/assets/img/match/scene-1-1.jpg', name: '宴会' }, { url: '/assets/img/match/scene-1-2.jpg', name: '居家' }, { url: '/assets/img/match/scene-1-3.jpg', name: '约会' }, { url: '/assets/img/match/scene-1-4.jpg', name: '办公' }, { url: '/assets/img/match/scene-1-5.jpg', name: '婚礼' }, { url: '/assets/img/match/scene-1-6.jpg', name: '购物' }, { url: '/assets/img/match/scene-1-7.jpg', name: '运动' }],
            boyScene: [{ url: '/assets/img/match/scene-2-1.jpg', name: '宴会' }, { url: '/assets/img/match/scene-2-2.jpg', name: '居家' }, { url: '/assets/img/match/scene-2-3.jpg', name: '约会' }, { url: '/assets/img/match/scene-2-4.jpg', name: '办公' }, { url: '/assets/img/match/scene-2-5.jpg', name: '婚礼' }, { url: '/assets/img/match/scene-2-6.jpg', name: '购物' }, { url: '/assets/img/match/scene-2-7.jpg', name: '运动' }],
            scenes: []//选择的场景
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.sex != this.state.sex) {
            this.setState({
                sex:nextProps.sex,
                scenes:[]
            });
            this.props.getScene([]);
        }
    }

    select(type) {
        let tempScene = Array.prototype.slice.apply(this.state.scenes);
        let index = tempScene.indexOf(type);
        if (index !== -1) {
            tempScene.splice(index, 1);
        } else {
            tempScene.push(type);
        }
        this.setState({
            scenes: tempScene
        });

        this.props.getScene(tempScene);

    }


    render() {
        let { sex } = this.props;
        let scenes = [];
        if (sex === 1) {//男
            scenes = this.state.boyScene;
        } else {//女
            scenes = this.state.girlScene;
        }
        return (
            <ul className="flex-box">
                {
                    scenes.map((item, index) => {
                        return (
                            <li className="item-3" key={index} >
                                <div className={this.state.scenes.indexOf(index + 1 + '') !== -1 ? 'style-box active' : 'style-box'} onClick={this.select.bind(this, index + 1 + '')}>
                                    <img src={item.url} />
                                    <div className="bg"></div>
                                    <span className="triangle"></span>
                                    <label>{item.name}</label>
                                    <span className="icon icon-gou2"><span className="path1"></span><span className="path2"></span></span>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
}

export default MatchScene;