//backend CRUD API script in nodejs using express
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const reviewsRouter = require("./routes/review.route.js");
const cors = require('cors');
require('dotenv').config();

//configuring middleware
app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
    //testing purposes
    res.send("hello from node API");
});

//routes
app.use("/api/v1/reviews", reviewsRouter);
app.use("*", (req, res) => res.status(404).json({error: "not found"})); //wildcard




//connect with database
mongoose.connect(`mongodb+srv://${process.env.mongo_username}:${process.env.mongo_password}@cluster0.neowlj6.mongodb.net/Review-API?retryWrites=true&w=majority&appName=Cluster0`)
    .then(() => {
        console.log("connected to the database");
        app.listen(process.env.PORT, ()=>{
            console.log("Server running on port 3000");
        })
    })
    .catch(() => {
        console.log("connection failed");
    });


//export the app, make it global
module.exports = app;
