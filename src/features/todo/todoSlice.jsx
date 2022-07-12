import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    loading: false,
    error: '',
    inputText: '',
    todos: [],
    status: 'all',
    filteredTodos: [],
}

const url = "https://drf-todo-1.herokuapp.com/"

export const fetchTodoList = createAsyncThunk('todo/fetchTodoList', async () => {
    const token = localStorage.getItem('token');

    return axios.get(url + 'api/list/', {
        headers: {
            'Authorization': 'Token ' + token,
        }
    })
        .then(response => response.data)
})

export const createTodo = createAsyncThunk('todo/createTodo', async (data, { dispatch }) => {
    const token = localStorage.getItem('token');
    const result = await axios.post(url + 'api/create/', data, {
        headers: {
            Authorization: 'Token ' + token,
        }
    })
    dispatch(fetchTodoList())
    return result
})

export const deleteTodo = createAsyncThunk('todo/deleteTodo', async (data, { dispatch }) => {
    const token = localStorage.getItem('token');

    const result = await axios.post(url + 'api/delete/', data, {
        headers: {
            Authorization: 'Token ' + token
        }
    })
    dispatch(fetchTodoList())
    return result
})

export const updateTodo = createAsyncThunk('todo/toggleTodo', async (data, { dispatch }) => {
    const token = localStorage.getItem('token');

    const result = await axios.post(url + 'api/update/', data, {
        headers: {
            Authorization: 'Token ' + token
        }
    })
    dispatch(fetchTodoList())
    return result
})

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        setInputText: (state, action) => {
            state.inputText = action.payload;
        },
        setFilterTodos: (state, action) => {
            state.filteredTodos = action.payload;
        },
        setStatus: (state, action) => {
            state.status = action.payload;
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchTodoList.pending, state => {
            state.loading = true;
        })
        builder.addCase(fetchTodoList.fulfilled, (state, action) => {
            state.loading = false
            state.todos = action.payload
            state.error = ''
        })
        builder.addCase(fetchTodoList.rejected, (state, action) => {
            state.loading = false
            state.todos = []
            state.error = action.payload
        })
    },
})

export default todoSlice.reducer;
export const { setInputText, setFilterTodos, setStatus } = todoSlice.actions