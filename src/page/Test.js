import React from 'react';
import { MyDate } from '../Component/index';

class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };

    }



    render() {
        return (
            <section>
                <input type="text" />
                <MyDate option={{
                    defaultDate: new Date(),
                    startDate:'2017-12-17'
                }} />
            </section>
        )
    }
}

export default Test;