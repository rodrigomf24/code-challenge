import React from "react";

export default React.createClass({
    getInitialState:function() {
        return {author: '', text:''};
    },
    handleAuthorChange:function(newValue) {
        this.setState({author:newValue});
    },
    handleTextChange:function(newValue) {
        this.setState({text:newValue});
    },
    handleSubmit:function(e) {
        e.preventDefault();
        var author = this.state.author.trim();
        var text = this.state.text.trim();
        if(!text || !author) {
            return;
        }
        this.props.onCommentSubmit({author:author, text:text});
        this.setState({author:'', text:''});
    },
    render:function() {
        var valueLink = {
            author:{
                value: this.state.author,
                requestChange: this.handleAuthorChange
            },
            text:{
                value: this.state.text,
                requestChange: this.handleTextChange
            }
        };
        return (
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <input 
                    type="text"
                    placeholder="Your name"
                    valueLink={valueLink.author}
                />
                <input 
                    type="text"
                    placeholder="Say something..."
                    valueLink={valueLink.text}
                />
                <button type="submit" className="small expanded success button">Post</button>
            </form>
        );
    }
});