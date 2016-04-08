import React from "react";
import Comment from "./../comment/main";

export default React.createClass({
    render:function() {
        console.log(this.props.data);
        var commentNodes = this.props.data.map(function(comment){
            return (
                <Comment title={comment.name} author={comment.email} key={comment.id}>
                    {comment.body}
                </Comment>
            )
        });
        return (
            <div className="commentList row">
                <div className="column">
                    {commentNodes}
                </div>
            </div>
        );
    }
});