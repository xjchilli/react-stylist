import React from 'react';
import { Date } from '../Component/index';

class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };

    }



    render() {
        return (
            <section>
                <input type="text" />
                <Date />
            </section>
        )
    }
}

export default Test;