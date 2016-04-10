import React from "react";

export default React.createClass({
    getInitialState:function() {
        return {
            make:void(0),
            model:void(0),
            year:void(0),
            license_plate:void(0),
            owner:void(0)
        };
    },
    componentDidMount:function() {
        if(this.props.data !== void(0)){
            this.setState(Object.assign(this.state, this.props.data));
        }
    },
    fieldsAreEmpty:function(){
        var emptyFields = false, count=0, form=this.state;
        return new Promise(function(resolve, reject){
            Object.keys(form).map(function(key){
                if(form[key] === void(0) || form[key] === null || form[key] === ''){
                    emptyFields = true;
                }
                count++;
            });
            if(count === Object.keys(form).length){
                if(emptyFields === true){
                    resolve(true);
                } else {
                    resolve(false);
                }
            }
        });
    },
    handleAdd:function() {
        var _this = this;
        this.fieldsAreEmpty().then(function(response){
            if(response){
                window.alert('You must fill all the form fields');
            } else {
                if(_this.props.onNewButtonClick !== void(0) && typeof(_this.props.onNewButtonClick) === 'function'){
                    _this.props.onNewButtonClick(_this.state);
                }
            }
        });
    },
    handleRemoveButtonClick:function() {
        if(this.props.onRemoveButtonClick !== void(0) && typeof(this.props.onRemoveButtonClick) === 'function'){
            this.props.onRemoveButtonClick(this.props.position);
        }
    },
    handleParentUpdate:function() {
        var _this = this;
        setTimeout(function(){
            if(_this.props.onStateChange !== void(0) && typeof(_this.props.onStateChange) === 'function') {
                _this.props.onStateChange(_this.props.position, _this.state);
            }
        }, 150);
    },
    handleMakeChange:function(value) {
        this.setState({make:value});
        this.handleParentUpdate();
    },
    handleModelChange:function(value) {
        this.setState({model:value});
        this.handleParentUpdate();
    },
    handleYearChange:function(value) {
        this.setState({year:value});
        this.handleParentUpdate();
    },
    handleLicensePlateChange:function(value) {
        this.setState({license_plate:value});
        this.handleParentUpdate();
    },
    handleOwnerChange:function(e) {
        this.setState({owner:e.target.value});
        this.handleParentUpdate();
    },
    render:function() {
        var valueLink = {
            make:{
                value: this.state.make,
                requestChange: this.handleMakeChange
            },
            model:{
                value: this.state.model,
                requestChange: this.handleModelChange
            },
            year:{
                value: this.state.year,
                requestChange: this.handleYearChange
            },
            license_plate:{
                value: this.state.license_plate,
                requestChange: this.handleLicensePlateChange
            }
        },
        persons = (this.props.persons !== void(0) && this.props.persons.list.length > 0) ? this.props.persons.list.map(function(person, index){
            return (
                <option key={index} value={person.id}>{person.first_name} {person.last_name}</option>
            );
        }) : null;
        return (
            <div className="row">
                <div className="col-xs-12">
                    <div className="pull-right">
                        <button type="button" onClick={this.handleRemoveButtonClick} className="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    </div>
                    <form className="commentForm">
                        <div className="form-group">
                            <label htmlFor="make">Make</label>
                            <input
                                id="make"
                                className="form-control"
                                type="text"
                                placeholder="Bmw"
                                valueLink={valueLink.make}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="model">Model</label>
                            <input
                                id="model"
                                type="text"
                                className="form-control"
                                placeholder="318is"
                                valueLink={valueLink.model}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="year">Year</label>
                            <input
                                id="year"
                                type="text"
                                className="form-control"
                                placeholder="1989"
                                valueLink={valueLink.year}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="license_plate">License Plate</label>
                            <input
                                id="license_plate"
                                type="text"
                                min="0"
                                className="form-control"
                                placeholder="vehicle license plate"
                                valueLink={valueLink.license_plate}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="owner">Owner</label>
                            <select
                                id="owner"
                                className="form-control"
                                onChange={this.handleOwnerChange}
                                value={this.state.owner}>
                                <option value=""></option>
                                {persons}
                            </select>
                        </div>
                        <button type="button" onClick={this.handleAdd} className="btn btn-info">Add new</button>
                    </form>
                </div>
            </div>
        );
    }
});