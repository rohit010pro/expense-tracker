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
app.use(cors()); 

// parse request to body-parser
app.use(bodyparser.urlencoded({ extended : true}))

app.use(express.json());
app.use(accessLog);

app.use("/", routes);

app.use(notFound);

app.use(errorLog);

app.listen(PORT, (error) => {
    if (!error)
        console.log(`Server running at http://127.0.0.1:${PORT}`);
    else
        console.log("Error occurred, server can't start", error);
})

