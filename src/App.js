import React, {useEffect } from 'react';
import './App.css';
import Form from './components/Form';
import TodoList from './components/TodoList';
import RegisterUser from './components/RegisterUser';
import LoginUser from './components/LoginUser';
import { useSelector, useDispatch } from 'react-redux';
import { setFilterTodos } from './features/todo/todoSlice';
import {BrowserRouter as Router, Routes, Switch, Route, useNavigate} from 'react-router-dom'


function App() {
  const inputText = useSelector(state => state.todo.inputText);
  const todos = useSelector(state => state.todo.todos);
  const status = useSelector(state => state.todo.status);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token)
    if (!token) {
        navigate("/login", { replace: true });
    }

}, [])

  useEffect(() => {
    filterHandler();
  }, [todos, status])


  const filterHandler = () => {
    switch (status) {
      case 'completed':
        dispatch(setFilterTodos(todos.filter(todo => todo.completed === true)));
        break;
      case 'uncompleted':
        dispatch(setFilterTodos(todos.filter(todo => todo.completed === false)));
        break;
      default:
        dispatch(setFilterTodos(todos));
        break;
    }
  }

  // const saveLocalTodos = () => {
  //   localStorage.setItem('todos', JSON.stringify(todos));
  // }

  // const getLocalTodos = () => {
  //   if (localStorage.getItem('todos') === null) {
  //     localStorage.setItem('todos', JSON.stringify([]));
  //   } else {
  //     let localTodos = JSON.parse(localStorage.getItem('todos'));
  //     dispatch(setTodos(localTodos));
  //   }
  // }



  return (
      <div className="App">
        <header><h1>{inputText} </h1>
        </header>
        
        <Routes>

          <Route path="/"  element={
          <>
            <Form />
            <TodoList />
            </>} 
        />
        
         <Route path="/register" element={<RegisterUser/>} />
         <Route path="/login" element={<LoginUser/>} />
         <Route path="*" element={<LoginUser/>} />
        </Routes>
      </div>
  );
}

export default App;
