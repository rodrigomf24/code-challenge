import React from "react";

export default React.createClass({
    getInitialState:function() {
        return {form:{
            address:void(0),
            zip:void(0),
            city:void(0),
            state:void(0),
            bedrooms_number:0
        }};
    },
    componentDidMount:function() {
        if(this.props.data !== void(0)){
            this.state.form = Object.assign(this.state.form, this.props.data);
        }
    },
    handleFormSubmit:function() {
        if(this.props.onFormSubmit !== void(0) && typeof(this.props.onFormSubmit) === 'function'){
            this.props.onFormSubmit(this.state.form);
        }
    },
    render:function() {
        return (
            <div className="row">
                <div className="col-xs-12">
                    <h1>Household vehicle form</h1>
                    
                </div>
            </div>
        );
    }
});