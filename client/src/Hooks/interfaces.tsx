export interface User {
    id: number,
    userName: string,
    role: "student" | "instructor",
    department: "CS" | "ECE",
}

export interface News {
    title: string,
    body: string,
    figureUrl: string
}

export interface Course {
    name: string,
    description: string,
    department: "CS" | "ECE" | "CS & ECE",
    courseid: number,
    instructor: number,
}

export interface TodoItem {
    course: Course,
    point: number,
    dueDate: string,
    title: string,
    // type: "Assignment" | "Announcement",
}

export interface AssignmentListItem {
    title: string,
    assignmentId: number,
    duedate: string,
    point: number,
    status: string,
}

export interface AssignmentItem {
    title: string,
    assignmentId: number,
    duedate: string,
    point: number,
    status: string,
    detail: Array<any>,
}