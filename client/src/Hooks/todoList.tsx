import React, { useEffect, useState } from "react";
import { TodoItem } from "./interfaces";
import axios from 'axios';
import config from "../config";

function useTodoList(id: number) {
    const [todoList, setTodoList] = useState<TodoItem[]>([]);

    useEffect(() => {
        axios.get(`${config.baseUrl}`, { params: {id, course: "all"} })
        .then(res => {
            setTodoList(res.data);
        })
        .catch(err => {
            alert("Fetch to do list failed!");
            console.error(err);
        })
    }, [])

    return todoList;
}

export default useTodoList;