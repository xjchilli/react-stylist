/**
 * 预览图片
 * usage:
 *  this.state = {
 *     previewBigImg: false,//是否预览大图
 *     bigImgUrl: ''//大图url
 * }
 *
 * {this.state.previewBigImg ? <PreviewImg url={this.state.bigImgUrl} hidePreviewBigImg={() => { this.setState({ previewBigImg: false }) }} /> : null}
 */
import React from 'react';


class PreviewImg extends React.Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         num: 0,
    //         isMove: 0,
    //         isEnd: 0
    //     }
    //     this.move = this.move.bind(this);
    // }

    // componentDidMount() {
    //     this.imgEle.addEventListener('touchstart', (e) => {
    //         this.setState({
    //             num: e.touches.length
    //         });
    //         console.log(e.touches.length);

    //         this.imgEle.addEventListener('touchmove', this.move);//move 
    //     });



    //     this.imgEle.addEventListener('touchend', (e) => {
    //         this.imgEle.removeEventListener('touchmove', this.move);
    //         this.setState({
    //             isEnd: Math.random() * 100
    //         });
    //     });


    // }

    // move() {
    //     this.setState({
    //         isMove: Math.random() * 100
    //     });
    // }


    hide(event) {
        event.preventDefault();
        this.props.hidePreviewBigImg();
    }
    render() {
        return (
            <div className="preview-container" onClick={this.hide.bind(this)} onTouchStart={(e) => { e.preventDefault() }}>
                {/* <p style={{ color: 'red' }}>{this.state.num}</p>
                <p style={{ color: 'red' }}>isMove:{this.state.isMove}</p>
                <p style={{ color: 'red' }}>isMove:{this.state.isEnd}</p> */}
                <img src={this.props.url} alt="" ref={(el) => this.imgEle = el} />
            </div>
        )
    }
}


export default PreviewImg;