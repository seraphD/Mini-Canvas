import React, { useEffect } from "react";
import { Box } from "@mui/material";
import axios from "axios";
import config from "../../config";

type AssignmentListProps = { code: string, role: string };

function AssignmentList(props: AssignmentListProps) {
    useEffect(() => {
        const {code, role} = props;
        axios.get(`${config.baseUrl}/assignmentlist`, { params: {code, role} })
        .then(res => {

        })
        .catch(error => {
            alert("Fetch assgnment list failed");
        })
    }, [])

    return (
        <Box>
            Assignment
        </Box>
    )
}

export default AssignmentList;