/**
 * 商品评价
 */
import React from 'react';
import { UploadImg, UserGoodsComment } from 'ToolAjax';
import qs from 'query-string';
import { Link } from 'react-router-dom'
import { DataLoad, GetData, Msg } from '../Component/index';

class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        document.title = '评价';
    }

    render() {
        let {
            data,
            loadAnimation,
            loadMsg
        } = this.props.state;
        let main = data && data.succ ? <GoodsComment data={data.data} /> : <DataLoad loadAnimation={loadAnimation} loadMsg={loadMsg} />;
        return main;
    }
}

/**
 * 评价成功
 */
class Success extends React.Component {
    render() {
        return (
            <section className='success-area'>
                <span className="icon icon-success"></span>
                <p>感谢您的评价～</p>
                <Link to={'/orderDetailGoods?id=' + this.props.orderId + '&t=' + new Date().getTime()} className='btn'>查看订单详情</Link>
            </section>
        )
    }
}

class GoodsComment extends React.Component {
    constructor(props) {
        super(props);
        let { details } = props.data;
        for (let i = 0; i < details.length; i++) {
            details[i].userComment = '';//用户的评论内容
            details[i].files = [];//用户上传的图片
        }
        this.state = {
            details: details,
            qualityScore: 0,//质量分数
            sendGoodsScore: 0,//发货分数
            isSucess: false,//是否提交成功
            msgShow: false,
            msgText: '', //提示内容
        }
    }


    /**
     * 上传图片
     * 
     * @param {*商品对象下标} index 
     * @param {*} e 
     */
    selectImg(index, e) {
        let files = e.target.files;
        if (files && files.length > 0) {
            if (this.state.details[index].files.length + files.length > 6) {//大于6张了
                this.setState({
                    msgShow: true,
                    msgText: '图片上限6张！'
                });
                return;
            }
            let formdata = new FormData();
            for (let i = 0; i < files.length; i++) {
                formdata.append('file', files[i]);
            }

            UploadImg(formdata).then((res) => {
                if (res.succ) {
                    let details = Array.prototype.slice.apply(this.state.details);
                    let fileArr = details[index].files;
                    for (let j = 0; j < res.data.length; j++) {
                        fileArr.push(res.data[j]);
                    }
                    details[index].files = fileArr;
                    this.setState({
                        details
                    })
                }
            });
        }
    }

    /**
     * 删除图片
     * @index 商品下标
     * @index2 图片下标
     */
    deleteImg(index, index2) {
        let details = Array.prototype.slice.apply(this.state.details);
        let fileArr = details[index].files;
        fileArr.splice(index2, 1);
        details[index].files = fileArr;
        this.setState({
            details
        })
    }

    /**
     * 质量评分
     */
    qualityScoreHtml() {
        let html = [];
        for (let i = 0; i < this.state.qualityScore; i++) {
            html.push(<span key={1 + i} className="icon icon-star2" onClick={() => { this.setState({ qualityScore: 1 + i }) }}></span>);
        }
        if (5 - this.state.qualityScore !== 0) {
            for (let i = 0; i < 5 - this.state.qualityScore; i++) {
                html.push(<span key={this.state.qualityScore + i + 1} className="icon icon-star1" onClick={() => { this.setState({ qualityScore: this.state.qualityScore + i + 1 }) }}></span>);
            }
        }

        return html;
    }

    /**
     * 发货速度评分
     */
    sendGoodsScoreHtml() {
        let html = [];
        for (let i = 0; i < this.state.sendGoodsScore; i++) {
            html.push(<span key={1 + i} className="icon icon-star2" onClick={() => { this.setState({ sendGoodsScore: 1 + i }) }}></span>);
        }
        if (5 - this.state.sendGoodsScore !== 0) {
            for (let i = 0; i < 5 - this.state.sendGoodsScore; i++) {
                html.push(<span key={this.state.sendGoodsScore + i + 1} className="icon icon-star1" onClick={() => { this.setState({ sendGoodsScore: this.state.sendGoodsScore + i + 1 }) }}></span>);
            }
        }

        return html;
    }

    /**
     * 用户评论内容
     */
    userComment(index, e) {
        let details = Array.prototype.slice.apply(this.state.details);
        details[index].userComment = e.target.value;
        this.setState({
            details
        });
    }

    /**
     * 提交
     */
    send() {
        let flag = this.validForm();
        if (!flag) return;
        let comment = [];
        let details = this.state.details;
        for (let i = 0; i < details.length; i++) {
            let imagesId = [];
            for (let k = 0; k < details[i].files.length; k++) {
                imagesId.push(details[i].files[k].id);
            }
            let obj = {
                content: details[i].userComment,//评价内容
                goodsId: details[i].goodsId,//	商品ID
                imagesId: imagesId,//(选填)图片ID
                score: this.state.qualityScore,//商品质量与描述 1-5分
                speedScore: this.state.sendGoodsScore//发货速度 1-5分
            }
            comment.push(obj);
        }
        let data = {
            orderId: this.props.data.orderId,//订单id
            comment: comment//评论对象
        }

        UserGoodsComment(data).then((res) => {
            if (res.succ) {
                this.setState({
                    isSucess: true
                });
            }
        });
    }

    validForm() {
        let details = this.state.details;
        for (let i = 0; i < details.length; i++) {
            if (!details[i].userComment) {
                this.setState({
                    msgShow: true,
                    msgText: '请填写评论内容'
                });
                return false;
            }
        }
        if (this.state.qualityScore === 0) {
            this.setState({
                msgShow: true,
                msgText: '请完成星评'
            });
            return false;
        }
        if (this.state.sendGoodsScore === 0) {
            this.setState({
                msgShow: true,
                msgText: '请完成星评'
            });
            return false;
        }
        return true;
    }

    render() {
        let qualityScoreHtml = this.qualityScoreHtml();
        let sendGoodsScoreHtml = this.sendGoodsScoreHtml();
        return (
            <section className='full-page comment-page'>
                {
                    this.state.details.map((item, index) => {
                        return (
                            <ul key={index}>
                                <li>
                                    <ul className='goods-list-area'>
                                        <li>
                                            <ul className='flex-box'>
                                                <li>
                                                    <div className='goods-img' style={{ backgroundImage: `url(${item.images})` }}></div>
                                                </li>
                                                <li>
                                                    <h4>{item.goodsName}</h4>
                                                    <p className='sku'>{item.colorName}，{item.measurementName}</p>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                    <section className='comment-content'>
                                        <div className='box'>
                                            <textarea placeholder='宝贝满足你的期待吗？留下你的意见吧～' value={item.userComment} onChange={this.userComment.bind(this, index)}></textarea>
                                        </div>
                                    </section>
                                    <section className='upload-certificate'>
                                        <ul className='flex-box'>
                                            {
                                                item.files.map((file, i) => {
                                                    return (
                                                        <li className='item-4' key={i} onClick={this.deleteImg.bind(this, index, i)}>
                                                            <div className='img-show' style={{ backgroundImage: `url(${file.path})` }}>
                                                                <span className="icon icon-fault"><span className="path1"></span><span className="path2"></span></span>
                                                            </div>
                                                        </li>
                                                    )
                                                })
                                            }
                                            {
                                                item.files.length < 6 ? (
                                                    <li className='item-4'>
                                                        <div className='upload-img-area'>
                                                            <span className="icon icon-camera2"></span>
                                                            <input type="file" accept="image/*" multiple className="upload-file" onChange={this.selectImg.bind(this, index)} />
                                                        </div>
                                                    </li>
                                                ) : null
                                            }
                                        </ul>
                                    </section>
                                </li>

                            </ul>
                        )
                    })
                }
                <section className='select-score-area'>
                    <h5>评价</h5>
                    <ul className='flex-box'>
                        <li>
                            <label>服装质量与描述</label>
                        </li>
                        <li>
                            {qualityScoreHtml}
                            <span className='score'>{this.state.qualityScore}分</span>
                        </li>
                    </ul>
                    <ul className='flex-box'>
                        <li>
                            <label>发货速度</label>
                        </li>
                        <li>
                            {sendGoodsScoreHtml}
                            <span className='score'>{this.state.sendGoodsScore}分</span>
                        </li>
                    </ul>
                </section>
                <section className='action-area'>
                    <button className='btn send-btn' onClick={this.send.bind(this)}>提交</button>
                </section>
                {this.state.isSucess ? <Success orderId={this.props.data.orderId} /> : null}
                {this.state.msgShow ? <Msg msgShow={() => { this.setState({ msgShow: false }) }} text={this.state.msgText} /> : null}
            </section>
        )
    }
}



export default GetData({
    id: 'OrderDetailGoods', //应用关联使用的redux
    component: Main, //接收数据的组件入口
    url: '/wx/goods/order/detail',
    data: (props, state) => {
        let { orderId } = qs.parse(props.location.search);
        return {
            orderId: orderId
        }
    }, //发送给服务器的数据
    success: (state) => {
        return state;
    }, //请求成功后执行的方法
    error: (state) => {
        return state
    } //请求失败后执行的方法
});