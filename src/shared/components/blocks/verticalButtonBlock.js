import React, {Component} from 'react'
import '../../css/buttons.css'
import Button from '../button/buttons'
import '../../css/blocks.css'

class VerticalButtonBlock extends Component {
    constructor(props){
        super(props)
        this.state={
            filtered_beaches:[],
        }
    }
    componentDidMount(){
        this._isMounted = true
    }
    componentWillUnmount(){
        this._isMounted = false
    }
    render(){
        const available = this.props.choices.filter(obj => !this.props.selected.includes(obj))
        return (
                <>
                    <div className="vertical-block">
                        <h6>Available</h6>
                        {
                            available.map(obj => (
                                <Button key={obj.id} buttonclass={this.props.buttonclass} value={obj.id} label={obj.name} callback={this.props.addGroup} />
                            ))
                        }
                    </div>
                    <div className="vertical-block">
                        <h6> Selected </h6>
                        {
                            this.props.selected.length ? (
                                this.props.selected.map(obj =>
                                    (<Button key={obj.id} buttonclass={this.props.buttonclass} value={obj.id} label={obj.name} callback={this.props.dropGroup} />)
                                )
                            ):<div className="">No groups selected</div>
                        }
                    </div>
                </>

        )
    }
}

export default VerticalButtonBlock
