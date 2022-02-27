import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import config from "../../config";
import { Box, Grid, List, ListItem, ListItemText, Divider } from "@mui/material";
import { Descendant } from "slate";
import { Routes, Route, Link } from "react-router-dom";
import CourseHomePage from "./CourseHomePage";
import AssignmentList from "./AssignmentList";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

type courseProps = {userName: string, role: string};
type Tab = {name: string, visible: boolean};

function Course(props: courseProps) {
    const { courseCode } = useParams();
    const [loaded, setLoaded] = useState<boolean>(false);
    const [courseHomePage, setCourseHomePage] = useState<Descendant[]>([]);
    const [department, setDepartment] = useState<string>("");
    const [term, setTerm] = useState<string>(""); 
    const [tabs, setTabs] = useState<Tab[]>([]);

    useEffect(() => {
        axios.get(`${config.baseUrl}/coursepage`, { params: {courseCode} })
        .then(res => {
            const {department, tabs, homepage} = res.data;
            setCourseHomePage(homepage);
            setTabs(tabs);
            setLoaded(true);
            setDepartment(department);
        })
        .catch(error => {
            alert("Load course page failed!");
        });
    }, [courseCode]);

    useEffect(() => {
        axios.get(`${config.baseUrl}/term`)
        .then(res => {
            const term = res.data;
            setTerm(term);
        })
        .catch(error => {
            alert("Load term failed!");
        })
    }, [])

    const setTabVisibility = (tabName: string, visibility: boolean, tab: Tab) => {
        axios.post(`${config.baseUrl}/tabvisibility`, {courseCode, tabName, visibility})
        .then(res => {
            if( res.status === 200 ) {
                tab.visible = visibility;
                setTabs([]);
                setTabs(tabs);
                alert(`${tabName} is now ${visibility? "visible" : "invisible"} to students now`);
            }
        })
        .catch(error => {
            alert("Set tab visibility failed!");
        })
    }

    return (
        <Box sx={{textAlign: "left"}}>
            <h3>{department}_{courseCode}_{term}</h3>
            <Divider sx={{ width: "80%" }}></Divider>
            <Grid container spacing={4} columns={{xs: 4, sm: 8, md: 12, lg: 14, xl: 18}}>
                <Grid item xs={0} sm={0} md={0} lg={2} xl={2}>
                    <List>
                        {tabs.map((tab, key) => (
                            props.role === "instructor" || tab.visible? 
                            <ListItem className="course-tab" key={key}>
                                <ListItemText className="course-tab-text">
                                    <Link to={`${tab.name === "Home" ? "" : tab.name.toLowerCase()}`}>{tab.name}</Link>
                                    {props.role === "instructor" && tab.name !== "Home" ? tab.visible ? <VisibilityOffIcon onClick={() => setTabVisibility(tab.name, false, tab)}/> : <VisibilityIcon onClick={() => setTabVisibility(tab.name, true, tab)}/> : null}
                                </ListItemText>
                            </ListItem> : null
                        ))}
                    </List>
                </Grid>

                <Grid item xs={4} sm={8} md={12} lg={12} xl={16}>
                    <Routes>
                        <Route path="" element={loaded? <CourseHomePage homepage={courseHomePage} role={props.role} code={courseCode!} userName={props.userName}/> : <Box></Box>}></Route>
                        <Route path="announcement" element={<div>announcement</div>}></Route>
                        <Route path="assignment" element={<AssignmentList role={props.role} code={courseCode!}/>}></Route>
                        <Route path="grade" element={<div>grade</div>}></Route>
                        <Route path="disccusion" element={<div>disccusion</div>}></Route>
                        <Route path="files" element={<div>files</div>}></Route>
                        <Route path="people" element={<div>people</div>}></Route>
                        <Route path="discussions" element={<div>discussion</div>}></Route>
                    </Routes>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Course;