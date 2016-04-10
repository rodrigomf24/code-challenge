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
        this.setState({showList:false, showForm:true, householdId:id});
    },
    handleOnClose:function() {
        this.setState({showList:true, showForm:false, householdId:void(0)});
    },
    handleOnNewClick:function() {
        this.setState({showList:false, showForm:true, householdId:void(0)});
    },
    render:function() {
        return (
            <div>
                { this.state.showList ? <HouseholdList onNewClick={this.handleOnNewClick} onClose={this.handleOnClose} onHouseholdClick={this.handleOnHouseholdClick} /> : null }
                { this.state.showForm ? <HouseholdWizard onClose={this.handleOnClose} householdId={this.state.householdId} /> : null }
            </div>
        );
    }
});