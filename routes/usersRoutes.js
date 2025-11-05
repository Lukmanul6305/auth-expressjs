const express = require("express");
const app = express();
const router = express.Router();
const { Register, showUsers, Login } = require("../controllers/usersControllers");

const timeLog = (req, res, next) => {
  console.log(`Time : ${Date.now()}`);
  next();
};
app.use(timeLog);

router.post("/register", Register);
router.post("/login", Login);
router.post("/show", showUsers);
router.post("/login", Login);

module.exports = router;
