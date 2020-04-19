import React, {Component} from 'react'
import {motion} from 'framer-motion'
import Button from '../button/buttons'
import '../../css/grids.css'
import '../../css/blocks.css'
import {slideDown} from '../../utilities/framer/variants'
import {ContentBlock} from '../blocks/contentBlock'



class Modal extends Component{
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
                        <ContentBlock {...this.props.modalTitleProps} />
                        <ContentBlock {...this.props.modalContentProps} />
                    <div className="submit-div">
                        <Button {...this.props.modalControlProps}/>
                        <Button {...this.props.modalCallBackProps} />
                    </div>
                </div>
            </motion.div>
        )
    }

}
export default Modal
