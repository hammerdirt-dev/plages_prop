import React, {Component} from 'react'
import '../../shared/css/grids.css'
import '../../shared/css/main.css'
import '../../shared/css/blocks.css'
import Button from '../../shared/components/button/buttons'


class ServerReplyModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            seeModal:false,
        }
    }
    componentDidMount(){
        this._isMounted = true
    }
    componentDidUpdate(prevProps, prevState){
        console.log("surveys received some new props")
    }
    componentWillUnmount() {
        this._isMounted = false
    }
    render(){
        const dimsResponse = () => {
            if(this.props.dimsDataResponse && this.props.dimsDataResponse.ok){
                var message = "Dimensional data saved to server"

            }else if(this.props.dimsDataResponse && !this.props.dimsDataResponse.ok){
                message = "Request refused. Are you logged in ?"
            }else{
                message = "Waiting for the reply from the server..."
            }
            return message
        }
        const surveyResponse = () => {
            if(this.props.surveyDataResponse && this.props.surveyDataResponse.ok){
                var message = "Survey data saved to server"
            }else if(this.props.surveyDataResponse && !this.props.surveyDataResponse.ok){
                message = "Request refused. Are you logged in ?"
            }else if(this.props.postToLocal){
                message = this.props.postToLocal
            }
            return message
        }
        const saveForLater = () => {
            if(this.props.surveyDataResponse && this.props.dimsDataResponse){
                if(!this.props.surveyDataResponse.ok || !this.props.dimsDataResponse.ok){
                    return (

                            <p>
                                If logging in doesn't help, save to local and contact admin.
                            </p>
                        )
                    }
                }
            }
        return(

            <div className="modal-column-full-width pad-one-rem">
                <div className="pad-one-rem border-all-gray">
                    <h6 className="no-wrap">
                        Processing the request...
                    </h6>
                </div>
                <p>
                <strong>Dimensional data: &nbsp;</strong>
                {
                    dimsResponse()
                }
                </p>
                <p>
                <strong>Survey data: &nbsp;</strong>
                {
                    surveyResponse()
                }
                </p>
                {
                    saveForLater()
                }
                <div className="submit-div">
                    <Button
                        buttonclass="formButton"
                        id="seeMe"
                        value="seeMe"
                        callback={this.props.callback}
                        label="Close"
                    />

                </div>
            </div>
        )
    }

}

export default ServerReplyModal
