import React, {Component} from 'react'
import '../../shared/css/grids.css'
import '../../shared/css/header.css'
import '../../shared/css/navigation.css'
import DisableButton from '../../shared/components/button/disableButtons'

class NavBar extends Component{
    componentDidMount(){
        this._isMounted = true
    }
    componentWillUnmount() {
        this._isMounted = false
    }
    render(){
        return(
            <div className="nav-container">
                <div className="nav-item">
                    {
                        this.props.navButtonProps && this.props.navButtonProps.map((obj,i) => <DisableButton key={i} {...obj} />)
                    }
                </div>
            </div>
        )
    }
}
export default NavBar
