import React, {Component} from 'react'
import {
    thousandsSeparators
} from '../../shared/utilities/jsHelper/helperMethods'

class SummaryTable  extends Component{
    componentDidMount(){
        this._isMounted = true
        console.log("Summary table fired")
    }
    componentWillUnmount() {
        this._isMounted = false
    }
    render(){
        return(

                <div className="table-div">
                    <div className="t-row-header-label">
                        Summary: {this.props.selectedLocation}
                    </div>
                    <div className="t-row-row">
                        <div className="t-row-label">
                            Number of locations
                        </div>
                        <div className="t-row-quantity">
                            {this.props.dataSummary.locations}
                        </div>
                    </div>
                    <div className="t-row-row">
                        <div className="t-row-label">
                            first sample
                        </div>
                        <div className="t-row-quantity">
                            {this.props.dataSummary.firstSample}
                        </div>
                    </div>
                    <div className="t-row-row">
                        <div className="t-row-label">
                            last sample
                        </div>
                        <div className="t-row-quantity">
                            {this.props.dataSummary.lastSample}
                        </div>
                    </div>
                    <div className="t-row-row">
                        <div className="t-row-label">
                            number of samples
                        </div>
                        <div className="t-row-quantity">
                            {this.props.dataSummary.noOfSamples}
                        </div>
                    </div>
                    <div className="t-row-row">
                        <div className="t-row-label">
                            total pieces removed
                        </div>
                        <div className="t-row-quantity">
                            {thousandsSeparators(this.props.dataSummary.totalPieces)}
                        </div>
                    </div>
                    <div className="t-row-row">
                        <div className="t-row-label">
                            number of categories
                        </div>
                        <div className="t-row-quantity">
                            {this.props.dataSummary.categories}
                        </div>
                    </div>
                    <div className="t-row-row">
                        <div className="t-row-label">
                            median pcs/m
                        </div>
                        <div className="t-row-quantity">
                            {this.props.dataSummary.median}
                        </div>
                    </div>
                    <div className="t-row-row">
                        <div className="t-row-label">
                            max pcs/m
                        </div>
                        <div className="t-row-quantity">
                            {this.props.dataSummary.max}
                        </div>
                    </div>
                    <div className="t-row-row">
                        <div className="t-row-label">
                            min pcs/m
                        </div>
                        <div className="t-row-quantity">
                            {this.props.dataSummary.min}
                        </div>
                    </div>
                </div>
        )
    }
}
export default SummaryTable
