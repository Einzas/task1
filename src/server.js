const app = require("./app");
const { db } = require("./database/config");

db.authenticate()
  .then(() => {
    console.log("Database connected! 🐱‍🐉");
  })
  .catch((err) => {
    console.log("Error: ", err);
  });

db.sync()
  .then(() => {
    console.log("Database synced! 🐱‍🐉");
  })
  .catch((err) => {
    console.log("Error: ", err);
  });

app.listen(3000, () => {
  console.log("Server running on port 3000! 🐱‍🐉");
});
