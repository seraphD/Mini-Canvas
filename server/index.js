const express = require('express')
const bodyParser = require('body-parser')
const cors = require("cors")
const app = express()
const port = 4000
const dummyData = require("./dummyData");
const { v4: uuidv4 } = require('uuid');

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.all('*', function(req, res, next) { 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

app.post("/delassignment", (req, res) => {
    const { assignmentId } = req.body;
    const { dummyAssignment } = dummyData;

    const deleteAssignment = (id) => {
        return new Promise(resolve => {
            for (let i = 0; i < dummyAssignment.length; i++) {
                if (id === dummyAssignment[i].assignmentId) {
                    dummyAssignment.splice(i, 1);
                    resolve();
                }
            }
        })
    }

    deleteAssignment(assignmentId)
    .then(() => res.status(200).end());
})

app.get("/assignmentdetail", (req, res) => {
    const { assignmentId } = req.query;
    const { dummyAssignment } = dummyData;

    const getAssignmentDetail = (id) => {
        return new Promise(resolve => {
            for (const assignment of dummyAssignment) {
                if (assignment.assignmentId === id) {
                    resolve(assignment);
                }
            }
        })
    }
    
    getAssignmentDetail(assignmentId)
    .then(assignment => res.send(assignment));
})

app.post("/newassignment", (req, res) => {
    const { newAssignment } = req.body;
    const newId = uuidv4();
    newAssignment.assignmentId = newId;
    const {dummyAssignment} = dummyData;
    dummyAssignment.push(newAssignment);
    console.log(dummyAssignment.length);
    res.send(newId);
})

app.post("/editassignment", (req, res) => {
    const { newAssignment } = req.body;
    const {dummyAssignment} = dummyData;

    const updateAssignment = (newAssignment) => {
        return new Promise(resolve => {
            for (let i=0; i < dummyAssignment.length; i++) {
                if (dummyAssignment[i].assignmentId === newAssignment.assignmentId) {
                    dummyAssignment[i] = newAssignment;
                    resolve();
                }
            }
        })
    }
    
    updateAssignment(newAssignment)
    .then(() => res.status(200).end());
})

app.post("/tabvisibility", (req, res) => {
    const {courseCode, tabName, visibility} = req.body;

    const setTabVivibility = () => {
        return new Promise(resolve => {
            const {dummyCourse} = dummyData;
            const code = parseInt(courseCode);

            for (const course of dummyCourse) {
                if(course.code === code) {
                    const {tabs} = course;

                    for(const tab of tabs) {
                        if (tab.name === tabName) {
                            tab.visible = visibility;
                            resolve()
                        }
                    }
                }
            }
        })
    }

    setTabVivibility().then(() => res.status(200).end())
})

app.get("/assignmentlist", (req, res) => {
    const {code, role} = req.query;
    const {dummyAssignment} = dummyData;
    const assignmentList = []

    const getAssignmentList = (code, role) => {
        return new Promise((resolve) => {
            for (const assignment of dummyAssignment) {
                if (assignment.course === code) {
                    const {assignmentId, title, dueDate, point, status} = assignment;
    
                    if (role === "student" ) {
                        if (assignment.status === "published") {
                            assignmentList.push({assignmentId, title, dueDate, point, status});
                        }
                    }
                    else {
                        assignmentList.push({assignmentId, title, dueDate, point, status});
                    }
                }
            }
            resolve(assignmentList);
        })
    }

    getAssignmentList(parseInt(code), role)
    .then(assignmentList => {
        res.send(assignmentList);
    })
})

app.post("/editcoursepage", (req, res) => {
    const { value, code } = req.body;
    const {dummyCourse} = dummyData;

    const updateCoursePage = (code) => {
        return new Promise((resolve, reject) => {
            for (const course of dummyCourse) {
                if (course.code === code) {
                    course.homepage = value;
                    resolve();
                }
            }
        })
    }

    updateCoursePage(parseInt(code))
    .then(() => {
        res.send({ success: true });
    })
    .catch(error => {
        res.error();
    })
})

app.get("/coursepage", (req, res) => {
    const {courseCode} = req.query;
    const {dummyCourse} = dummyData;

    const findCoursePage = (code) => {
        const courseCode = parseInt(code);
        return new Promise((resolve) => {
            for (const course of dummyCourse) {
                if (course.code === courseCode) {
                    resolve(course);
                }
            }
        })
    }

    findCoursePage(courseCode)
    .then(data => {
        res.send(data);
    })
})

app.get("/todolist", (req, res) => {
    const { userName, course } = req.query;
    const todoList = [];
    const getTodoList = (userName, course) => {
        return new Promise((resolve, reject) => {
            const { dummyAssignment, dummyRegisted, dummySubmission } = dummyData;
            const isSubmitted = (userName, assignmentId) => {
                for (let submission of dummySubmission) {
                    if (submission.userName === userName && submission.assignmentId === assignmentId) {
                        return true
                    }
                }
                return false
            }

            if (course > 0) {
                for (let assignment of dummyAssignment) {
                    if (assignment.status === 'published' && assignment.course === course && !isSubmitted(userName, assignment.assignmentId)) {
                        todoList.push(assignment);
                    }
                }
            }
            else {
                const registed = [];
                for (let re of dummyRegisted) {
                    if (re.student === userName) {
                        registed.push(re.course.code);
                    }
                }

                for (let assignment of dummyAssignment) {
                    if (assignment.status === 'published' && registed.indexOf(assignment.course) > -1 && !isSubmitted(userName, assignment.assignmentId)) {
                        todoList.push(assignment);
                    }
                }
            }

            resolve(todoList);
        })
    }

    getTodoList(userName, parseInt(course))
    .then(data => {
        res.send(data);
    })
})

app.get("/courselist", (req, res) => {
    const { userName, role } = req.query;
    const getCourseList = (userName, role) => {
        return new Promise((resolve) => {
            const courseList = [];
            if (role === "student") {
                const { dummyRegisted } = dummyData;
                for (const re of dummyRegisted) {
                    if (re.student === userName) courseList.push(re.course);
                }
            }
            else {
                const { dummyCourse } = dummyData;
                for (const course of dummyCourse) {
                    if (course.instructor === userName) courseList.push(course);
                }
            }

            resolve(courseList);
        })
    }

    getCourseList(userName, role).then(data => {
        res.send(data);
    })
})

app.get("/newslist", (req, res) => {
    const {dummyNews} = dummyData;

    res.send(dummyNews);
})

app.post('/login', async (req, res) => {
    const {userName, password} = req.body;

    const {dummyUser} = dummyData;
    const validate = (userName) => {
        return new Promise((resolve, reject) => {
            for (let user of dummyUser) {
                if (user.userName === userName && user.password === password) {
                    const {role, department} = user;
                    resolve({userName, role, department})
                }
            }

            reject()
        })
    }

    validate(userName).then(user => {
        res.send(user)
    })
    .catch(err => {
        res.status(404).end()
    }) 
})

app.get("/term", (req, res) => {
    const {term} = dummyData;
    res.send(term);
})

app.get('/', (req, res) => {
    res.send('Hello World!');
})
  
app.listen(port, () => {
    console.log(`Mini-canvas server running on port ${port}`);
})