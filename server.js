const express = require("express");
const path = require("path");
const cors = require("cors");

const indexRouter = require("./app/routes/index");
const celebrationsRouter = require("./app/routes/celebrations");

const port = process.env.PORT || 8000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "dist")));

app.use("/", indexRouter);
app.use("/api/celebrations", celebrationsRouter);

app.listen(port, () => {
    console.log('We are live on ' + port);
});
