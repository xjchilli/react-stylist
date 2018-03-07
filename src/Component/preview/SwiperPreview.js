/**
 * swiper图片预览
 */

import React from 'react';


class SwiperPreview extends React.Component {
    constructor(props) {
        super(props);
        this.disableMoveEvent = this.disableTouchmove.bind(this);
    }
    componentDidMount() {
        document.querySelector('body').addEventListener('touchmove', this.disableMoveEvent);
        new Swiper('.swiper-container', {
            initialSlide: this.props.previemImgIndex || 0,
            observer: true,
            zoom: true,
            pagination: {
                el: '.swiper-pagination',
                type: 'fraction'
            },
            zoomMax: 5,
            zoomMin: 1,
            on: {
                tap: (event) => {
                    this.props.close();
                }
            }

        });
    }

    componentWillUnmount() {
        document.querySelector('body').removeEventListener('touchmove', this.disableMoveEvent);
    }

    disableTouchmove(e) {
        e.preventDefault();
    }


    render() {
        return (
            <section className='swiper-img-preview' >
                <div className='bg'></div>
                <div className="swiper-container">
                    <div className="swiper-wrapper">
                        {
                            this.props.imgArr.map((url, index) => {
                                return (
                                    <div key={index} className="swiper-slide">
                                        <div className="swiper-zoom-container">
                                            <img src={url} />
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="swiper-pagination swiper-pagination-white"></div>
                </div>
            </section>
        )
    }
}

export default SwiperPreview;