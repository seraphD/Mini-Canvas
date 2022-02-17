import React, { useEffect, useState } from "react";
import useNewsList from "../../Hooks/newsList";
import useCourseList from "../../Hooks/courseList";
import Paper from '@mui/material/Paper';
import { Course, News, User } from "../../Hooks/interfaces";
import { Box } from "@mui/system";
import { Card, Divider } from "@mui/material";
import "./index.css";
import { Link } from "react-router-dom";

type DashboardProps = {user: User}

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

    useEffect(() => {
        setUserName('student1@vt.edu');
        // setUserName(props.user.userName);
        console.log(userName);
    }, [props.user])

    const courseList = useCourseList(userName);

    return (
        <Box sx={{textAlign: "left"}}>
            {newsList.map((news, key) => oneNews(news, key))}
            <h3>Course</h3>
            <Divider />
            {courseList.map((course, key) => oneCourse(course, key))}
        </Box>
    )
}

export default Dashboard;