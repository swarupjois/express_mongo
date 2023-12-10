const express = require('express');
const errorHandler = require('./middleware/errorhandler');
const connectDb = require('./config/dbConnection');
const dotenv = require("dotenv").config();

// invoke mongo
connectDb();

const app = express();

const port = process.env.PORT || 5000;
console.log("process.env.PORT--", process.env.PORT);

// app.get("/api/contacts", (req, res) => {
//     res.json({message: "success"})
// });

//provide a parser which will help us to parse the data stream recieved from the client on the server side
app.use(express.json());

//middleware
app.use("/api/contacts", require("./routes/contactRoutes"));

//by default error will be display in html format, using middleware we can format in json  
app.use(errorHandler);

//liseten port
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
