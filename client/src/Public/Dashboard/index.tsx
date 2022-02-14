import React from "react";
import useNewsList from "../../Hooks/newsList";
import useCourseList from "../../Hooks/courseList";
import Paper from '@mui/material/Paper';
import { Course, News } from "../../Hooks/interfaces";
import { Box } from "@mui/system";
import { Card, Divider } from "@mui/material";
import "./index.css";
import { Link } from "react-router-dom";

function oneNews(news: News, key: number) {
    const {title, body, figureUrl} = news; 

    return (
        <Paper elevation={3} key={key}>
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

function Dashboard(...props: any[]) {
    const newsList = useNewsList();
    const courseList = useCourseList("student1@vt.edu");

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