import React from "react";

export default React.createClass({
    getInitialState:function() {
        return {form:{
            first_name:void(0),
            last_name:void(0),
            email:void(0),
            age:void(0),
            gender:void(0)
        }};
    },
    componentDidMount:function() {
        if(this.props.data !== void(0)){
            this.state.form = Object.assign(this.state.form, this.props.data);
        }
    },
    handleSubmit:function(e) {
        e.preventDefault();
        var emptyFields = false, count=0, form=this.state.form;
        console.log(this.state.form);
        Object.keys(form).map(function(key){
            console.log(form[key], key);
            if(form[key] === void(0) || form[key] === null || form[key] === ''){
                emptyFields = true;
            }
            count++;
        });
        if(count === Object.keys(this.state.form).length){
            if(emptyFields === true){
                window.alert('You must fill all the form fields');
            } else {
                if(this.props.onFormSubmit !== void(0) && typeof(this.props.onFormSubmit) === 'function'){
                    this.props.onFormSubmit(form);
                }
            }
        }
    },
    handleFirstNameChange:function(value) {
        this.state.form.first_name = value;
    },
    handleLastNameChange:function(value) {
        this.state.form.last_name = value;
    },
    handleEmailChange:function(value) {
        this.state.form.email = value;
    },
    handleAgeChange:function(value) {
        this.state.form.age = value;
    },
    handleGenderChange:function(event) {
        console.log(event);
        // this.state.form.bedrooms_number = (value > 0) ? value : 0;
    },
    render:function() {
        var valueLink = {
            first_name:{
                value: this.state.form.first_name,
                requestChange: this.handleFirstNameChange
            },
            last_name:{
                value: this.state.form.last_name,
                requestChange: this.handleLastNameChange
            },
            email:{
                value: this.state.form.email,
                requestChange: this.handleEmailChange
            },
            age:{
                value: this.state.form.age,
                requestChange: this.handleAgeChange
            }
        };
        var genderNodes = ['m', 'f'].map(function(type){
            var checked = (type === this.state.gender) ? 'checked' : '';
            return (
                <div className="radio-inline">
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            checked={checked}
                            onChange={this.handleGenderChange}
                            value={type}
                        /> Male
                    </label>
                </div>
            );
        }).bind(this);
        return (
            <div className="row">
                <div className="col-xs-12">
                    <div className="page-header">
                        <h1>Household Wizard <small>household information</small></h1>
                    </div>
                    <form className="commentForm" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="first_name">First Name</label>
                            <input
                                id="first_name"
                                className="form-control"
                                type="text"
                                placeholder="John"
                                valueLink={valueLink.first_name}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="last_name">Last Name</label>
                            <input
                                id="last_name"
                                type="text"
                                className="form-control"
                                placeholder="Connor"
                                valueLink={valueLink.last_name}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="email"
                                className="form-control"
                                placeholder="john@sky.net"
                                valueLink={valueLink.email}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="age">Age</label>
                            <input
                                id="age"
                                type="number"
                                min="0"
                                className="form-control"
                                placeholder="18"
                                valueLink={valueLink.age}
                            />
                        </div>
                        <div className="form-group">
                            {genderNodes}
                        </div>
                        <nav>
                            <ul className="pager">
                                <li>
                                    <button type="button" className="btn btn-info">Previous</button>
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