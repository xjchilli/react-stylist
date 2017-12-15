/**
 * swiper图片预览
 */

import React from 'react';


class SwiperPreview extends React.Component {
    componentDidMount() {
        new Swiper('.swiper-container', {
            initialSlide: this.props.previemImgIndex || 0,
            observer: true,
            zoom: true,
            pagination: '.swiper-pagination',
            zoomMax: 5,
            zoomMin: 1,
            onTap:()=>{
                this.props.close();
            }
        });
    }
    render() {
        return (
            <section className='swiper-img-preview'>
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