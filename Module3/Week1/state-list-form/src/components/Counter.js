import React, {Component} from 'react';

class Counter extends Component {
    constructor(){
        super();
        this.state = {
            count : 0
        };
    }
    counterPlus(){
        console.log('counting')
        // this.state.count +=1 ======> Never
        this.setState({
            count: this.state.count +1
        })
    }
    render() {
        return (
          <div>
              <p> {this.state.count} </p>
              <button onClick={ () => this.counterPlus()}> Click</button>
          </div>
        )
    }
}

export default Counter;
