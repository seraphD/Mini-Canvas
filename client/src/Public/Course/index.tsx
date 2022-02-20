import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import config from "../../config";
import { Box } from "@mui/material";
import {Element, Editor} from "./Editor";
import {Descendant} from "slate";

function Course() {
    const { courseCode } = useParams();
    const [edit, setEdit] = useState<boolean>(false);
    const [coursePage, setCoursePage] = useState<Descendant[]>()

    useEffect(() => {
        axios.get(`${config.baseUrl}/coursepage`, { params: {courseCode} })
        .then(res => {
           setCoursePage(res.data.page);
        })
        .catch(error => {
            alert("Load course page failed!");
        })
    }, []);

    return (
        <Box sx={{textAlign: "left"}}>
            {edit? <Editor initialvalue={coursePage}/> : test}
        </Box>
    )
}

export default Course;