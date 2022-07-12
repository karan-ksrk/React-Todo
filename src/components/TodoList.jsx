import { React, useEffect } from 'react';
import Todo from './Todo.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTodoList } from '../features/todo/todoSlice.jsx';

const TodoList = () => {
    const filterTodos = useSelector(state => state.todo.filteredTodos)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTodoList())
    }, [])

    return (
        <div className="todo-container">
            <div className="todo-list"></div>
            <ul className="todo-list">
                {filterTodos.map(todo => (
                    <Todo key={todo.id} todo={todo} />
                ))}
            </ul>

        </div>
    );
};

export default TodoList;