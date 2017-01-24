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
      todosFiltered: false,
      // preFilteredList is defined to store the todos list prior filtering
      preFilteredList: []
    }
  },

  render: function() {
    // in order to keep refering to the main react class, I saved it as self ahead of the filter function
    var self = this;
    // everytime render runs, todosIncomplete re-calculates the amount of incomplete tasks left
    var todosIncomplete = self.state.todos.filter(function(todo){if(todo.completed === false){return todo;}});
    return <div className='todo-list'>

      <header className='todo-header'>
        { todosIncomplete.length > 0 ? (
          todosIncomplete.length + " Things to Do" ):( 
          "You are out of stuff to do, yay!")}
      </header>

      { self.state.todos.map(function(todo, index) {
        // here I used self to refer to the react object, otherwise 
        // this would refer to the curent function in map
        return (
          <div className={ todo.completed ? 'row completed' : 'row' } key={ index }>
            <div className='col-md-2 todo-check'>
              <input 
              type='checkbox' 
              checked={ todo.completed }
              onChange= { () => self.toggleChecked(index) }/>
            </div>
            <div className='col-md-10'>
              <input
                type='textbox'
                value={ todo.name }
                disabled={ !todo.edit }
                className= { todo.edit ? "focus" : "" }
                onChange={ (evt) => self.updateToDo(evt, index) }
              />
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
        <button className="btn btn-primary filter" onClick={ self.filterToDos }>{ !self.state.todosFiltered ? "Filter Completed To-Dos" : "Clear Filter" }</button>
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
      // in case the filter is on, I add newTodo to preFilteredList so whenever we reattached 
      // preFilteredList to todos, we do not lose our newly added todo items
      preFilteredList: preFilteredList.concat([newTodo]), 
      newTodo: ''
    })
  },

  deleteTodo: function(todoId) {
    var todos = this.state.todos;
    todos.splice(todoId, 1);
    this.setState({ todos: todos });
  },

  filterToDos: function() {
    var todos = this.state.todos;
    var preFilteredList = this.state.preFilteredList;
    var filteredList = todos.filter(function(todo){if (todo.completed === false) {return todo;}});
    if (!this.state.todosFiltered) {
      this.setState({
        // stores todos in preFilteredList
        preFilteredList: todos,
        todos: filteredList,
        todosFiltered: true });
    } else {
      this.setState({
        // reset the prio-filtering todos state by replacing current todos by preFilteredList 
        todos: preFilteredList,
        preFilteredList: [],
        todosFiltered: false });
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
