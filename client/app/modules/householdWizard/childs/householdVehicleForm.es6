import React from "react";
import VehicleForm from "./vehicleForm";

export default React.createClass({
    getInitialState:function() {
        return {
            list:[]
        };
    },
    componentDidMount:function() {
        if(this.props.data !== void(0)){
            this.setState({list:this.props.data.list});
        }
    },
    handlePreviousButtonClick:function() {
        console.log('PREV CLICK',this.state.list);
        if(this.props.onPreviousButtonClick !== void(0) && typeof(this.props.onPreviousButtonClick) === 'function'){
            this.props.onPreviousButtonClick('vehicles', this.state.list);
        }
    },
    handleNextButtonClick:function() {
        if(this.props.onNextButtonClick !== void(0) && typeof(this.props.onNextButtonClick) === 'function'){
            this.props.onNextButtonClick(this.state.list);
        }
    },
    handleAddNewButtonClick:function(addVehicle) {
        var vehicle = [{
            make:void(0),
            model:void(0),
            year:void(0),
            license_plate:void(0),
            owner:void(0)
        }];
        if(typeof(addVehicle) === 'object' && 'make' in addVehicle){
            this.state.list.pop();
            vehicle.splice(0,0,addVehicle);
        }
        var list = (this.state.list.length > 0) ? this.state.list.concat(vehicle) : vehicle;
        this.setState({list:list});
    },
    handleRemoveButtonClick:function(index) {
        console.log(index, this.state.list);
        if(this.state.list[index] !== void(0)) {
            this.state.list.splice(index, 1);
            this.setState({list:this.state.list});
        }
    },
    handleOnChildStateChange:function(index, data) {
        console.log(index, data);
        this.state.list.splice(index, 1, Object.assign(this.state.list[index], data));
        var list = this.state.list;
        console.log(list);
        this.setState({list:list});
    },
    render:function() {
        var _this = this,
        persons = (this.props.persons !== void(0)) ? this.props.persons : [],
        vehiclesList = this.state.list.map(function(vehicle, index){
            console.log(persons);
            return (
                <VehicleForm key={index} persons={persons} position={index} data={vehicle} onStateChange={_this.handleOnChildStateChange} onRemoveButtonClick={_this.handleRemoveButtonClick} onNewButtonClick={_this.handleAddNewButtonClick} />
            )
        });
        return (
            <div className="row">
                <div className="col-xs-12">
                    <div className="page-header">
                        <h1>Household Wizard <small>household vehicle information</small></h1>
                    </div>
                    <div>
                        { this.state.list.length === 0 ? <button type="button" className="btn btn-default btn-block" onClick={this.handleAddNewButtonClick}>Add new</button> : null}
                        <div className="vehicle-list">
                            {vehiclesList}
                        </div>
                        <nav>
                            <ul className="pager">
                                <li>
                                    <button type="button" onClick={this.handlePreviousButtonClick} className="btn btn-info">Previous</button>
                                    <button type="button" onClick={this.handleNextButtonClick} className="btn btn-info">Next</button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        );
    }
});