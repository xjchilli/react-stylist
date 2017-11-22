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
    hide(event) {
        event.preventDefault();
        this.props.hidePreviewBigImg();
    }
    render() {
        return (
            <div className="preview-container" onClick={this.hide.bind(this)} onTouchStart={(e)=>{e.preventDefault()}}>
                <img src={this.props.url} alt="" />
            </div>
        )
    }
}


export default PreviewImg;