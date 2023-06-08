import './style.css';
import { useState } from 'react';

export default function App() {
  const [newItem, setNewItem] = useState('');
  const [todos, setTodos] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();

    setTodos(currentTodos => [
      ...currentTodos,
      { id: crypto.randomUUID(), title: newItem, completed: false },
    ]);

    setNewItem("")
  }

  function toggleTodo(id,completed){
    setTodos(currentTodos =>{
        return currentTodos.map(todo =>{
          if(todo.id === id){
            return {...todo,completed}
          }


          return todo
        })
    })

  }

  function deleteTodo(id){

    setTodos(currentTodos =>{
      
        return currentTodos.filter(todo => todo.id !== id)
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="new-item-form">
        <div className="form-row">
          <label htmlFor="item">New Item</label>
          <input
            type="text" required
            value={newItem}
            onChange={e => setNewItem(e.target.value)}
            id="item"
          />
        </div>

        <button className="btn">Add</button>
      </form>
      <h1 className="header">Todo List</h1>
      <ul className="list">
        {todos.length===0 && "No Todo's"}
        {todos.map(todo => (
          <li key={todo.id}>
            <label>
              <input type="checkbox" 
              checked={todo.completed}
              onChange={e =>toggleTodo(todo.id,e.target.checked)}
             />
              {todo.title}
            </label>
            <button className="btn btn-danger"
            onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}
