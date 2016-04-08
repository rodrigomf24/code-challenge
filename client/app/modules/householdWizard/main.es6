import React from "react";
import HouseholdForm from "./childs/householdForm"
import HouseholdPersonForm from "./childs/householdPersonForm"
import HouseholdVehicleForm from "./childs/householdVehicleForm"

export default React.createClass({
    getInitialState:function() {
        return {household:{
            info:{
                address:void(0),
                zip:void(0),
                city:void(0),
                state:void(0),
                bedrooms_number:0
            },
            people:[],
            vehicles:[]
        }};
    },
    componentDidMount:function() {},
    handleHouseholdFormSubmit:function(data) {
        // do post here
        console.log('FROM WIZARD',data);
    },
    handleHouseholdPersonFormSubmit:function(data) {
        // do post here
        console.log('FROM WIZARD',data);
    },
    handleHouseholdVehicleFormSubmit:function(data) {
        // do post here
    },
    render:function() {
        return (
            <div className="col-xs-12">
                <div className="row">
                    <HouseholdForm data={this.state.household.info} onFormSubmit={this.handleHouseholdFormSubmit} />
                </div>
            </div>
        );
    }
});