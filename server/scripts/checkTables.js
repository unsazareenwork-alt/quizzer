require("dotenv").config();
const db = require("../config/db");

db.query("SHOW TABLES", (err, results) => {
  if (err) {
    console.error(err);
  } else {
    console.table(results);
  }
  process.exit();
});