import React, { useEffect, useState } from "react";
import { Grid, Box, Drawer, Divider } from "@mui/material";
import { Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from "../Dashboard";
import Course from "../Course";
import Inbox from "../Inbox";
import Help from "../Help";
import SideTabs from "../SideTabs";
import './index.css';
import { User, TodoItem } from "../../Hooks/interfaces";
import useTodoList from "../../Hooks/todoList";

type HomeProps = {user: User, setUser: React.Dispatch<React.SetStateAction<User>>}

function oneTodo(todoItem: TodoItem) {
    const {name, point, course, dueDate} = todoItem;

    return (
        <Box className="todo-item">
            <p className="todo-name">{name}</p>
            <p>Point: {point} |</p>
            <p>Due: {dueDate}</p>
        </Box>
    )
}

function Home(props: HomeProps) {
    const navigate = useNavigate()
    const [user, setUser] = useState<User>(props.user);
    const todoList = useTodoList(user.userName);

    useEffect(() => {
        if (user.userName === "") {
            if (localStorage.getItem("user") === null) {
                navigate("/login");
            }
            else {
                const user = JSON.parse(localStorage.getItem("user")!);
                setUser(user);
            }
        }
    }, [])

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={4} columns={{ xs: 4, sm: 8, md: 12 }}>
                <Grid item xs={0} sm={1} md={1}>
                    <Drawer
                        anchor="left"
                        open={true}
                        variant="permanent"
                        sx={{
                            display: {xs: 'none', sm: 'block'}
                        }}
                    >
                        <SideTabs />
                    </Drawer>
                </Grid>
                <Grid item xs={2} sm={5} md={6}>
                    <Routes>
                        <Route path="" element={<Dashboard user={user}/>}/>
                        <Route path="/course/:courseId" element={<Course />}></Route>
                        <Route path="inbox" element={<Inbox />}></Route>
                        <Route path="help" element={<Help />}></Route>
                    </Routes>
                </Grid>
                <Grid item xs={2} sm={2} md={5} sx={{textAlign: "left"}}>
                    Todo
                    <Divider className="home-divider"/>
                    {todoList.map(item => oneTodo(item))}
                    Recent Feedback
                    <Divider className="home-divider"/>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Home; 