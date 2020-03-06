import React, {Component} from 'react'
import '../../css/grids.css'
import '../../css/footer.css'
import {ContentBlock} from '../blocks/contentBlock'
import Icon from '../icons/icon'
import {ICONS} from '../icons/allIcons'
import {openClose} from '../../utilities/framer/variants'
import Button from '../button/buttons'
import{ motion} from 'framer-motion'

class Footer extends Component{
    constructor(props){
        super(props);
        this.state = {
            showMenu:true,
        }
        this.seeMenu = this.seeMenu.bind(this)
    }
    seeMenu(e){
        e.preventDefault()
        this.setState({
            showMenu:!this.state.showMenu
        })
    }
    render(){
        const stylefooter = props => {
            return ({})
        }
        const sectionOneProps = {
            className: "footer-label",
            content:"Some copyright and contact info"
        }
        const sectionTwoProps = {
            className: "footer-label",
            content:"Plages propres 2020-2021"
        }
        let footer_style = stylefooter(this.props)
        const buttonProps = {
            callback:this.seeMenu,
            buttonclass: "footerButton",
            id:"back-to-top",
            label:"Back to top",
        };
        return(
            <div  className="footer-wrapper" id={this.props.id} style={footer_style} onClick={this.props.callback} >
                <div className="footer-section-one">
                    <ContentBlock {...sectionOneProps} />
                </div>
                <div className="footer-section-two">
                    <div className="footer-label">
                        <ContentBlock {...sectionTwoProps} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer
