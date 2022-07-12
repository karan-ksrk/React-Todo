import { React } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setInputText, setStatus, createTodo, fetchTodoList } from '../features/todo/todoSlice'
import { useNavigate } from "react-router-dom";

const Form = () => {
    const inputText = useSelector(state => state.todo.inputText);
    const dispatch = useDispatch();

    const navigate = useNavigate();



    const inputTextHandler = (e) => {
        dispatch(setInputText(e.target.value))
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append("title", inputText);
        Promise.resolve(dispatch(createTodo(formdata))).then(
            (result => {
                if (result.status === 200) {
                    dispatch(fetchTodoList());
                }
            })
        )
        dispatch(setInputText(''));
    };

    const logoutHandler = (e) => {
        // e.preventDefault();
        // axios.post('http://127.0.0.1:8000/logout/')
        localStorage.clear();
        const token = localStorage.getItem('token');
        if (!token) {
            navigate("/login", { replace: true });
            console.log("logout");
        }
        navigate("/login", { replace: true });
        console.log("after navigation")
    }

    const statusHandler = (e) => {
        dispatch(setStatus(e.target.value))
    }
    return (
        <div>
            <button onClick={logoutHandler} className="logout-button">logout</button>
            <form>
                <input onChange={inputTextHandler} value={inputText} type="text" className="todo-input" />
                <button onClick={submitHandler} className="todo-button" type="submit">
                    <i className="fa fa-plus-square"></i>
                </button>
                <div className="select">
                    <select onChange={statusHandler} name="todos" className="filter-todo">
                        <option value="all">All</option>
                        <option value="completed">Completed</option>
                        <option value="uncompleted">Uncompleted</option>
                    </select>
                </div>
            </form>
        </div>
    );
}

export default Form;