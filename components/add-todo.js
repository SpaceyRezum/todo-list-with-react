import React from 'react';

var AddTodo = React.createClass({
  getInitialState: function() {
    return {newTodo: ''}
  },

  render: function() {
    return (
      <div className='row new-todo'>
        <div className='col-md-2'></div>
        <div className='col-md-9'>
          <div className="input-group">
            <input type="text" className="form-control" onChange={ (evt) => this.updateField(evt.target.value) } value={ this.state.newTodo }/>
            <span className="input-group-btn">
              <button className="btn btn-primary" onClick={ () => this.props.onAddNewTodo(this.state.newTodo) } type="button">Add</button>
            </span>
          </div>
        </div>
      </div>
    )
  },

  updateField: function(newValue) {
    this.setState({ newTodo: newValue });
  }
})
      

export default AddTodo;