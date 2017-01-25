import React from 'react';

var TodoApp = React.createClass({
  self : this,
  getInitialState: function() {
    return {
      todos: [
        { name: "Do the dishes", completed: false, edit: false },
        { name: "Mow the lawn", completed: false, edit: false },
        { name: "Do Full-stack homework", completed: false, edit: false }
      ],
      newTodo: '',
      showComplete: true
    }
  },

  render: function() {
    // in order to keep refering to the main react class, I saved it as self ahead of the filter function
    var self = this;
    var filteredTodos;
    if (this.state.showComplete) {
      filteredTodos = this.state.todos;
    } else {
      filteredTodos = this.state.todos.filter(todo => !todo.completed);
    }

    // everytime render runs, todosIncomplete re-calculates the amount of incomplete tasks left
    var incompleteTodos = filteredTodos.filter((todo) => !todo.completed);
    return <div className='todo-list'>

      <header className='todo-header'>
        { incompleteTodos.length > 0 ? (
          incompleteTodos.length + " Things to Do" ):( 
          "You are out of stuff to do, yay!")}
      </header>

      { filteredTodos.map(function(todo, index) {
        return (
          <div className={ todo.completed ? 'row completed' : 'row' } key={ index }>
            <div className='col-md-2 todo-check'>
              <input type='checkbox' 
                     checked={ todo.completed }
                     onChange= { () => self.toggleChecked(index) }/>
            </div>
            <div className='col-md-10'>
              <input type='textbox'
                     value={ todo.name }
                     disabled={ !todo.edit }
                     className= { todo.edit ? "focus" : "" }
                     onChange={ (evt) => self.updateToDo(evt, index) }/>
              &nbsp;
              <button className="btn glyphicon glyphicon-pencil" 
                      onClick={function(evt){ self.toggleEdit(index); self.toggleHover(evt); }} 
                      onMouseEnter={ (evt) => self.toggleHover(evt) }
                      onMouseLeave={ (evt) => self.toggleHover(evt) }
                      type="button">
              </button>
              <button className="btn glyphicon glyphicon-remove" 
                      onClick={ () => self.deleteTodo(index)} 
                      onMouseEnter={ (evt) => self.toggleHover(evt) }
                      onMouseLeave={ (evt) => self.toggleHover(evt) }
                      type="button">
              </button>
            </div> 
          </div>
        )
      }) }

      <div className='row new-todo'>
        <div className='col-md-2'></div>
        <div className='col-md-9'>
          <div className="input-group">
            <input type="text" className="form-control" onChange={ self.updateInputField } value={ self.state.newTodo }/>
            <span className="input-group-btn">
              <button className="btn btn-primary" onClick={ self.addTodo } type="button">Add</button>
            </span>
          </div>
        </div>
      </div>
      
      <div className="filter">
        <button className="btn btn-primary filter" onClick={ self.toggleCompleteView }>
          { self.state.showComplete ? "Filter Completed To-Dos" : "Clear Filter" }
        </button>
      </div>

    </div>
  }, 

  addTodo: function() {
    var todos = this.state.todos;
    var preFilteredList = this.state.preFilteredList;
    var newTodo = { 
      name: this.state.newTodo, 
      completed: false,
      edit: false
    };

    this.setState({
      // concat represents todos.push(newTodo) & this.setState({ todos: todos })
      todos: todos.concat([newTodo]),
      newTodo: ''
    })
  },

  deleteTodo: function(todoId) {
    var todos = this.state.todos;
    todos.splice(todoId, 1);
    this.setState({ todos: todos });
  },

  toggleCompleteView: function() {
    if (this.state.showComplete) {
      this.setState({ showComplete: false });
    } else {
      this.setState({ showComplete: true });
    }
  },

  toggleChecked: function(todoId) {
    // React only allows higher level modification in setState, therefore we need
    // to pull out all the todos, modify the one we want and setState of the entire todo list again
    var todos = this.state.todos;
    todos[todoId].completed = !todos[todoId].completed;
    this.setState({ todos: todos });
  },

  toggleEdit: function(todoId) {
    var todos = this.state.todos;
    todos[todoId].edit = !todos[todoId].edit;
    this.setState({ todos: todos });
  },

  toggleHover: function(evt) {
    evt.target.classList.toggle("hover");
  },

  updateToDo: function(evt, todoId) {
    var todos = this.state.todos;
    todos[todoId].name = evt.target.value;
    this.setState({ todos: todos });
  },

  updateInputField: function(evt) {
    this.setState({ newTodo: evt.target.value });
  }
})

export default TodoApp;
