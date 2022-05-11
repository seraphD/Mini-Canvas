const express = require('express')
const bodyParser = require('body-parser')
const cors = require("cors")
const app = express()
const port = 4000
const dummyData = require("./dummyData");
const { v4: uuidv4 } = require('uuid');
const pool = require("./mysql.js");

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
    const {course, tabName, visibility} = req.body;

    const setTabVivibility = () => new Promise((resolve, reject) => {
        const sql = `
        update course
        set coursepage=JSON_REPLACE(
            \`coursepage\`,
            '$.tabs.${tabName}',
            ${visibility}
        )
        where id=${course}
        `;

        pool.query(sql, (err, res) => {
            console.log(err);
            if (err) reject(err);
            else resolve(res);
        })
    })

    setTabVivibility().then(() => res.status(200).end()).catch(err => res.status(404).end());
})

app.get("/assignmentlist", (req, res) => {
    const {role, course} = req.query;

    const getAssignmentList = (role, course) => new Promise((resolve, reject) => {
        let sql = `
        select title, duedate, status, point
        from assignment
        where courseid=${course} ${role === "student" ? "and status='puslished' or status='closed'" : ""}
        `
        
        pool.query(sql, (err, res) => {
            if (err) reject(err);
            else resolve(res);
        })
    })

    getAssignmentList(role, course).then(data => res.send(data)).catch(err => res.status(404).end());
})

app.post("/editcoursepage", (req, res) => {
    const { homepage, course } = req.body;

    const updateCoursePage = (homepage, id) => new Promise((resolve, reject) => {
        const sql = `
        update course
        set coursepage=JSON_REPLACE(
            \`coursepage\`,
            "$.homepage",
            '${homepage}'
        )
        where id=${id};
        `;

        pool.query(sql, (err, res) => {
            if (err) reject(err);
            else resolve(res);
        })
    })

    updateCoursePage(homepage, course).then(data => res.send(data)).catch(err => res.status(404).end());
})

app.get("/coursepage", (req, res) => {
    const {course} = req.query;

    const findCoursePage = (id) => new Promise((resolve, reject) => {
        const sql = `select name, coursepage from course where id=${id}`;
        pool.query(sql, (err, res) => {
            if (err) reject(err);
            else resolve(res);
        })
    })

    findCoursePage(course).then(data => res.send(data)).catch(err => res.status(404).end());
})

app.get("/todolist", (req, res) => {
    const { userId, course } = req.query;
    const getTodoList = (userId, course) => new Promise((resolve, reject) => {
        const sql = `
        SELECT title, duedate, point 
        FROM assignment as a, registration as r 
        where a.courseid=r.courseid ${course ? `and r.courseid=${course}` : ""} and r.studentid="${userId} and a.status='published'";
        `;
        pool.query(sql, (err, res) => {
            if (err) reject(err);
            else {
                resolve(res);
            }
        })
    })

    getTodoList(userId, course).then(data => res.send(data)).catch(err => res.status(404).end());
})

app.get("/courselist", (req, res) => {
    const { userid, role } = req.query;
    const getStuCourseList = (id) => new Promise((resolve, reject) => {
        const sql = `
            SELECT courseid, name, department 
            FROM registration as r, course as c
            where r.courseid=c.id and r.studentid=${id}
        `;
        pool.query(sql, (err, res) => {
            if (err) reject(err);
            else {
                resolve(res);
            }
        })
    })

    const getInsCourseList = (id) => new Promise((resolve, reject) => {
        const sql = `select id, name, department from course where instructor=${id}`;
        pool.query(sql, (err, res) => {
            if (err) reject(err);
            else {
                resolve(res);
            }
        })
    })

    if (role === "student") {
        getStuCourseList(userid).then(data => {
            res.send(data);
        }).catch(err => res.status(404).end());
    }
    else {
        getInsCourseList(userid).then(data => res.send(data)).catch(err => res.status(404).end());
    }
})

app.get("/newslist", (req, res) => {
    const fetchNews = () => new Promise((resolve, reject) => {
        const sql = `select * from news`;
        pool.query(sql, (err, res) => {
            if (err) reject();
            else {
                resolve(res);
            }
        })
    })

    fetchNews().then(
        news => res.send(news)
    )
    .catch(err => {
        res.status(404).end();
    })
})

app.post('/login', async (req, res) => {
    const {userName, password} = req.body;

    const validate = (userName) => {
        return new Promise((resolve, reject) => {
            const sql = `select email, password, role from user where username="${userName}"`;
            pool.query(sql, (err, res) => {
                if (err) reject(err);
                else {
                    if (password === res[0].password) {
                        resolve(res[0]);
                    }
                    else {
                        reject();
                    }
                }
            })
        })
    }

    validate(userName).then(user => {
        res.send(user)
    })
    .catch(err => {
        res.status(404).end();
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