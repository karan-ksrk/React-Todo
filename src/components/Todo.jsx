import React from "react";
import { useDispatch } from "react-redux";
import { updateTodo, deleteTodo } from '../features/todo/todoSlice'

const Todo = ({ todo }) => {
    const dispatch = useDispatch();

    const deleteHandler = () => {
        const formdata = new FormData();
        formdata.append('id', todo.id);
        dispatch(deleteTodo(formdata))
    }
    const completeHandler = () => {
        const formdata = new FormData();
        formdata.append('id', todo.id);
        formdata.append('completed', !todo.completed);
        dispatch(updateTodo(formdata))
    }
    return (
        <div className="todo">
            <li className={`todo-item ${todo.completed ? "completed" : ''}`}>{todo.title}</li>
            <button onClick={completeHandler} className="complete-btn">
                <i className="fas fa-check"></i>
            </button>
            <button onClick={deleteHandler} className="trash-btn">
                <i className="fas fa-trash"></i>
            </button>
        </div>
    );
}

export default Todo;