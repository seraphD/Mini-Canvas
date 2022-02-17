import React, { useEffect, useState } from "react";
import { TodoItem } from "./interfaces";
import axios from 'axios';
import config from "../config";

function useTodoList(userName: string, course: number = 0) {
    const [todoList, setTodoList] = useState<TodoItem[]>([]);

    useEffect(() => {
        if (userName === "") return;
        axios.get(`${config.baseUrl}/todolist`, { params: {userName, course} })
        .then(res => {
            setTodoList(res.data);
        })
        .catch(err => {
            alert("Fetch to do list failed!");
            console.error(err);
        })
    }, [userName]);

    return todoList;
}

export default useTodoList;