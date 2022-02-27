import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../config.js";
import {Course} from "./interfaces";

function useCourseList(userName: string, role: string = "student") {
    const [courseList, setCourseList] = useState<Course[]>([]);

    useEffect(() => {
        if (userName === "") return;
        axios.get(`${config.baseUrl}/courselist`, { params: { userName, role } })
        .then(res => {
            setCourseList(res.data);
        })
        .catch(err => {
            alert("Fetch course list failed! Please try again");
        })
    }, [userName]);

    return courseList;
}

export default useCourseList