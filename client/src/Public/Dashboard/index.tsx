import React, { useEffect, useState } from "react";
import useNewsList from "../../Hooks/newsList";
import useCourseList from "../../Hooks/courseList";
import Paper from '@mui/material/Paper';
import { Course, News, User, TodoItem } from "../../Hooks/interfaces";
import { Box } from "@mui/system";
import { Card, Divider, Grid } from "@mui/material";
import "./index.css";
import { Link } from "react-router-dom";
import useTodoList from "../../Hooks/todoList";

type DashboardProps = {user: User}

function oneTodo(todoItem: TodoItem, key: number) {
    const {name, point, course, dueDate} = todoItem;

    return (
        <Box className="todo-item" key={key}>
            <p className="todo-name">{name}</p>
            <p>Point: {point} |</p>
            <p>Due: {dueDate}</p>
        </Box>
    )
}


function oneNews(news: News, key: number) {
    const {title, body, figureUrl} = news; 

    return (
        <Paper elevation={3} key={key} sx={{ padding: 1, margin: "10px 0 10px 0" }}>
            <h2>{title}</h2>
            <p>{body}</p>
        </Paper>
    )
}

function oneCourse(course: Course, key: number) {
    const {name, description, department, code} = course;

    return (
        <Card className="course-card" key={key} sx={{ display: "inline-block", height: 150 }}>
            <Link to={`/home/course/${code}`}><h4>{name}</h4></Link>
            <Link to={`/home/course/${code}`}>{description}</Link>
        </Card>
    )
}

function Dashboard(props: DashboardProps) {
    const [userName, setUserName] = useState<string>(props.user.userName);
    const newsList = useNewsList();
    const todoList = useTodoList(userName);

    useEffect(() => {
        setUserName(props.user.userName);
    }, [props.user])

    const courseList = useCourseList(userName);

    return (
        <Box sx={{textAlign: "left"}}>
            <Grid container spacing={4} columns={{xs: 4, sm: 8, md: 12, lg: 14, xl: 18}}>
                <Grid item xs={3} sm={5} md={9} lg={10} xl={12}>
                    {newsList.map((news, key) => oneNews(news, key))}
                    <h3>Course</h3>
                    <Divider />
                    {courseList.map((course, key) => oneCourse(course, key))}
                </Grid>

                <Grid item xs={1} sm={3} md={3} lg={4} xl={6}>
                    Todo
                    <Divider className="home-divider"/>
                    {todoList.map((item, key) => oneTodo(item, key))}
                    Recent Feedback
                    <Divider className="home-divider"/>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Dashboard;