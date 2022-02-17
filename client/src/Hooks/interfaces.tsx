export interface User {
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
    code: number,
    instructor: number,
}

export interface TodoItem {
    course: Course,
    point: number,
    dueDate: string,
    name: string,
    // type: "Assignment" | "Announcement",
}