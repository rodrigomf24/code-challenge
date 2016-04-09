import React from "react";
import HouseholdForm from "./childs/householdForm";
import HouseholdPersonForm from "./childs/householdPersonForm";
import HouseholdVehicleForm from "./childs/householdVehicleForm";
import HouseholdSummary from "./childs/householdSummary";

export default React.createClass({
    getInitialState:function() {
        return {
            house:{
                address:void(0),
                zip:void(0),
                city:void(0),
                state:void(0),
                bedrooms_number:0
            },
            persons:{
                list:[]
            },
            vehicles:{
                list:[]
            },
            showHouseholdForm:true,
            showPersonForm:false,
            showVehicleForm:false,
            showSummary:false
        };
    },
    resetState:function() {
        this.setState({
            house:{
                address:void(0),
                zip:void(0),
                city:void(0),
                state:void(0),
                bedrooms_number:0
            },
            persons:{
                list:[]
            },
            vehicles:{
                list:[]
            },
            showHouseholdForm:true,
            showPersonForm:false,
            showVehicleForm:false,
            showSummary:false
        });
    },
    componentDidMount:function() {},
    handlePrevious:function(current, data){
        console.log('PREVIOUS', current, data);
        switch(current){
            case 'persons':
                this.setState({persons:{list:data}, showHouseholdForm:true, showPersonForm:false, showVehicleForm:false, showSummary:false});
                break;
            case 'vehicles':
                this.setState({vehicles:{list:data}, showHouseholdForm:false, showPersonForm:true, showVehicleForm:false, showSummary:false});
                break;
            case 'summary':
                this.setState({showHouseholdForm:false, showPersonForm:false, showVehicleForm:true, showSummary:false});
                break;
            default:
                break;
        }
    },
    handleHouseholdFormSubmit:function(data) {
        // do post here
        console.log('House',data);
        this.setState({house:data, showHouseholdForm:false, showPersonForm:true, showVehicleForm:false, showSummary:false});
    },
    handleHouseholdPersonFormSubmit:function(data) {
        // do post here
        console.log('Person',data);
        this.setState({persons:{list:data}, showHouseholdForm:false, showPersonForm:false, showVehicleForm:true, showSummary:false});
    },
    handleHouseholdVehicleFormSubmit:function(data) {
        // do post here
        console.log('Vehicle',data);
        this.setState({vehicles:{list:data}, showHouseholdForm:false, showPersonForm:false, showVehicleForm:false, showSummary:true});
    },
    handleFinish:function(doSave) {
        if(doSave !== false) {
            // do final post here
        }
        this.resetState();
    },
    render:function() {
        return (
            <div className="col-xs-12">
                <div className="row">
                    { this.state.showHouseholdForm ? <HouseholdForm data={this.state.house} onFormSubmit={this.handleHouseholdFormSubmit} /> : null}
                    { this.state.showPersonForm ? <HouseholdPersonForm data={this.state.persons} onNextButtonClick={this.handleHouseholdPersonFormSubmit} onPreviousButtonClick={this.handlePrevious} /> : null}
                    { this.state.showVehicleForm ? <HouseholdVehicleForm data={this.state.vehicles} persons={this.state.persons} onNextButtonClick={this.handleHouseholdVehicleFormSubmit} onPreviousButtonClick={this.handlePrevious} /> : null}
                    { this.state.showSummary ? <HouseholdSummary data={this.state} onPreviousButtonClick={this.handlePrevious} onFinishButtonClick={this.handleFinish} /> : null }
                </div>
            </div>
        );
    }
});