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
            scene: [
                { url: '/assets/img/icon_party.jpg', name: '宴会' },
                { url: '/assets/img/icon_home.jpg', name: '居家' },
                { url: '/assets/img/icon_date.jpg', name: '约会' },
                { url: '/assets/img/icon_commerce.jpg', name: '办公' },
                { url: '/assets/img/icon_wedding.jpg', name: '婚礼' },
                { url: '/assets/img/icon_shopping.jpg', name: '购物' },
                { url: '/assets/img/icon_sports.jpg', name: '运动' }
            ],//所有场景
            selectScene: []//选择的场景
        }
    }

    componentDidMount() {
        new Swiper('.J-place', {
            slidesPerView: 4
        });
    }

    setScene(type) {
        let tempScene = Array.prototype.slice.apply(this.state.selectScene);
        let index = tempScene.indexOf(type);
        if (index !== -1) {
            tempScene.splice(index, 1);
        } else {
            tempScene.push(type);
        }
        this.setState({
            selectScene: tempScene
        });

        this.props.getScene(tempScene);

    }


    render() {
        return (
            <div className="swiper-container swiper-box J-place">
                <div className="swiper-wrapper">
                    {
                        this.state.scene.map((item, index) => {
                            return (
                                <div className="swiper-slide" key={index}>
                                    <div className={this.state.selectScene.indexOf(index + 1 + '') !== -1 ? 'icon-box active' : 'icon-box'} onClick={this.setScene.bind(this, index + 1 + '')}>
                                        <img src={item.url} alt="" width={50} height={50} />
                                        <span>{item.name}</span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default MatchScene;