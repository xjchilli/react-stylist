/**
 * 时尚圈
 * Created by potato on 2017/4/8.
 */
import React from 'react';
import { ToolDps } from '../ToolDps';
import { is, fromJS, Map } from 'immutable';



class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: Map({ times: 0, name: 'potato' })
        };

    }

    componentDidMount() {

        let user1={
            name:'wzh',
            age:12,
            love:[{
                age:12
            },'看动漫']
        }

        let user2={
            name:'wzh',
            age:12,
            love:[{
                age:13
            },'看动漫']
        }


        console.log(is(fromJS(user1),fromJS(user2)));
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     return !(this.props === nextProps || is(this.props, nextProps)) ||
    //         !(this.state === nextState || is(this.state, nextState));
    // }

    handleAdd() {
        this.setState(({ data }) => ({
            data: data.update('times', v => v + 1)
        })
        )

    }

    render() {
        console.log(this.state.data.get('times'));
        return (
            <div>
                <button onClick={this.handleAdd.bind(this)}>{this.state.data.get('times')}</button>
                <button onClick={() => { this.setState({ date: '2' }) }}>2</button>
            </div>
        )
    }
}





export default Test;



