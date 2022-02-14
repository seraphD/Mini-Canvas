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

const dummyCourse = {
    name: "machine learning",
    description: "CS5420",
    department: "CS",
    code: 5420
}

app.all('*', function(req, res, next) { 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

app.get("/todolist", (req, res) => {
    const { id, course } = req.query;
    const todoList = [];
    const dummyItem = {
        course: dummyCourse,
        point: 10,
        dueDate: "Feb 7 at 23:59 PM",
        type: "Assignment",
        name: "machine learning assignment 1",
    }

    todoList.push(dummyItem);

    res.send(todoList);
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

app.get('/', (req, res) => {
    res.send('Hello World!');
})
  
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})