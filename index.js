const express = require("express");
const app = express();
const path = require("path");

let port = 8080;

app.use(express.static(path.join(__dirname, "/public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/blogs", (req,res) => {
    const blogsData = require("./blogs.json");
    res.render("blog.ejs", { blogsData });
});

app.get("/blogs/:id", (req,res) => {
    let { id } = req.params;
    const blogsData = require("./blogs.json");
    let data = blogsData[id];
    if (data) {
        res.render("blogpost.ejs", { data, id });
    } else {
        res.status(404).send("Blog post not found.");
    }
});

app.listen(port, () => {
    console.log("The port is active now");
});