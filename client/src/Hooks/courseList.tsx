import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../config.js";
import {Course} from "./interfaces";

function useCourseList(userName: string) {
    const [courseList, setCourseList] = useState<Course[]>([]);

    useEffect(() => {
        axios.get(`${config.baseUrl}/courselist`, { params: { userName } })
        .then(res => {
            setCourseList(res.data);
        })
        .catch(err => {
            alert("Fetch course list failed! Please try again");
        })
    }, [])

    return courseList;
}

export default useCourseList