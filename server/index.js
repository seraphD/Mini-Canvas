const express = require('express')
const bodyParser = require('body-parser')
const cors = require("cors")
const app = express()
const port = 4000
const dummyData = require("./dummyData");
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

app.delete("/delAssignment", (req, res) => {
    const { id } = req.body;

    const deleteAssignment = (id) => new Promise((resolve, reject) => {
        const sql = `
        delete from assignment
        where id=${id}
        `
        pool.query(sql, (err, res) => {
            if (err) reject(err);
            else resolve(res);
        })
    })

    deleteAssignment(id).then((data) => res.send(data[0])).catch(err => res.status(404).end());
})

app.get("/assignmentDetail", (req, res) => {
    const { id } = req.query;

    const getAssignmentDetail = (id) => new Promise((resolve, reject) => {
        const sql = `
        select id as assignmentId, title, detail, duedate, point, detail, status from assignment
        where id=${id};
        `
        pool.query(sql, (err, res) => {
            if (err) reject(err);
            else {
                res[0].detail = JSON.parse(res[0].detail);
                resolve(res);
            }
        })
    })
    
    getAssignmentDetail(id).then((data) => res.send(data[0])).catch(err => res.status(404).end());
})

app.post("/newAssignment", (req, res) => {
    const { course, title, detail, duedate, point } = req.body;
    const newAssginemnt = () => new Promise((resolve, reject) => {
        const sql = `
        insert into assignment (courseid, title, detail, duedate, point)
        values (${course}, '${title}', '${detail}', '${duedate}', ${point});
        `;

        pool.query(sql, (err, res) => {
            if (err) reject(err);
            else resolve(res);
        })
    })

    newAssginemnt().then((data) => res.send(data.insertId)).catch(err => res.status(404).end());
})

app.patch("/editAssignmentDetail", (req, res) => {
    const { id, detail } = req.body;
    const editDetail = (id, detail) => new Promise((resolve, reject) => {
        const sql = `
        update assignment
        set detail='${detail}'
        where id=${id};
        `
        pool.query(sql, (err, res) => {
            if (err) reject(err);
            else resolve(res);
        })
    })

    editDetail(id, detail).then(() => res.status(200).end()).catch(err => res.status(404).end());
})

app.patch("/editAssignmentPoint", (req, res) => {
    const {id, point} = req.body;

    const editPoint = (id, point) => new Promise((resolve, reject) => {
        const sql = `
        update assignment
        set point=${point}
        where id=${id};
        `
        pool.query(sql, (err, res) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            else resolve(res);
        })
    })

    editPoint(id, point).then(() => res.status(200).end()).catch(err => res.status(404).end());
})

app.patch("/editAssignmentDuedate", (req, res) => {
    const {id, duedate} = req.body;

    const editDuedate = (id, duedate) => new Promise((resolve, reject) => {
        const sql = `
        update assignment
        set duedate='${duedate}'
        where id=${id};
        `
        pool.query(sql, (err, res) => {
            if (err) {
                console.log(err);
                reject();
            }
            else resolve(res);
        })
    })

    editDuedate(id, duedate).then(() => res.status(200).end()).catch(err => res.status(404).end());
})

app.patch("/editAssignmentStatus", (req, res) => {
    const {id, status} = req.body;

    const editStatus = (id, status) => new Promise((resolve, reject) => {
        const sql = `
        update assignment
        set status=${status}
        where id=${id};
        `
        pool.query(sql, (err, res) => {
            if (err) reject();
            else resolve();
        })
    })

    editStatus(id, status).then(() => res.status(200).end()).catch(err => res.status(404).end());
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
        select id as assignmentId, title, duedate, status, point
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

app.patch("/editcoursepage", (req, res) => {
    const { homepage, course } = req.body;

    const updateCoursePage = (homepage, id) => new Promise((resolve, reject) => {
        const sql = `
        update course
        set coursepage=JSON_SET(
            \`coursepage\`,
            "$.homepage",
            cast('${homepage}' as JSON)
        )
        where id=${id};
        `;

        pool.query(sql, (err, res) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            else resolve(res);
        })
    })

    updateCoursePage(homepage, course).then(data => res.send(data)).catch(err => res.status(404).end());
})

app.get("/coursepage", (req, res) => {
    const {course} = req.query;

    const findCoursePage = (id) => new Promise((resolve, reject) => {
        const sql = `select name, coursepage, department from course where id=${id}`;
        pool.query(sql, (err, res) => {
            if (err) reject(err);
            else resolve(res[0]);
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
            SELECT courseid, name, department, description, instructor 
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
        const sql = `select id as courseid, name, department, description, instructor from course where instructor=${id}`;
        pool.query(sql, (err, res) => {
            if (err) {
                reject(err);
            }
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
            const sql = `select id, username, password, role, department from user where username="${userName}"`;
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

    validate(userName).then(data => {
        const {id, username, role, department} = data;
        res.send({id, username, role, department});
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