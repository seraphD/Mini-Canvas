import React, {useState} from "react";
import { Box } from "@mui/material";
import { Descendant } from "slate";
import { Editor } from "./Editor";

type courseHomePageProps = { homepage: Descendant[], role: string }

function CourseHomePage(props: courseHomePageProps) {
    const [courseHomePage, setCourseHomePage] = useState<Descendant[]>(props.homepage);
    const [editing, setEditing] = useState<boolean>(false);

    return (
        <Box>
            <Editor readOnly={!editing} initialvalue={courseHomePage}/>
        </Box>
    )
}

export default CourseHomePage;