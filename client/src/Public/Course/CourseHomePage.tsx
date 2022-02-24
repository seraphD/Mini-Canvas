import React, {useState, useRef} from "react";
import { Box, Button } from "@mui/material";
import { Descendant } from "slate";
import { Editor } from "./Editor";
import axios from "axios";
import config from "../../config";

type courseHomePageProps = { homepage: Descendant[], role: string, code: string };

function CourseHomePage(props: courseHomePageProps) {
    const [courseHomePage, setCourseHomePage] = useState<Descendant[]>(props.homepage);
    const [editing, setEditing] = useState<boolean>(false);
    const editorRef = useRef({value: []});

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
            <Editor readOnly={!editing} initialvalue={courseHomePage} parentRef={editorRef} />
            {props.role === "student" ? 
                <Button variant="contained" sx={{position: "fixed", bottom: 100, right: "40%"}} onClick={handleEditBtnCLick}>
                    {editing? "Save" : "Edit"}
                </Button> 
                : null}
        </Box>
    )
}

export default CourseHomePage;