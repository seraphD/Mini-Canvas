import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';

function Course() {
    const { courseId } = useParams();

    return (
        <div>{courseId} course page</div>
    )
}

export default Course;