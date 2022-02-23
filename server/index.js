const express = require('express')
const bodyParser = require('body-parser')
const cors = require("cors")
const app = express()
const port = 4000
const dummyData = require("./dummyData");

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
    const { userName } = req.query;
    const { dummyRegisted } = dummyData;
    const filterRegisted = (userName) => {
        return new Promise((resolve, reject) => {
            const registed = [];
            for (let re of dummyRegisted) {
                if (re.student === userName) {
                    registed.push(re.course);
                }
            }
            resolve(registed);
        })
    }

    filterRegisted(userName).then(data => {
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