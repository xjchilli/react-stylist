/**
 * 发布文章
 */
import React from 'react';
import Quill from 'quill';
import { UploadImg } from 'ToolAjax';
import { ToolDps } from '../ToolDps';


class PublishArticle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',//富文本内容
        }
    }
    componentDidMount() {
        let options = {
            debug: 'error',
            modules: {
                toolbar: '#toolbar'
            },
            placeholder: '请编辑商品内容...',
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
        document.querySelector('.editor').addEventListener('touchstart',function(e){e.stopPropagation();});
        document.querySelector('.ql-toolbar').addEventListener('touchstart',function(e){e.stopPropagation();});

    }

    //显示选择图片窗口
    showImageUI = () => {
        this.imgUpload.click();
    }

    //图片上传
    editorImgUpload(e) {
        let files = e.target.files;
        let formdata = new FormData();
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


    render() {
        return (
            <section className='publish-article-page'>
                <section className='editor-area' ref={(el) => { this.editorBox = el }}>
                    <input type='file' accept=".jpg,.jpeg,.bmp,.png" ref={(el) => { this.imgUpload = el }} multiple className='custom-img-upload' onChange={this.editorImgUpload.bind(this)} />
                    <section ref={(el) => { this.toolbar = el }} id='toolbar' className='ql-toolbar ql-snow'>
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
                    <section className='editor' style={{ height: '300px' }}></section>
                </section>
            </section>
        )
    }
}

export default PublishArticle;