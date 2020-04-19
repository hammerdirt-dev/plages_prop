import React, { Component } from 'react'
import '../../css/grids.css'
import '../../css/blocks.css'
import '../../css/main.css'
// import ArticleViewer from './articleViewer'


class ViewerContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
            titles:false,
            articles:false,
            showMe:false,
        }

    }
    componentDidMount () {
        console.log("mounting article creator")
        this._isMounted = true
    }
    componentWillUnmount(){
        console.log("unmounting article creator")
        this._isMounted = false
    }
    componentDidUpdate(prevProps) {
        console.log("updating article creator")

    }
    render(){
        return (
             <div dangerouslySetInnerHTML={{__html:this.props.content}} />



      );
  }
}
export default ViewerContainer;
