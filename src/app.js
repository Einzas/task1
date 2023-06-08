const express = require("express");
const app = express();

app.use(express.json());

const userRoutes = require("./routes/users.routes");
const repairRoutes = require("./routes/repairs.routes");

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/repairs", repairRoutes);

module.exports = app;
