import React, { Component } from 'react'
import {ContentBlock} from './contentBlock'
import '../../css/blocks.css'
import '../../css/grids.css'


class TitleBlock extends Component {
    constructor(props){
        super(props)
    };
    render(){
        const titleProps = {
            content:this.props.title,
            className:this.props.titleBlock
        }
        const titleSumProps = {
            content:this.props.titleSum,
            className:this.props.titleSumBlock
        }
        return(
            <div className="title-block-row">
                <ContentBlock {...titleProps} />
                <ContentBlock {...titleSumProps} />
            </div>

        )
    }
}

export default TitleBlock
