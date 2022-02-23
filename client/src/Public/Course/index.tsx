import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import config from "../../config";
import { Box, Grid, List, ListItem, ListItemText, Divider } from "@mui/material";
import { Descendant } from "slate";
import useTodoList from "../../Hooks/todoList";
import { Routes, Route, Link } from "react-router-dom";
import { TodoItem } from "../../Hooks/interfaces";
import CourseHomePage from "./CourseHomePage";

type courseProps = {userName: string, role: string};
type Tab = {name: string, visible: boolean};

function oneTodo(todoItem: TodoItem, key: number) {
    const {name, point, dueDate} = todoItem;

    return (
        <Box className="todo-item" key={key}>
            <p className="todo-name">{name}</p>
            <p>Point: {point} |</p>
            <p>Due: {dueDate}</p>
        </Box>
    )
}

function Course(props: courseProps) {
    const { courseCode } = useParams();
    const [loaded, setLoaded] = useState<boolean>(false);
    const [courseHomePage, setCourseHomePage] = useState<Descendant[]>([]);
    const [department, setDepartment] = useState<string>("");
    const [term, setTerm] = useState<string>(""); 
    const [tabs, setTabs] = useState<Tab[]>([]);
    const todoList = useTodoList(props.userName, parseInt(courseCode ? courseCode : "0"));

    useEffect(() => {
        axios.get(`${config.baseUrl}/coursepage`, { params: {courseCode} })
        .then(res => {
            const {name, department, tabs, homepage} = res.data;
            setCourseHomePage(homepage);
            setTabs(tabs);
            setLoaded(true);
            setDepartment(department);
        })
        .catch(error => {
            alert("Load course page failed!");
        });
    }, []);

    useEffect(() => {
        axios.get(`${config.baseUrl}/term`)
        .then(res => {
            const term  = res.data;
            setTerm(term);
        })
        .catch(error => {
            alert("Load term failed!");
        })
    }, [])

    return (
        <Box sx={{textAlign: "left"}}>
            {/* {loaded? <Editor readOnly={!editing} initialvalue={coursePage}/> : <></>}
            <Button variant="contained" onClick={() => setEditing(!editing)}>{editing? "Save" : "Edit"}</Button> */}
            <h3>{department}_{courseCode}_{term}</h3>
            <Divider sx={{ width: "80%" }}></Divider>
            <Grid container spacing={4} columns={{xs: 4, sm: 8, md: 12, lg: 14, xl: 18}}>
                <Grid item xs={0} sm={0} md={0} lg={2} xl={2}>
                    <List>
                        {tabs.map((tab, key) => (
                            props.role === "student"? 
                            tab.visible ? <ListItem className="course-tab" key={key}>
                                            <ListItemText className="course-tab-text">
                                                <Link to={`${tab.name === "Home" ? "" : tab.name.toLowerCase()}`}>{tab.name}</Link>
                                            </ListItemText>
                                          </ListItem> : null :
                            <ListItem className="course-tab" key={key}>{tab.name} </ListItem>
                        ))}
                    </List>
                </Grid>

                <Grid item xs={3} sm={5} md={9} lg={8} xl={10}>
                    <Routes>
                        <Route path="" element={loaded? <CourseHomePage homepage={courseHomePage} role={props.role}/> : <Box></Box>}></Route>
                        <Route path="announcement" element={<div>announcement</div>}></Route>
                        <Route path="assignment" element={<div>assignment</div>}></Route>
                        <Route path="grade" element={<div>grade</div>}></Route>
                        <Route path="disccusion" element={<div>disccusion</div>}></Route>
                        <Route path="files" element={<div>files</div>}></Route>
                        <Route path="people" element={<div>people</div>}></Route>
                    </Routes>
                </Grid>

                <Grid item xs={1} sm={3} md={3} lg={4} xl={6}>
                    Todo
                    <Divider className="home-divider"/>
                    {todoList.length > 0 ? todoList.map((item, key) => oneTodo(item, key)) : <Box sx={{ fontWeight: "bold", margin: "20px" }}>Well Done~</Box>}
                    Recent Feedback
                    <Divider className="home-divider"/>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Course;