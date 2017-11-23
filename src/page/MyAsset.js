/**
 * 我的资产
 */
import React from 'react';
import { Button } from '../Component/index';
import { ToolDps } from '../ToolDps';

class MyAsset extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false
        }
    }
    render() {
        return (
            <section className='myAsset-page'>
                <header>
                    <p className='title'>账户总资产(元)</p>
                    <p className='num'>5268.98</p>
                    <Button className='btn extract-money-btn'>去提现</Button>
                    {/* <button className='btn extract-money-btn'>去提现</button> */}
                </header>
                <dl>
                    <dt style={{ borderBottomWidth: ToolDps.iphone ? '0.5px' : '1px' }}>资金明细</dt>
                    <dd style={{ borderBottomWidth: ToolDps.iphone ? '0.5px' : '1px' }}>
                        <p className='nickname'>啊飘打赏</p>
                        <time className='time'>11-22  08:30</time>
                        <span className='num'>+0.60</span>
                    </dd>
                    <dd style={{ borderBottomWidth: ToolDps.iphone ? '0.5px' : '1px' }}>
                        <p className='nickname'>啊飘打赏</p>
                        <time className='time'>11-22  08:30</time>
                        <span className='num'>+0.60</span>
                    </dd>
                    <dd style={{ borderBottomWidth: ToolDps.iphone ? '0.5px' : '1px' }}>
                        <p className='nickname'>啊飘打赏</p>
                        <time className='time'>11-22  08:30</time>
                        <span className='num'>+0.60</span>
                    </dd>
                    <dd style={{ borderBottomWidth: ToolDps.iphone ? '0.5px' : '1px' }}>
                        <p className='nickname'>啊飘打赏</p>
                        <time className='time'>11-22  08:30</time>
                        <span className='num'>+0.60</span>
                    </dd>
                </dl>
            </section>
        )
    }
}


export default MyAsset;