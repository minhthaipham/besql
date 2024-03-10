const { poolPromise } = require("../database/config");
const bcryptjs = require("bcryptjs");
const login = async (req, res, next) => {
  try {
    await poolPromise.connect();
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      res.send("Email and password are required");
      return;
    }
    const query = `SELECT * FROM Users WHERE Email = '${email}' AND Password = '${password}'`;
    const result = await poolPromise.request().query(query);
    const user = result.recordset;
    if (user.length === 0) {
      res.status(401);
      res.send("Invalid username or password");
    } else {
      res.json(user);
    }
  } catch (err) {
    next(err);
    return;
  }
};

const register = async (req, res, next) => {
  try {
    await poolPromise.connect();
    const { email, password, confirmPassword, FullName } = req.body;
    if (!email || !password || !confirmPassword || !FullName) {
      res.status(400);
      res.send("Email, password, confirm password and full name are required");
      return;
    }
    if (password !== confirmPassword) {
      res.status(400);
      res.send("Password and confirm password do not match");
      return;
    }
    const hashedPassword = bcryptjs.hashSync(password, 10);

    const query = `INSERT INTO Users (Email, Password, FullName) VALUES ('${email}', '${hashedPassword}', '${FullName}')`;
    const result = await poolPromise.request().query(query);
    res.json({
      message: "User registered successfully",
      data: result.recordset,
    });
  } catch (err) {
    next(err);
    return;
  }
};

module.exports = {
  login,
  register,
};
