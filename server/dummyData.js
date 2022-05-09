const { v4: uuidv4 } = require('uuid');

const dummyUser = [
    {userName: 'student1@vt.edu', password: '123123', role: 'student', department: "CS"},
    {userName: 'student2@vt.edu', password: '123123', role: 'student', department: "CS"},
    {userName: 'student3@vt.edu', password: '123123', role: 'student', department: "CS"},
    {userName: 'student4@vt.edu', password: '123123', role: 'student', department: "ECE"},
    {userName: 'student5@vt.edu', password: '123123', role: 'student', department: "ECE"},
    {userName: 'teacher1@vt.edu', password: '123123', role: 'instructor', department: "CS"},
    {userName: 'teacher2@vt.edu', password: '123123', role: 'instructor', department: "CS"},
    {userName: 'teacher3@vt.edu', password: '123123', role: 'instructor', department: "cs"},
    {userName: 'teacher34@vt.edu', password: '123123', role: 'instructor', department: "ECE"},
]

const dummyCourse = [
    {name: "Machine Learning Introduction", code: 5024, description: "Welcome to CS 5024", department: "CS", instructor: "teacher1@vt.edu"},
    {name: "Data Analtics", code: 5040, description: "Welcome to CS 5040", department: "CS", instructor: "teacher1@vt.edu"},
    {name: "Software engineering", code: 5035, description: "Welcome to CS 5035", department: "CS", instructor: "teacher2@vt.edu"},
    {name: "Data Structure", code: 5049, description: "Welcome to CS 5049", department: "CS", instructor: "teacher2@vt.edu"},
    {name: "Web Application Development", code: 5031, description: "Welcome to CS 5031", department: "CS", instructor: "teacher2@vt.edu"},
    {name: "Social Media Analytics", code: 5132, description: "Welcome to CS 5132", department: "CS", instructor: "teacher3@vt.edu"},
    {name: "Urban Computing", code: 5236, description: "Welcome to CS 5236", department: "CS", instructor: "teacher3@vt.edu"},
    {name: "Network Security Introduction", code: 5422, description: "Welcome to CS 5422", department: "CS & ECE", instructor: "teacher4@vt.edu"},
]

const dummyNews = [
    {
        title: "Welcome to new semester",
        body: "news body, news body, news body, news body, news body, news body, news body, news body, news body, news body, news body, news body, news body, news body, news bodynews body, news body, news body, news body, news body",
        figureUrl: "",
    },
    {
        title: "New policy for GTA salary",
        body: "news body, news body, news body, news body, news body, news body, news body, news body, news body, news body, news body, news body, news body, news body, news bodynews body, news body, news body, news body, news body",
        figureUrl: "",
    },
    {
        title: "Joining innovation camp",
        body: "news body, news body, news body, news body, news body, news body, news body, news body, news body, news body, news body, news body, news body, news body, news bodynews body, news body, news body, news body, news body",
        figureUrl: "",
    }
]

const dummyRegisted = [
    {course: dummyCourse[0], student: "student1@vt.edu"},
    {course: dummyCourse[1], student: "student1@vt.edu"},
    {course: dummyCourse[7], student: "student1@vt.edu"},
    {course: dummyCourse[2], student: "student2@vt.edu"},
    {course: dummyCourse[3], student: "student2@vt.edu"},
    {course: dummyCourse[8], student: "student2@vt.edu"},
]

const dummyAssignment = [
    {assignmentId: uuidv4(), course: 5024, title: "machine learning assignment 1", detail: [], dueDate: "Feb 23, 23: 59pm", status: "published", files: [], point: 100},
    {assignmentId: uuidv4(), course: 5024, title: "machine learning assignment 2", detail: [], dueDate: "March 13, 23: 59pm", status: "unpublished", files: [], point: 100},
    {assignmentId: uuidv4(), course: 5024, title: "machine learning assignment 3", detail: [], dueDate: "April 14, 23: 59pm", status: "unpublished", files: [], point: 100},
    {assignmentId: uuidv4(), course: 5024, title: "machine learning assignment 4", detail: [], dueDate: "May 16, 23: 59pm", status: "unpublished", files: [], point: 100},
    {assignmentId: uuidv4(), course: 5024, title: "Final Project", detail: [], dueDate: "May 23, 23: 59pm", status: "unpublished", files: [], point: 100},
    {assignmentId: uuidv4(), course: 5040, title: "DA assignment 1", detail: [], dueDate: "March 21, 23: 59pm", status: "published", files: [], point: 100},
]

for (const dummycourse of dummyCourse) {
    dummycourse.tabs = [{ name: "Home", visible: true }, { name: "Announcement", visible: true}, { name: "Assignment", visible: true }, { name: "Grade", visible: true }, { name: "Files", visible: true }, { name: "Discussions", visible: true }, { name: "People", visible: true }];
    dummycourse.homepage = [{type: 'paragraph',children: [{ text: ` Welcome to ${dummycourse.name}`, bold: true }]}]
}

for (const assignment of dummyAssignment) {
    assignment.detail = [
        {type: 'paragraph',children: [{ text: assignment.title, bold: true }]}
    ]
}

const dummySubmission = [
    
]

const term = "Spring 2022";
const dummyData = {term, dummyUser, dummyCourse, dummyNews, dummyRegisted, dummyAssignment, dummySubmission};
module.exports = dummyData;