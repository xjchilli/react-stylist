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
// import { imgScale } from '../index';

class PreviewImg extends React.Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         num: 0,
    //         isMove: 0,
    //         isEnd: 0
    //     }
    // }

    componentDidMount() {
        // let scale = imgScale({
        //     ele: this.imgEle,//图片元素
        //     ctEle: this.ctEle,//图片容器元素
        //     startListen: (e) => {//实时监听
        //         // console.log('start', e);
        //         this.setState({
        //             num: e.touches.length,
        //             isEnd: 0
        //         });
        //     },
        //     moveListen: (e) => {//实时监听
        //         // console.log('move', e);
        //         if (e.touches.length > 1) {
        //             this.setState({
        //                 isMove: 'a:' + e.touches[0].pageX + " : " + e.touches[0].pageY + '     b:' + e.touches[1].pageX + " : " + e.touches[1].pageY
        //             });
        //         } else {
        //             this.setState({
        //                 isMove: 'a:' + e.touches[0].pageX + " : " + e.touches[0].pageY
        //             });
        //         }

        //     },
        //     endListen: (e) => {//实时监听
        //         // console.log('end', e);
        //         this.setState({
        //             isEnd: 1
        //         });
        //     }
        // });

    }

    hide(event) {
        event.preventDefault();
        this.props.hidePreviewBigImg();
    }
    render() {

        return (
            <div ref={(el) => this.ctEle = el} className="preview-container" onClick={this.hide.bind(this)} onTouchStart={(e) => { e.preventDefault() }}>
                {/* <p style={{ color: 'red' }}>{this.state.num}</p>
                <p style={{ color: 'red' }}>isMove:{this.state.isMove}</p>
                <p style={{ color: 'red' }}>isMove:{this.state.isEnd}</p> */}
                <img id='img' src={this.props.url} alt="" ref={(el) => this.imgEle = el} />
            </div>
        )
    }
}


export default PreviewImg;