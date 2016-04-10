import React from "react";

export default React.createClass({
    getInitialState:function() {
        return {
            id:void(0),
            first_name:void(0),
            last_name:void(0),
            email:void(0),
            age:void(0),
            gender:'m'
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
    handleRemovePersonButtonClick:function(){
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
    handleFirstNameChange:function(value) {
        this.setState({first_name:value});
        this.handleParentUpdate();
    },
    handleLastNameChange:function(value) {
        this.setState({last_name:value});
        this.handleParentUpdate();
    },
    handleEmailChange:function(value) {
        this.setState({email:value});
        this.handleParentUpdate();
    },
    handleAgeChange:function(value) {
        this.setState({age:value});
        this.handleParentUpdate();
    },
    handleGenderChange:function(e) {
        console.log(e.target.value);
        this.setState({gender:e.target.value});
        this.handleParentUpdate();
    },
    render:function() {
        var valueLink = {
            first_name:{
                value: this.state.first_name,
                requestChange: this.handleFirstNameChange
            },
            last_name:{
                value: this.state.last_name,
                requestChange: this.handleLastNameChange
            },
            email:{
                value: this.state.email,
                requestChange: this.handleEmailChange
            },
            age:{
                value: this.state.age,
                requestChange: this.handleAgeChange
            }
        };
        var _this = this;
        var genderNodes = ['m', 'f'].map(function(type, index){
            var checked = (type === _this.state.gender) ? 'checked' : '';
            return (
                <div className="radio-inline" key={index}>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            checked={checked}
                            onChange={_this.handleGenderChange}
                            value={type}
                        /> {type.toUpperCase()}
                    </label>
                </div>
            );
        });
        return (
            <div className="row">
                <div className="col-xs-12">
                    <div className="pull-right">
                        <button type="button" onClick={this.handleRemovePersonButtonClick} className="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    </div>
                    <form className="commentForm">
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
                        <button type="button" onClick={this.handleAdd} className="btn btn-info">Add new</button>
                    </form>
                </div>
            </div>
        );
    }
});