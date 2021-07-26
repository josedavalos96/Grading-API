const express = require('express');
const app = express();
const routes = require("./routes/routes");

const PORT = 3000;
app.use(express.json());



app.use("/v1/students/", routes.student);


// Root of project
app.use("/", (req, res) => {
    res.status(200).json({ root: "Root of Project. No Routes were found." });
});

// Default response for any other request
app.use(function(req, res){
    res.status(404);
});

app.listen(PORT, () => {
    console.log("Server listening on PORT: " + PORT);
});
