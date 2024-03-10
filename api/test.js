const express = require("express");
const router = express.Router();
const { poolPromise } = require("../database/config");

router.get("/test", async (req, res) => {
  try {
    await poolPromise.connect();
    const result = await poolPromise.request().query("SELECT * FROM Users");
    const test = result.recordset;
    res.json(test);
    console.log(test);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

module.exports = router;
