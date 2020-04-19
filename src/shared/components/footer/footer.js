import React, {Component} from 'react'
import '../../css/grids.css'
import '../../css/footer.css'
import bafu_footer from '../../images/bafu_footer.png'

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
        let footer_style = stylefooter(this.props)

        return(
            <div  className="footer-wrapper" id={this.props.id} style={footer_style} onClick={this.props.callback} >
                <div className="footer-section-one">
                  <div className="footer-label">

                   Commissioned by the Swiss Federal office for the environment.<br/>
                   <span className="footer-attribution">Brought to you by <a href="https://www.hammerdirt.ch" rel="noopener noreferrer" target="_blank">hammerdirt</a></span>
                  </div>
                </div>
                <div className="footer-section-two">
                  <div className="footer-label">
                    <img src={bafu_footer} alt="Logo of the swiss confederation" />
                  </div>
                </div>
            </div>
        )
    }
}

export default Footer
