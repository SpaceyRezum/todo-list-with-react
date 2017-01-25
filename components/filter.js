import React from 'react';

var Filter = React.createClass({
	render: function() {
		return (
			<div className="filter">
		  		<button className="btn btn-primary filter" onClick={ () => this.props.onToggleFilter() }>
		    		{ this.props.showComplete ? "Filter Completed To-Dos" : "Clear Filter" }
		  		</button>
			</div>
		)
	}
})

export default Filter;