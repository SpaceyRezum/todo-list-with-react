import React from 'react';

var Todo = React.createClass({
  render: function() {
    var index = this.props.index;
    return (
      <div className={ this.props.todo.completed ? 'row completed' : 'row' } key={ index }>
        <div className='col-md-2 todo-check'>
          <input type='checkbox' 
                 checked={ this.props.todo.completed }
                 onChange= { (evt) => this.props.onChecked() }/>
        </div>
        <div className='col-md-10'>
          <input type='textbox'
                 value={ this.props.todo.name }
                 disabled={ !this.props.todo.edit }
                 className= { this.props.todo.edit ? 'focus' : '' }
                 onChange={ (evt) => this.props.onUpdateText(evt) }/>
          &nbsp;
          <button className='btn glyphicon glyphicon-pencil' 
                  onClick={ (evt) => { this.props.onEditButtonClick(); this.props.onButtonHover(evt); } } 
                  onMouseEnter={ (evt) => this.props.onButtonHover(evt) }
                  onMouseLeave={ (evt) => this.props.onButtonHover(evt) }
                  type='button'>
          </button>
          <button className='btn glyphicon glyphicon-remove' 
                  onClick={ () => this.props.onDeleteButtonClick(index) } 
                  onMouseEnter={ (evt) => this.props.onButtonHover(evt) }
                  onMouseLeave={ (evt) => this.props.onButtonHover(evt) }
                  type="button">
          </button>
        </div> 
      </div>
    )
  }
})

export default Todo;