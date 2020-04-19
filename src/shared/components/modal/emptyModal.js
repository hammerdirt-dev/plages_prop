import React, {Component} from 'react'
import {motion} from 'framer-motion'
import '../../css/grids.css'
import '../../css/blocks.css'
import {slideDown} from '../../utilities/framer/variants'

class EmptyModal extends Component{
    constructor(props){
        super(props);
        this.state = {
        }
    };
    render(){

        return(
            <motion.div
                initial={false}
                className="drop-down-modal-cont"
                variants={slideDown}
                animate={this.props.showMe ? "open":"closed"}
                >
                <div className="modal-content-block">
                    {this.props.component}
                </div>
            </motion.div>
        )
    }

}
export default EmptyModal
