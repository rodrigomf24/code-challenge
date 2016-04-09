import React from "react";
import HouseholdWizard from "./householdWizard/main";
import HouseholdList from "./householdList/main";

export default React.createClass({
    getInitialState:function() {
        return {
            showList:true,
            showForm:false,
            householdId:void(0)
        };
    },
    resetState:function() {
        this.setState({
            showList:true,
            showForm:false,
            householdId:void(0)
        });
    },
    componentDidMount:function() {},
    handleOnHouseholdClick:function(id) {
        console.log(id);
        this.setState({showList:false, showForm:true, householdId:id});
    },
    render:function() {
        return (
            <div>
                { this.state.showList ? <HouseholdList onHouseholdClick={this.handleOnHouseholdClick} /> : null }
                { this.state.showForm ? <HouseholdWizard householdId={this.state.householdId} /> : null }
            </div>
        );
    }
});