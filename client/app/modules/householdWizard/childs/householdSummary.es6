import React from "react";

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
            }
        };
    },
    componentDidMount:function() {
        if(this.props.data !== void(0)){
            this.setState(Object.assign(this.state, this.props.data));
        }
    },
    handlePreviousButtonClick:function() {
        if(this.props.onPreviousButtonClick !== void(0) && typeof(this.props.onPreviousButtonClick) === 'function'){
            this.props.onPreviousButtonClick('summary');
        }
    },
    handleFinishButtonClick:function() {
        if(this.props.onFinishButtonClick !== void(0) && typeof(this.props.onFinishButtonClick) === 'function'){
            this.props.onFinishButtonClick();
        }
    },
    render:function() {
        var _this = this;
        var householdPersons = this.state.persons.list.map(function(person, id) {
            return (
                <ul key={id} >
                    <li>First Name: {person.first_name}</li>
                    <li>Last Name: {person.last_name}</li>
                    <li>Email: {person.email}</li>
                    <li>Age: {person.age}</li>
                    <li>Gender: {person.gender}</li>
                </ul>
            )
        }),
        owners = this.state.persons.list.reduce(function(acc, curr) {
            if(!(curr.id in acc)){
                acc[curr.id] = curr;
            }
            return acc;
        }, {}),
        householdVehicles = this.state.vehicles.list.map(function(vehicle, id) {
            console.log(owners);
            var owner = (vehicle.owner in owners) ? owners[vehicle.owner].first_name +' '+ owners[vehicle.owner].last_name : '';
            return (
                <ul key={id} >
                    <li>Make: {vehicle.make}</li>
                    <li>Model: {vehicle.model}</li>
                    <li>Year: {vehicle.year}</li>
                    <li>License Plate: {vehicle.license_plate}</li>
                    <li>Owner: {owner}</li>
                </ul>
            )
        });
        return (
            <div className="row">
                <div className="col-xs-12">
                    <div className="page-header">
                        <h1>Household Wizard <small>summary</small></h1>
                    </div>
                    <div>
                        <ul>
                            <li>
                                Main Information
                                <ul>
                                    <li>Address: {this.state.house.address}</li>
                                    <li>Zip: {this.state.house.zip}</li>
                                    <li>City: {this.state.house.city}</li>
                                    <li>State: {this.state.house.state}</li>
                                    <li>Number of Bedrooms: {this.state.house.bedrooms_number}</li>
                                </ul>
                            </li>
                            <li>
                                Household Persons
                                {householdPersons}
                            </li>
                            <li>
                                Household Vehicles
                                {householdVehicles}
                            </li>
                        </ul>
                        <nav>
                            <ul className="pager">
                                <li>
                                    <button type="button" onClick={this.handlePreviousButtonClick} className="btn btn-info">Previous</button>
                                    <button type="button" onClick={this.handleFinishButtonClick} className="btn btn-success">Close</button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        );
    }
});