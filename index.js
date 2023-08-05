require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const routes = require("./src/routes");
const app = express();
const PORT = process.env.PORT || 5000;
const dbConnection = require("./src/config/db");
const {
  LostErrorHandler,
  AppErrorHandler,
} = require("./src/config/exceptionHandlers/handler");
const PromptModel = require("./src/models/prompt");

app.use(cors({})); // Enable Cross Origin Resource Sharing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send("Hello Welcome to API🙃 !!");
});

app.use("/api", routes);

// Handle unregistered route for all HTTP Methods
app.all("*", function (req, res, next) {
  // Forward to next closest middleware
  next();
});

app.use(LostErrorHandler); // 404 error handler middleware
app.use(AppErrorHandler); // General app error handler

/* 
  5. APPLICATION BOOT UP 🖥️
*/
app.on("ready", () => {
  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
  });
});

dbConnection.then(async  () => {
  console.log("---Database is connected !!---");
  app.emit("ready");
  const initialData = [
    { title: "Prompt1", content: "" },
    { title: "Prompt2", content: "" },
    { title: "Prompt3", content: "" },
    { title: "Prompt4", content: "" },
    { title: "Prompt5", content: "" },
    { title: "Prompt6", content: "" },
    { title: "Prompt7", content: "" },
    // Add more objects as needed
  ];
  const existingData = await PromptModel.countDocuments();
  if(existingData == 0 ) {
    PromptModel.create(initialData)
    .then(() => {
      console.log("Initial data inserted successfully.");
    })
    .catch((error) => {
      console.error("Error inserting initial data:", error);
    });
  }
  else {
    console.log('Initial data already exists');
  }
});
