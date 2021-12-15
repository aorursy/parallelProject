const path = require("path");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const session = require("express-session");
// var MySQLStore = require('express-mysql-session')(session);

dotenv.config();

const bp = require("body-parser");
const { Router } = require("express");
app.use(express.static(path.join(__dirname)));

/* Router Module for handling routing */
const router = express.Router();
app.use("/", router);

/* Connection to MySQL */
const mysql = require("mysql2");
const { connect } = require("http2");
var connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
});
// module.exports = connection;


const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: 'secret',
    resave: true,
    cookie: { maxAge: oneDay },
    // store: MySQLStore,
    saveUninitialized: true
}));
router.use(bp.json());
router.use(bp.urlencoded({ extended: true }));

// Handle GET: Display index.html
app.get("/", function (req, res) {
    console.log("Send a form");
    res.sendFile(path.join(__dirname + "/index.html"));
});

//check in our MySQL accounts table to see if the details are correct
app.post('/login', function (request, response) {
    var studentid = request.body.studentid;
    var password = request.body.password;

    if (studentid && password) {
        connection.query(('SELECT * FROM users WHERE studentid = ? AND password = ?')
        , [studentid, password], function (error, results, fields) {
            if (results.length > 0) {
                request.session.loggedin = true;
                request.session.studentid = studentid;
                localStorage.setItem("auth",true)
                //response.redirect('/home');
            } else {
                response.send('Incorrect Student ID and/or Password!');
            }
            response.end();
        });
    } else {
        response.send('Please enter Student ID and Password!');
        response.end();
    }
});


app.get('/home', function (request, response) {
    const { studentid, password, status } = request.body;
    if (request.session.loggedin) {
        response.send('Welcome back, ' + request.session.studentid + '!');
    } else {
        response.send('Please login to view this page!');
    }
    response.end();
});

// Server running on the port: 3030
// app.listen(3030, function () { hiiiiiiiiiiiiiiiiiiiiii
//     console.log("Server listening at Port 3030");
// });

router.get("/user", function (req, res) {
    connection.query("SELECT * FROM users", function (error, results) {
        if (error) throw error;
        console.log(results.length);
        return res.send({ error: false, data: results, message: "User retrieved" });
    });
});

app.listen(process.env.PORT, function () {
    console.log("Server listening at Port " + process.env.PORT);
});
