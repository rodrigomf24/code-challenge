import React from "react";

export default React.createClass({
    render: function() {
        return (
            <div className="comment row">
                <h4 className="comment-title">{this.props.title}</h4>
                <div className="comment-content">
                    {this.props.children}
                    <br />
                    <strong>By:</strong> {this.props.title}
                </div>
            </div>
        );
    }
})