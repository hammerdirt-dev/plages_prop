import React, {Component} from 'react'


class TestComp  extends Component{
    componentDidMount(){
        this._isMounted = true        
    }
    componentWillUnmount() {
        this._isMounted = false
    }
    render(){
        return(
            <h6>No selection</h6>
        )
    }
}

export default TestComp
