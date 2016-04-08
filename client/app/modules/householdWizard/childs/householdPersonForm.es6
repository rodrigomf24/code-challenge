import React from "react";
import PersonForm from "./personForm";

export default React.createClass({
    getInitialState:function() {
        return {
            list:[]
        };
    },
    componentDidMount:function() {
        if(this.props.data !== void(0)){
            this.setState(Object.assign(this.state, this.props.data));
        }
    },
    handlePreviousButtonClick:function(){
        if(this.props.onPreviousButtonClick !== void(0) && typeof(this.props.onPreviousButtonClick) === 'function'){
            this.props.onPreviousButtonClick('persons', this.state.list);
        }
    },
    handleNextButtonClick:function() {
        var emptyFields = false, count=0, form=this.state;
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
                if(this.props.onNextButtonClick !== void(0) && typeof(this.props.onNextButtonClick) === 'function'){
                    this.props.onNextButtonClick(form);
                }
            }
        }
    },
    handleAddNewButtonClick:function(){
        var person = [{
            first_name:void(0),
            last_name:void(0),
            email:void(0),
            age:void(0),
            gender:'m'
        }];
        var list = (this.state.list.length > 0) ? this.state.list.concat(person) : person;
        this.setState({list:list});
    },
    handleRemoveButtonClick:function(person){
        if(this.state.list.indexOf(person) !== -1) {
            this.state.list.splice(this.state.list.indexOf(person), 1);
            this.setState({list:this.state.list});
        }
    },
    render:function() {
        var _this = this;
        var peopleList = this.state.list.map(function(person, index){
            return (
                <PersonForm key={index} data={person} onRemoveButtonClick={_this.handleRemoveButtonClick} onNewButtonClick={_this.handleAddNewButtonClick} />
            )
        });
        return (
            <div className="row">
                <div className="col-xs-12">
                    <div className="page-header">
                        <h1>Household Wizard <small>household people information</small></h1>
                    </div>
                    <div>
                        { this.state.list.length === 0 ? <button type="button" className="btn btn-default btn-block" onClick={this.handleAddNewButtonClick}>Add new</button> : null}
                        <div className="people-list">
                            {peopleList}
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