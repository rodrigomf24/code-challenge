import React from "react";
import CommentList from "./commentList/main"
import CommentForm from "./commentForm/main"

export default React.createClass({
    loadCommentsFromServer:function(add) {
        $.ajax({
            url:this.props.url,
            dataType:'json',
            cache:false,
            success:function(data) {
                data = data.slice(0,5);
                if(add !== void(0)){
                    data.push(add);
                }
                this.setState({data:data, onDataEmptyMessage:''});
            }.bind(this),
            error:function(xhr, status, err){
                this.setState({data:[], onDataEmptyMessage:'ERROR: '+status+'\n'+err.toString()});
            }.bind(this)
        });
    },
    getInitialState:function() {
        return {data:[], onDataEmptyMessage:''};
    },
    componentDidMount:function() {
        this.loadCommentsFromServer();
        if(this.props.pollInterval !== void(0)) {
            setInterval(this.loadCommentsFromServer, this.props.pollInterval);
        }
    },
    handleCommentSubmit:function(comment) {
        this.loadCommentsFromServer({name:'New Comment', email:comment.author, body:comment.text});
    },
    render:function() {
        return (
            <div className="row">
                <div className="commentBox column align-center">
                    <h1>Comments Box <small>Powered by React</small></h1>
                    <hr />
                    <CommentList data={this.state.data} />
                    <p>{this.state.onDataEmptyMessage}</p>
                    <CommentForm onCommentSubmit={this.handleCommentSubmit} />
                </div>
            </div>
        );
    }
});