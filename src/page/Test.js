/**
 * Created by potato on 2017/4/28.
 */

import React,{Component} from 'react';

class Son extends Component{
    render(){
        this.props.doSomething()
        return (
            <div>son</div>
        )
    }
}

class Parent extends Component{

    doSomething(value) {
        console.log('doSomething called by child with value:', value);
    }

    render(){
        console.log(React.Children)
       const childrenWithProps=React.Children.map(this.props.children,(child)=>{
           return React.cloneElement(child, { doSomething: this.doSomething });
       })
        return (
            <div>
                <h1>parent</h1>
                <span>
                    {childrenWithProps}
                </span>

            </div>
        )
    }
}

class Test extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div style={{fontSize:'30px'}}>
              <Parent>
                  <Son/>
              </Parent>
            </div>
        )
    }
}

export default Test;