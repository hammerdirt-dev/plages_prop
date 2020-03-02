import React, {Component} from 'react'
import './apiUrls.js'
import {getSomeData, returnSomeData} from './httpMethods.js'
import {motion, AnimatePresence } from 'framer-motion'
import {slideDown, slideIn} from '../../shared/utilities/framer/variants'
import '../../shared/css/grids.css'
import Card from '../../shared/components/card/card'



class FetchData extends Component{
    constructor(props){
        super(props);
        this.state = {
        }
        this.responseStatus = this.responseStatus.bind(this)
    };
    async componentDidMount(){
        let some_data = await returnSomeData(getSomeData(this.props.url), this.props.label);
        this.props.callback(some_data)
    }

    responseStatus(e){
        e.preventDefault()
        this.setState({
            seenotes:!this.state.seenotes
        })
    }

    render(){

        return(
            null
        )
    }
}

export default FetchData
