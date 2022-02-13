import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../config.js";
import { News } from "./interfaces";

function useNewsList() {
    const [newsList, setNerwsList] = useState<News[]>([]);

    useEffect(() => {
        axios.get(`${config.baseUrl}/newslist`)
        .then(res => {
            setNerwsList(res.data);
        })
        .catch(err => {
            alert("Fetach news list failed!");
        })
    }, [])

    return newsList;
}

export default useNewsList;