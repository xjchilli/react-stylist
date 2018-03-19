/**
 * 发布文章
 */
import React from 'react';
import Quill from 'quill';
import PropTypes from 'prop-types';
import { UploadImg } from 'ToolAjax';
import { publishFashion } from 'ToolAjax';
import { Msg } from "../Component/index";


class PublishArticle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            msgShow: false,
            msgText: '', //提示内容
            toolbarShow: false,
            editorH: window.innerHeight - 49,//编辑区高度
            planName: '',//标题
            text: '',//富文本内容
        }
        this._time = 0;
        this.editorEvent = this.editorEvent.bind(this);
        this.toolbarEvent = this.toolbarEvent.bind(this);
        this.toolbarShow = this.toolbarShow.bind(this);
        this.toolbarHide = this.toolbarHide.bind(this);
        this.editorBlur = this.editorBlur.bind(this);
    }
    componentDidMount() {
        let options = {
            debug: 'error',
            modules: {
                toolbar: '#toolbar'
            },
            placeholder: '请输入正文',
            theme: 'snow'
        };
        this.quill = new Quill('.editor', options);
        this.quill.on('text-change', (delta, oldDelta, source) => {
            var length = this.quill.getLength();
            let text = '';
            if (length > 1) {
                text = this.quill.container.firstChild.innerHTML;
            }
            this.setState({
                text: text,
            });
        });
        let toolbar = this.quill.getModule('toolbar');
        toolbar.addHandler('image', this.showImageUI);//自定义图片上传
        //去除FastClick阻止获取焦点问题
        let editorEle = document.querySelector('.editor');
        let qlEditorEle = document.querySelector('.ql-editor');
        editorEle.addEventListener('touchstart', this.editorEvent);
        this.toolbar.addEventListener('touchstart', this.toolbarEvent);
        qlEditorEle.addEventListener('focus', this.toolbarShow);
        qlEditorEle.addEventListener('blur', this.editorBlur);

    }

    componentWillUnmount() {
        let editorEle = document.querySelector('.editor');
        let qlEditorEle = document.querySelector('.ql-editor');
        editorEle.removeEventListener('touchstart', this.editorEvent);
        this.toolbar.removeEventListener('touchstart', this.toolbarEvent);
        qlEditorEle.removeEventListener('touchmove', this.toolbarHide);
        qlEditorEle.removeEventListener('focus', this.toolbarShow);
        qlEditorEle.removeEventListener('blur', this.editorBlur);
        clearTimeout(this._time);
    }

    /**
     * 
     */
    editorEvent(e) {
        e.stopPropagation();
    }

    /**
     * 工具栏阻止冒泡事件
     */
    toolbarEvent(e) {
        e.stopPropagation();
    }

    /**
     * 工具栏显示
     */
    toolbarShow() {
        let qlEditorEle = document.querySelector('.ql-editor');
        qlEditorEle.removeEventListener('touchmove', this.toolbarHide);
        this.setState({
            toolbarShow: true
        });
    }

    /**
     * 编辑器失去焦点
     */
    editorBlur() {
        let qlEditorEle = document.querySelector('.ql-editor');
        qlEditorEle.addEventListener('touchmove', this.toolbarHide);
    }

    /**
     * 工具栏隐藏
     */
    toolbarHide() {
        this.setState({
            toolbarShow: false
        });
    }

    //显示选择图片窗口
    showImageUI = () => {
        this.imgUpload.click();
    }

    //图片上传
    editorImgUpload(e) {
        let files = e.target.files;
        let formdata = new FormData();
        formdata.append('cos', 'uploadServer');//当传递任何值时，图片会上传到COS服务器
        if (files && files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                formdata.append('file', files[i]);
            }
        }
        UploadImg(formdata).then((res) => {
            if (res.succ) {
                for (let i = 0; i < res.data.length; i++) {
                    //图片嵌入到富文本
                    this.quill.insertEmbed(this.quill.getSelection().index, 'image', res.data[i].path);
                }
            }
        });
    }

    /**
     * 发布
     */
    publish() {
        let { planName, text } = this.state;
        let imgArr = document.querySelectorAll('.editor img');
        if (planName === '') {
            this.setState({
                msgShow: true,
                msgText: '请填写标题' //提示内容
            });
            return;
        }
        if (imgArr.length === 0) {
            this.setState({
                msgShow: true,
                msgText: '请上传至少一张图片' //提示内容
            });
            return;
        }
        let data = {
            planName: planName,
            content: text,
            masterImage: imgArr[0].getAttribute('src')
        }

        publishFashion(data).then((res) => {
            if (res.succ) {
                this.setState({
                    msgShow: true,
                    msgText: '发布成功' //提示内容
                });
                this._time = setTimeout(function () {
                    this.context.router.history.push('/myPublish?'+new Date().getTime());
                }.bind(this), 1500);
            }
        });
    }

    render() {
        return (
            <section className='publish-article-page'>
                <input className='title' placeholder='请输入标题' onChange={(e) => { this.setState({ planName: e.target.value }) }} />
                <section className='editor-area' ref={(el) => { this.editorBox = el }}>
                    <input type='file' accept="image/*" ref={(el) => { this.imgUpload = el }} multiple className='custom-img-upload' onChange={this.editorImgUpload.bind(this)} />
                    <section ref={(el) => { this.toolbar = el }} id='toolbar' className={this.state.toolbarShow ? 'ql-toolbar ql-snow active' : 'ql-toolbar ql-snow'}>
                        <span className="ql-formats">
                            <select className="ql-font"></select>
                            <select className="ql-size"></select>
                        </span>
                        <span className="ql-formats">
                            <button className="ql-bold"></button>
                            <button className="ql-italic"></button>
                            <button className="ql-underline"></button>
                            <button className="ql-strike"></button>
                        </span>
                        <span className="ql-formats">
                            <select className="ql-color"></select>
                            <select className="ql-background"></select>
                        </span>
                        <span className="ql-formats">
                            <select className="ql-align"></select>
                        </span>
                        <span className="ql-formats">
                            <button className="ql-link"></button>
                            <button className="ql-image"></button>
                        </span>
                    </section>
                    <section className='editor' style={{ height: this.state.editorH + 'px' }}></section>
                </section>
                <button className='btn to-publish-btn text-center' onClick={this.publish.bind(this)}>发布</button>
                {this.state.msgShow ? <Msg msgShow={() => { this.setState({ msgShow: false }) }} text={this.state.msgText} /> : null}
            </section>
        )
    }
}

PublishArticle.contextTypes = {
    router: PropTypes.object.isRequired
}

export default PublishArticle;