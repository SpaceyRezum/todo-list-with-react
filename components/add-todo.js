import React from 'react';

var AddTodo = React.createClass({
  render: function() {
    return (
      <div className='row new-todo'>
        <div className='col-md-2'></div>
        <div className='col-md-9'>
          <div className="input-group">
            <input type="text" className="form-control" onChange={ (evt) => this.props.onUpdateField(evt) } value={ this.props.newTodo }/>
            <span className="input-group-btn">
              <button className="btn btn-primary" onClick={ () => this.props.onAddNewTodo() } type="button">Add</button>
            </span>
          </div>
        </div>
      </div>
    )
  }
})
      

export default AddTodo;