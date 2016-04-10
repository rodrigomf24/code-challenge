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
            console.log(this.props.data.list);
            if(this.props.data.list !== void(0)){
                this.setState({list:this.props.data.list});
            }
        }
    },
    handlePreviousButtonClick:function(){
        if(this.props.onPreviousButtonClick !== void(0) && typeof(this.props.onPreviousButtonClick) === 'function'){
            this.props.onPreviousButtonClick('persons', this.state.list);
        }
    },
    handleNextButtonClick:function() {
        if(this.state.list.length === 0){
            window.alert('You must add at least one person to the household');
        } else {
            if(this.props.onNextButtonClick !== void(0) && typeof(this.props.onNextButtonClick) === 'function'){
                this.props.onNextButtonClick(this.state.list);
            }
        }
    },
    handleAddNewButtonClick:function(addPerson){
        var person = [{
            id:void(0),
            first_name:void(0),
            last_name:void(0),
            email:void(0),
            age:void(0),
            gender:'m'
        }];
        if(typeof(addPerson) === 'object' && 'first_name' in addPerson){
            this.state.list.pop();
            person.splice(0,0,addPerson);
        }
        var list = (this.state.list.length > 0) ? this.state.list.concat(person) : person;
        this.setState({list:list});
    },
    handleRemoveButtonClick:function(index){
        if(this.state.list[index] !== void(0)) {
            this.state.list.splice(index, 1);
            this.setState({list:this.state.list});
        }
    },
    handleOnChildStateChange:function(index, data) {
        this.state.list.splice(index, 1, Object.assign(this.state.list[index], data));
        var list = this.state.list;
        this.setState({list:list});
    },
    handleReturnToList:function() {
        if(this.props.onCloseWizardClick !== void(0) && typeof(this.props.onCloseWizardClick) === 'function') {
            this.props.onCloseWizardClick();
        }
    },
    showClose:function() {
        return (this.props.householdId !== void(0)) ? true : false;
    },
    render:function() {
        var _this = this;
        var peopleList = this.state.list.map(function(person, index){
            return (
                <PersonForm key={index} position={index} data={person} onStateChange={_this.handleOnChildStateChange} onRemoveButtonClick={_this.handleRemoveButtonClick} onNewButtonClick={_this.handleAddNewButtonClick} />
            )
        });
        return (
            <div className="row">
                <div className="col-xs-12">
                    { this.showClose() ? <div className="pull-right">
                        <button type="button" onClick={this.handleReturnToList} className="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    </div> : null }
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