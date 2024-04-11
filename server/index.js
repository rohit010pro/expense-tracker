const express = require('express');
const path = require('path');
const bodyparser = require("body-parser");
const cors = require('cors');

const { accessLog, errorLog, notFound } = require("./middleware/middleware");
const routes = require("./router");
const connectDB = require('./database/connection');

const app = express();
const PORT = process.env.PORT || 3000;

// connecting to DB
connectDB(); 

// Set cores in request header
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(bodyparser.json({limit: "16kb"}));

// parse request to body-parser
app.use(bodyparser.urlencoded({ extended : true, limit: "16kb"}))

app.use('/uploads', express.static('uploads'))

app.use(accessLog);

app.get("/",(req, res)=>{
    res.status(200).send(`<h1>Server is Running</h1>`);
});

app.use("/", routes);

app.use(notFound);

app.use(errorLog);

app.listen(PORT, (error) => {
    if (!error)
        console.log(`Server running at http://127.0.0.1:${PORT}`);
    else
        console.log("Error occurred, server can't start", error);
})

