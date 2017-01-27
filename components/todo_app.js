import React from 'react';
import TodoHeader from './todo-header.js';
import Todo from './todo.js';
import AddTodo from './add-todo.js';
import Filter from './filter.js';

var TodoApp = React.createClass({
  self : this,
  getInitialState: function() {
    return {
      todos: [
        { name: "Do the dishes", completed: false, edit: false },
        { name: "Mow the lawn", completed: false, edit: false },
        { name: "Do Full-stack homework", completed: false, edit: false }
      ],
      showComplete: true
    }
  },

  render: function() {
    var filteredTodos;
    if (this.state.showComplete) {
      filteredTodos = this.state.todos;
    } else {
      filteredTodos = this.state.todos.filter(todo => !todo.completed);
    }

    // everytime render runs, todosIncomplete re-calculates the amount of incomplete tasks left
    var incompleteTodos = filteredTodos.filter((todo) => !todo.completed);
    return <div className='todo-list'>

      <TodoHeader incompleteTodos={ incompleteTodos } />

      { filteredTodos.map((todo, index) => (
          <Todo todo={ todo } 
                key={ index } 
                onChecked={ () => this.toggleChecked(index) }
                onButtonHover={ (evt) => this.toggleHover(evt) } 
                onEditButtonClick= { () => this.toggleEdit(index) } 
                onDeleteButtonClick= { () => this.deleteTodo(index) } 
                onUpdateText= { (newText) => this.updateToDo(newText, index) }/>
          )
        ) 
      }

      <AddTodo onAddNewTodo={ (name) => this.addTodo(name) } />

      <Filter showComplete={ this.state.showComplete } 
              onToggleFilter={ () => this.toggleCompleteView() }/>

    </div>
  }, 

  addTodo: function(name) {
    var todos = this.state.todos;
    var newTodo = { 
      name: name, 
      completed: false,
      edit: false
    };

    this.setState({
      // concat represents todos.push(newTodo) & this.setState({ todos: todos })
      todos: todos.concat([newTodo])
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

  updateToDo: function(newText, todoId) {
    var todos = this.state.todos;
    todos[todoId].name = newText;
    this.setState({ todos: todos });
  }

})

export default TodoApp;
