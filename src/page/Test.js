import React from 'react';
import { MyDate } from '../Component/index';

class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            time: '',
            timeShow: false
        };

    }



    render() {
        return (
            <section>
                <input type="text" value={this.state.time} onClick={()=>{this.setState({timeShow:true})}}/>
                {
                    this.state.timeShow ? <MyDate option={{
                        defaultDate: new Date(),
                        startDate: '2017-12-17',
                        sure: (time) => { this.setState({ time: time }) },
                        cancel: () => {this.setState({timeShow:false}) }
                    }} /> : null
                }

            </section>
        )
    }
}

export default Test;