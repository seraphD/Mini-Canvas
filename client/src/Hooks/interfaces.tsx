export interface News {
    title: string,
    body: string,
    figureUrl: string
}

export interface Course {
    name: string,
    description: string,
    department: "CS" | "ECE",
    code: number
}