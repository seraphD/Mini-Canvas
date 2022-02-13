const express = require('express')
const bodyParser = require('body-parser')
const cors = require("cors")
const app = express()
const port = 4000

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

app.get("/courselist", (req, res) => {
    const { id } = req.query;
    const dummyCourseList = [];
    const dummyCourse = {
        name: "machine learning",
        description: "CS5420",
        department: "CS",
        code: 5420
    }
    dummyCourseList.push(dummyCourse);
    res.send(dummyCourseList);
})

app.get("/newslist", (req, res) => {
    const dummyNewsList = [];
    const dummynews = {
        title: "This is a dummy news",
        body: "news body, news body, news body, news body, news body",
        figureUrl: "temp"
    };

    dummyNewsList.push(dummynews);
    res.send(dummyNewsList);
})

app.post('/login', (req, res) => {
    res.send({userName: "userName"});
})

app.get('/', (req, res) => {
    res.send('Hello World!');
})
  
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})