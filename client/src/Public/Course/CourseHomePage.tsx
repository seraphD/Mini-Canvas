import React, {useState, useRef, useEffect} from "react";
import { useParams } from 'react-router-dom';
import { Box, Button, Grid, Divider } from "@mui/material";
import { Descendant } from "slate";
import { Editor } from "./Editor";
import axios from "axios";
import config from "../../config";
import EditIcon from '@mui/icons-material/Edit';
import useTodoList from "../../Hooks/todoList";
import { TodoItem } from "../../Hooks/interfaces";

type courseHomePageProps = { id: number, homepage: Descendant[], role: string, code: string, userName: string };

function oneTodo(todoItem: TodoItem, key: number) {
    const {title, point, dueDate} = todoItem;

    return (
        <Box className="todo-item" key={key}>
            <p className="todo-name">{title}</p>
            <p>Point: {point} |</p>
            <p>Due: {dueDate}</p>
        </Box>
    )
}

function CourseHomePage(props: courseHomePageProps) {
    const { course } = useParams();
    const [courseHomePage, setCourseHomePage] = useState<Descendant[]>(props.homepage);
    const [editing, setEditing] = useState<boolean>(false);
    const editorRef = useRef({value: []});
    const todoList = useTodoList(props.id, parseInt(course ? course : "0"));

    const handleEditBtnCLick = () => {
        if (editing) {
            const value = editorRef.current.value;
            axios.post(`${config.baseUrl}/editcoursepage`, {value, code: props.code})
            .then(data => {
                alert("Editing course Homepage succeed!");
            })
            .catch(error => {
                alert("Editing course Homepage falied!");
            })
        }
        
        setEditing(!editing);
    }

    return (
        <Box>
            <Grid container spacing={4} columns={{xs: 4, sm: 8, md: 12, lg: 12, xl: 16}}>
                <Grid item xs={3} sm={5} md={9} lg={8} xl={10}>
                    <Editor readOnly={!editing} initialvalue={courseHomePage} parentRef={editorRef} />
                    {props.role !== "student" ? 
                        <Button variant="contained" endIcon={<EditIcon />} size="large" sx={{position: "fixed", bottom: 100, right: "40%"}} onClick={handleEditBtnCLick}>
                            {editing? "Save" : "Edit"}
                        </Button> 
                        : null}
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

export default CourseHomePage;