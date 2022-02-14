export interface User {
    userName: string,
    role: "student" | "instructor",
    deparment: "CS" | "ECE",
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
    course: Course | null,
    point: number | null,
    dueDate: string,
    name: string,
    type: "Assignment" | "Announcement",
}