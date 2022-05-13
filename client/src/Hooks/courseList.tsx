import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../config.js";
import {Course} from "./interfaces";

function useCourseList(userid: number, role: string = "student") {
    const [courseList, setCourseList] = useState<Course[]>([]);

    useEffect(() => {
        if (userid === 0) return;
        axios.get(`${config.baseUrl}/courselist`, { params: { userid, role } })
        .then(res => {
            setCourseList(res.data);
        })
        .catch(err => {
            alert("Fetch course list failed! Please try again");
        })
    }, [userid]);

    return courseList;
}

export default useCourseList