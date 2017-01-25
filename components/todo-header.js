import React from 'react';

var TodoHeader = React.createClass({
	render: function() {
		return (
			<header className='todo-header'>
        		{ this.props.incompleteTodos.length > 0 ? (
	          	this.props.incompleteTodos.length + " Things to Do" ):( 
	          	"You are out of stuff to do, yay!")}
	      	</header>
	    )
	}
})

export default TodoHeader;