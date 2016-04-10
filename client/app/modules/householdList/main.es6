import React from "react";
import HouseholdWizardService from "./../../services/HouseholdWizardService";

export default React.createClass({
    getInitialState:function() {
        return {
            list:[]
        };
    },
    resetState:function() {
        this.setState({
            list:[]
        });
    },
    pullHouseholdForms:function() {
        var _this = this;
        HouseholdWizardService.get.household.all().then(function(response) {
            if(typeof(response) === 'object') {
                _this.setState({list:response});
            }
        });
    },
    componentDidMount:function() {
        this.pullHouseholdForms();
    },
    handleHouseholdClick:function(e) {
        if(this.props.onHouseholdClick !== void(0) && typeof(this.props.onHouseholdClick) === 'function') {
            this.props.onHouseholdClick($(e.currentTarget)[0].id);
        }
    },
    handleNewFormButtonClick:function() {
        if(this.props.onNewClick !== void(0) && typeof(this.props.onNewClick) === 'function') {
            this.props.onNewClick();
        }
    },
    render:function() {
        var _this = this,
        households = this.state.list.map(function(house, index) {
            return (
                <tr key={index}>
                    <td>{house.address}</td>
                    <td>{house.zip}</td>
                    <td>{house.city}</td>
                    <td>{house.state}</td>
                    <td>{house.bedrooms_number}</td>
                    <td></td>
                    <td></td>
                    <td>
                        <a className="btn btn-default" role="button" id={house.id} onClick={_this.handleHouseholdClick}>Edit</a>
                        <a className="btn btn-default" role="button">Remove</a>
                    </td>
                </tr>
            );
        });
        return (
            <div className="col-xs-12">
                <div className="row">
                    <a className="btn btn-info" role="button" onClick={_this.handleNewFormButtonClick}>New</a>
                </div>
                <div className="row">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Address</th>
                                <th>Zip Code</th>
                                <th>City</th>
                                <th>State</th>
                                <th>Bedrooms</th>
                                <th>Persons</th>
                                <th>Vehicles</th>
                            </tr>
                        </thead>
                        <tbody>
                            {households}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
});