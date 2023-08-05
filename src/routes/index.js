const express = require("express");
const router = express.Router();

const promptRoute = require("./prompt");

router.use("/prompt", promptRoute);

module.exports = router;
