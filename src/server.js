require('dotenv').config();
const app = require('./app');
const { db } = require('./database/config');
const initModel = require('./models/initModels');

db.authenticate()
  .then(() => {
    console.log('Database connected! 🐱‍🐉');
  })
  .catch((err) => {
    console.log('Error connecting to database 😞', err);
  });
initModel();
db.sync({
  force: false,
})
  .then(() => {
    console.log('Database synced! 🐱‍🐉');
  })
  .catch((err) => {
    console.log('Error syncing database 😞', err);
  });

app.listen(process.env.PORT, () => {
  console.log('Server running on port 3000! 🐱‍🐉');
});
