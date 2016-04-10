import React from "react";
import HouseholdForm from "./childs/householdForm";
import HouseholdPersonForm from "./childs/householdPersonForm";
import HouseholdVehicleForm from "./childs/householdVehicleForm";
import HouseholdSummary from "./childs/householdSummary";
import HouseholdWizardService from "./../../services/HouseholdWizardService";

export default React.createClass({
    getInitialState:function() {
        return {
            house:{
                address:void(0),
                zip:void(0),
                city:void(0),
                state:void(0),
                bedrooms_number:0,
                id:void(0)
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
                bedrooms_number:0,
                id:void(0)
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
    componentDidMount:function() {
        console.log(this.props);
        if(this.props.householdId !== void(0)) {
            var _this = this;
            this.setState({showHouseholdForm:false});
            HouseholdWizardService.get.household.single(this.props.householdId).then(function(response) {
                if(typeof(response) === 'object') {
                    console.log(response[0]);
                    _this.setState({
                        house:{
                            address:response[0].address,
                            zip:response[0].zip,
                            city:response[0].city,
                            state:response[0].state,
                            bedrooms_number:response[0].bedrooms_number,
                            id:response[0].id
                        },
                        showHouseholdForm:true
                    });
                }
            });
        }
    },
    upsertPersons:function(data, callback, skipVehicles) {
        var _this = this;
        HouseholdWizardService.upsert.persons(data, this.state.house.id).then(function(response) {
            console.log('PERSON',response, response[0]);
            if(Array.isArray(response)) {
                data = response;
            }
            if(skipVehicles === void(0)){
                HouseholdWizardService.get.vehicles(_this.state.house.id).then(function(response) {
                    if(Array.isArray(response) && response.length > 0) {
                        callback(data, response);
                    }
                }, function(err) {
                    callback(data, []);
                });
            } else {
                callback(data);
            }
        }, function(error) {
            callback(data);
        });
    },
    upsertVehicles:function(data, callback) {
        HouseholdWizardService.upsert.vehicles(data, this.state.house.id).then(function(response) {
            console.log('VEHICLE',response, response[0]);
            if(Array.isArray(response)) {
                data = response;
            }
            callback(data);
        }, function(error) {
            callback(data);
        });
    },
    handlePrevious:function(current, data){
        console.log('PREVIOUS', current, data);
        var _this = this;
        switch(current){
            case 'persons':
                this.upsertPersons(data, function(data) {
                    _this.setState({persons:{list:data}, showHouseholdForm:true, showPersonForm:false, showVehicleForm:false, showSummary:false});
                }, true);
                break;
            case 'vehicles':
                this.upsertVehicles(data, function(data) {
                    _this.setState({vehicles:{list:data}, showHouseholdForm:false, showPersonForm:true, showVehicleForm:false, showSummary:false});
                });
                break;
            case 'summary':
                this.setState({showHouseholdForm:false, showPersonForm:false, showVehicleForm:true, showSummary:false});
                break;
            default:
                break;
        }
    },
    showPersonsForm:function(data, persons) {
        var newState = {
            house:data,
            showHouseholdForm:false,
            showPersonForm:true,
            showVehicleForm:false,
            showSummary:false
        };
        if(persons !== void(0)) {
            newState.persons = {list:persons};
        }
        this.setState(newState);
    },
    handleHouseholdFormSubmit:function(data) {
        // do post here
        console.log('House',data);
        var _this = this, action = (data.id !== void(0)) ? 'put' : 'post';
        HouseholdWizardService[action].household(data).then(function(response) {
            console.log(response, data);
            if(typeof(response) === 'object') {
                data = Object.assign(data, response);
            }
            if(action === 'put') {
                HouseholdWizardService.get.persons(data.id).then(function(response) {
                    if(Array.isArray(response) && response.length > 0) {
                        _this.showPersonsForm(data, response);
                    }
                }, function(err) {
                    _this.showPersonsForm(data, []);
                });
            } else {
                _this.showPersonsForm(data);
            }
        }, function() {
            _this.showPersonsForm(data);
        });
    },
    showVehiclesForm:function(data, vehicles) {
        var newState = {
            persons:{list:data},
            showHouseholdForm:false,
            showPersonForm:false,
            showVehicleForm:true,
            showSummary:false
        };
        if(vehicles !== void(0)) {
            newState.vehicles = {list:vehicles};
        }
        this.setState(newState);
    },
    handleHouseholdPersonFormSubmit:function(data) {
        // do post here
        console.log('Person',data);
        this.upsertPersons(data, this.showVehiclesForm);
    },
    showSummary:function(data) {
        this.setState({
            vehicles:{list:data},
            showHouseholdForm:false,
            showPersonForm:false,
            showVehicleForm:false,
            showSummary:true
        });
    },
    handleHouseholdVehicleFormSubmit:function(data) {
        // do post here
        console.log('Vehicle',data);
        this.upsertVehicles(data, this.showSummary);
    },
    handleFinish:function(doSave) {
        this.handleCloseWizard();
    },
    handleCloseWizard:function() {
        this.resetState();
        if(this.props.onClose !== void(0) && typeof(this.props.onClose) === 'function') {
            this.props.onClose();
        }
    },
    render:function() {
        return (
            <div className="col-xs-12">
                <div className="row">
                    { this.state.showHouseholdForm ? <HouseholdForm householdId={this.state.house.id} onCloseWizardClick={this.handleCloseWizard} data={this.state.house} onFormSubmit={this.handleHouseholdFormSubmit} /> : null}
                    { this.state.showPersonForm ? <HouseholdPersonForm householdId={this.state.house.id} onCloseWizardClick={this.handleCloseWizard} data={this.state.persons} onNextButtonClick={this.handleHouseholdPersonFormSubmit} onPreviousButtonClick={this.handlePrevious} /> : null}
                    { this.state.showVehicleForm ? <HouseholdVehicleForm householdId={this.state.house.id} onCloseWizardClick={this.handleCloseWizard} data={this.state.vehicles} persons={this.state.persons} onNextButtonClick={this.handleHouseholdVehicleFormSubmit} onPreviousButtonClick={this.handlePrevious} /> : null}
                    { this.state.showSummary ? <HouseholdSummary data={this.state} onPreviousButtonClick={this.handlePrevious} onFinishButtonClick={this.handleFinish} /> : null }
                </div>
            </div>
        );
    }
});