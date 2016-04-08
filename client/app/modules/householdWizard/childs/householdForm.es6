import React from "react";

export default React.createClass({
    getInitialState:function() {
        return {
            address:void(0),
            zip:void(0),
            city:void(0),
            state:void(0),
            bedrooms_number:void(0),
            alerts:[]
        };
    },
    resetState:function(){
        this.setState({
            address:void(0),
            zip:void(0),
            city:void(0),
            state:void(0),
            bedrooms_number:void(0),
            alerts:[]
        });
    },
    componentDidMount:function() {
        if(this.props.data !== void(0)){
            this.setState(Object.assign(this.state, this.props.data));
        }
    },
    handleSubmit:function(e) {
        e.preventDefault();
        var emptyFields = false, count=0, form=Object.assign({},this.state);
        delete form.alerts;
        console.log(form);
        Object.keys(form).map(function(key){
            console.log(form[key], key);
            if(form[key] === void(0) || form[key] === null || form[key] === ''){
                emptyFields = true;
            }
            count++;
        });
        if(count === Object.keys(form).length){
            if(emptyFields === true){
                window.alert('You must fill all the form fields');
            } else {
                if(this.props.onFormSubmit !== void(0) && typeof(this.props.onFormSubmit) === 'function'){
                    // this.resetState();
                    this.props.onFormSubmit(form);
                }
            }
        }
    },
    getAlertsHtml:function(){
        var alertClass;
        var alerts = this.state.alerts.map(function(alert) {
            alertClass = (alert.type !== void(0)) ? 'alert alert-dismissible '+alert.type : 'alert alert-dismissible';
            return (
                <div key={alert.id} className={alertClass} role="alert">
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    {alert.message}
                </div>
            );
        });
        return {__html: alerts}
    },
    handleAddressChange:function(value) {
        this.setState({address:value});
    },
    handleZipChange:function(value) {
        this.setState({zip:value});
    },
    handleCityChange:function(value) {
        this.setState({city:value});
    },
    handleStateChange:function(value) {
        this.setState({state:value});
    },
    handleBedroomsNumberChange:function(value) {
        this.setState({bedrooms_number:(value > 0) ? value : 0});
    },
    render:function() {
        var valueLink = {
            address:{
                value: this.state.address,
                requestChange: this.handleAddressChange
            },
            zip:{
                value: this.state.zip,
                requestChange: this.handleZipChange
            },
            city:{
                value: this.state.city,
                requestChange: this.handleCityChange
            },
            state:{
                value: this.state.state,
                requestChange: this.handleStateChange
            },
            bedrooms_number:{
                value: this.state.bedrooms_number,
                requestChange: this.handleBedroomsNumberChange
            }
        };
        return (
            <div className="row">
                <div className="col-xs-12">
                    <div className="alerts" dangerouslySetInnerHTML={this.getAlertsHtml()}></div>
                    <div className="page-header">
                        <h1>Household Wizard <small>household information</small></h1>
                    </div>
                    <form className="commentForm" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <input
                                id="address"
                                className="form-control"
                                type="text"
                                placeholder="P Sherman, 42 Wallaby Way"
                                valueLink={valueLink.address}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="zip">Zip Code</label>
                            <input
                                id="zip"
                                type="text"
                                className="form-control"
                                placeholder="zipcode"
                                valueLink={valueLink.zip}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="city">City</label>
                            <input
                                id="city"
                                type="text"
                                className="form-control"
                                placeholder="city"
                                valueLink={valueLink.city}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="state">State</label>
                            <input
                                id="state"
                                type="text"
                                className="form-control"
                                placeholder="state"
                                valueLink={valueLink.state}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="bedrooms">Number of Bedrooms</label>
                            <input
                                id="bedrooms"
                                type="number"
                                min="0"
                                placeholder="0"
                                className="form-control"
                                valueLink={valueLink.bedrooms_number}
                            />
                        </div>
                        <nav>
                            <ul className="pager">
                                <li>
                                    <button type="submit" className="btn btn-info">Next</button>
                                </li>
                            </ul>
                        </nav>
                    </form>
                </div>
            </div>
        );
    }
});