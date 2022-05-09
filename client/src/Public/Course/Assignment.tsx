import React, { useEffect, useState, useRef, useReducer } from "react";
import { Box, List, ListItem, Divider, ListItemButton, TextField, Select, MenuItem, Dialog, Button } from "@mui/material";
import { DialogTitle, DialogContent, DialogContentText, DialogActions, IconButton } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";
import config from "../../config";
import { AssignmentListItem } from "../../Hooks/interfaces";
import "./index.css";
import { Routes, Route, useParams, useNavigate } from "react-router-dom";
import { Editor } from "./Editor";
import { styled } from '@mui/material/styles';

type AssignmentListProps = { assignmentList: AssignmentListItem[], code: string, role: string };
type AssignmentProps = { code: string, role: string };
type AssignmentDetailProps = { role: string, onDel: Function, onAdd: Function };

const Input = styled('input')({
    display: 'none',
  });  

const initAssignmentDetailState = {
    assignmentId: "temp",
    title: "New Assignment",
    detail: [
        {
            type: 'paragraph',
            children: [
                { text: "New Assignment" },
            ],
        }
    ],
    dueDate: "",
    status: "unpublished",
    point: 0,
    course: 0,
}

function AssignmentList(props: AssignmentListProps) {
    const navigate = useNavigate();
    const { courseCode } = useParams();

    return (
        <Box sx={{ width: '100%', maxWidth: 800, position: "relative", height: "93vh", overflow: "scroll"}}>
            <nav>
                <List>
                    {props.assignmentList.map((assignment, key) => (
                        <ListItem key={key} disablePadding>
                            <ListItemButton component="a" href={`/home/course/${props.code}/assignment/${assignment.assignmentId}`}>
                                <Box sx={{ width: "100%" }}>
                                    <p className="assignment-title">{assignment.title}</p>
                                    <p>Due: {assignment.dueDate}, point: {assignment.point}, status: {assignment.status}</p>
                                    <Divider sx={{ width: "100%" }}></Divider>
                                </Box>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </nav>
           {props.role === "instructor" ?  <IconButton id="new-assignment-btn" color="primary" onClick={() => navigate(`/home/course/${courseCode}/assignment/new`)}><AddIcon sx={{ fontSize: 40 }}/></IconButton> : null}
        </Box>
    )
}

function reducer(state: any, action: any) {
    switch(action.type) {
        case "load":
            return {...action.payload};
        case "editStatus":
            return {...state, status: action.payload};
        case "editPoint":
            return {...state, point: action.payload};
        case "editTitle":
            return {...state, title: action.payload};
        case "editCourse":
            return {...state, course: action.payload};
        case "editAssId":
            return {...state, assignmentId: action.payload};
        default:
            return state;
    }
}

function AssignmentDetail(props: AssignmentDetailProps) {
    const [editing, setEditing] = useState<boolean>(false);
    const [loaded, setLoaded] = useState<boolean>(false);
    const [saving, setSaving] = useState<boolean>(false);
    const [delModel, setDelModal] = useState<boolean>(false);
    const { courseCode, assignmentId } = useParams();
    const editorRef = useRef({value: []});
    const [state, dispatch] = useReducer(reducer, initAssignmentDetailState);
    const navigate = useNavigate();

    useEffect(() => {
        if (assignmentId !== "new") {
            axios.get(`${config.baseUrl}/assignmentdetail`, { params: { assignmentId } })
            .then(res => {
                dispatch({type: "load", payload: res.data});
                setLoaded(true);
            })
            .catch(error => {
                alert("Fetch assignment detail failed!");
            })
        }
        else {
            setLoaded(true);
            setEditing(true);
            dispatch({ type: "editCourse", payload: parseInt(courseCode!) });
        }
    }, []);

    const handleEditBtnClick = () => {
        if (editing) {
            setSaving(true);
            dispatch({ type: "editDetail", pyaload: editorRef.current.value });
            if (state.assignmentId !== "temp") {
                axios.post(`${config.baseUrl}/editassignment`, { newAssignment: state })
                .then(res => {
                    setEditing(!editing);
                    setSaving(false);
                })
                .catch(error => {
                    alert("Failed to save the assignment");
                })
            }
            else {
                axios.post(`${config.baseUrl}/newassignment`, { newAssignment: state })
                .then(res => {
                    setEditing(!editing);
                    setSaving(false);
                    alert("New assignment created!");
                    const newId = res.data;
                    props.onAdd(state);
                    navigate(`/home/course/${courseCode}/assignment/${newId}`);
                })
            }
        }
        else {
            setEditing(!editing);
        }
    }

    const deleteAss = () => {
        axios.post(`${config.baseUrl}/delassignment`, {assignmentId: state.assignmentId})
        .then(res => {
            props.onDel(state.assignmentId);
            navigate(`/home/course/${courseCode}/assignment`);
        })
        .catch(error => {
            alert("deleting assignment failed! Try again");
        })
    }

    const handleDelBtnClick = () => setDelModal(true);
    const delClose = () => setDelModal(false);
    const handleStatusChange = (e: any) => dispatch({ type: "editStatus", payload: e.target.value });
    const handlePointChange = (e: any) => dispatch({ type: "editPoint", payload: e.target.value.length ? parseInt(e.target.value) : "" });
    const handleEditTitle = (e: any) => dispatch({ type: "editTitle", payload: e.target.value });

    return (
        <Box sx={{ width: "100%", maxWidth: 800, minWidth: 400 }}>
            <Box sx={{ position: "relative", height: "10vh" }}>
                {editing ? <TextField sx={{ width: "50%", margin: "10px 0" }} onChange={handleEditTitle} defaultValue={state.title} variant="outlined"/> : <h2>{state.title}</h2>}
                <Box sx={{ height: 30 }}>
                    <Box className="assignment-info-item" sx={{ marginLeft: 0 }}>
                        Due Date: {editing ? <LocalizationProvider dateAdapter={AdapterDateFns}><DatePicker value={null} onChange={value => console.log(value)} renderInput={(params) => <TextField sx={{width: "150px"}} {...params} />} /> </LocalizationProvider> : state.dueDate};
                    </Box>
                    <Box className="assignment-info-item">Point: {editing ? <TextField onChange={handlePointChange} variant="outlined" sx={{ width: 60, height: 50 }} defaultValue={state.point} /> : state.point};</Box>
                    <Box className="assignment-info-item">Status: {editing ? 
                        <Select 
                            value={state.status}
                            onChange={handleStatusChange}
                        >
                            <MenuItem value="unpublished">unpublished</MenuItem>
                            <MenuItem value="published">published</MenuItem>
                            <MenuItem value="closed">closed</MenuItem>
                        </Select> 
                        : state.status}
                    </Box>
                </Box>
            </Box>
            <Divider sx={{width: "100%", maxWidth: 800, margin: "10px 0"}}></Divider>
            <Box sx={{ height: "65vh", border: "solid black", margin: "15px 0" }}>
            { loaded ? <Editor readOnly={!editing} initialvalue={state.detail} parentRef={editorRef}/> : null }
            </Box>
            <Box sx={{ height: "10vh", float: "right" }}>
                { props.role === "student" ? <label htmlFor="contained-button-file">
                                                <Input accept=".doc,.pdf,.zip" id="contained-button-file" type="file" />
                                                <Button variant="contained" component="span">
                                                    Upload
                                                </Button>
                                            </label> : null }
                { props.role === "instructor" ? <LoadingButton loading={saving} sx={{ margin: "0 20px" }} variant="contained" onClick={handleEditBtnClick}>{editing ? "Save" : "Edit"}</LoadingButton> : null }
                { props.role === "instructor" ? <LoadingButton loading={saving} sx={{ margin: "0 20px" }} variant="contained" color="error" onClick={handleDelBtnClick}>Delete</LoadingButton> : null }
            </Box>
            <Dialog
                open={delModel}
                onClose={delClose}
            >
                <DialogTitle>Deleting {state.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This operation will delete the assignment permanently. Click delete to continue.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={deleteAss} color="error">Delete</Button>
                    <Button onClick={delClose} autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

function Assignment(props: AssignmentProps) {
    const [assignmentList, setAssignmentList] = useState<AssignmentListItem[]>([]);

    useEffect(() => {
        const {code, role} = props;
        axios.get(`${config.baseUrl}/assignmentlist`, { params: {code, role} })
        .then(res => {
            setAssignmentList(res.data);
        })
        .catch(error => {
            alert("Fetch assgnment list failed");
        })
    }, [props.role])

    const onDel = (id: number) => {
        for(let i = 0; i < assignmentList.length; i++) {
            if (assignmentList[i].assignmentId === id) {
                assignmentList.splice(i, 1);
                break;
            }
        }
    }

    const onAdd = (assignment: any) => {
        assignmentList.push(assignment);
    }

    return (
        <Routes>
            <Route path="" element={<AssignmentList assignmentList={assignmentList} code={props.code} role={props.role} />}></Route>
            <Route path=":assignmentId" element={<AssignmentDetail role={props.role} onDel={onDel} onAdd={onAdd}/>}></Route>
        </Routes>
    )
}

export default Assignment;