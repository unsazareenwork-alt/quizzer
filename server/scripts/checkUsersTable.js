require("dotenv").config();
const db = require("../config/db");

db.query("DESCRIBE users", (err, results) => {
  if (err) {
    console.error(err);
  } else {
    console.table(results);
  }
  process.exit();
});