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
    {name: "Software engineering", code: 5035, description: "Welcome to CS 5035", department: "CS", instructor: "teacher2@vt.edu"},
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
        title: "New policy for GAT salary",
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

const dummyData = {dummyUser, dummyCourse, dummyNews, dummyRegisted};
module.exports = dummyData;