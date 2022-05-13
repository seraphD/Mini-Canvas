import React, { useEffect, useState } from "react";
import { TodoItem } from "./interfaces";
import axios from 'axios';
import config from "../config";

function useTodoList(userid: number, course: number = 0) {
    const [todoList, setTodoList] = useState<TodoItem[]>([]);

    useEffect(() => {
        if (userid === 0) return;
        axios.get(`${config.baseUrl}/todolist`, { params: {userid, course} })
        .then(res => {
            setTodoList(res.data);
        })
        .catch(err => {
            alert("Fetch to do list failed!");
            console.error(err);
        })
    }, [userid]);

    return todoList;
}

export default useTodoList;