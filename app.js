/** packages */
const express = require("express");
const config = require("config");
const bodyParser = require("body-parser");

/** app configuration */
const app = express();
const port = config.get("server-port")
const jsonParser = bodyParser.json();
const urlEncodedParser = bodyParser.urlencoded(
    {extended: true}
);

app.use(jsonParser);
app.use(urlEncodedParser);

const ipFn = require("./middleware/getIpAddress");
app.use("*",ipFn);

/** Methods */
app.get("/", (req, res, next) => {
    res.send("Welcome to academic rest api.");
});

// User routes loading
const UserRoutes = require("./routes/user.routes");
UserRoutes(app);

// Token middleware
const tkFn = require("./middleware/verifyToken");
app.use(tkFn)

// Student routes loading
const StudentRoutes = require("./routes/student.routes");
StudentRoutes(app);

// Teacher routes loading
const TeacherRoutes = require("./routes/teacher.routes");
TeacherRoutes(app);

// Period routes loading
const PeriodRoutes = require("./routes/period.routes");
PeriodRoutes(app);

// Course routes loading
const CourseRoutes = require("./routes/course.routes");
CourseRoutes(app);

app.listen(port, () => {
    console.log("Server is running...");
});