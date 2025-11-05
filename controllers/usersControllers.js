const response = require("../utils/response");
const db = require("../config/connection");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET;
const options = {
  expiresIn : process.env.JWT_EXPIRE
}

const bcrypt = require("bcrypt");

exports.Register = async (req, res) => {
  try {
    const { nama, email, password } = req.body;
    if (!nama && !email && !password) {
      response(500, "isi data terlebih dahulu", null, res);
    }

    const sql = "INSERT INTO users (nama,email,password) VALUES (?,?,?)";
    const hashPassword = await bcrypt.hash(password, 10);
    const [result] = await db.execute(sql, [nama, email, hashPassword]);
    response(200, "user berhasil ditambah", { id: result.insertId, result }, res);
  } catch (error) {
    console.log("error :", error);
    response(500, "terjadi kesalahan", error, res);
  }
};

exports.showUsers = async (req, res) => {
  try {
    const sql = "SELECT * FROM users";
    const [result] = await db.execute(sql);
    if (result.length === 0) {
      response(500, "user tidak ada", result.insertId, res);
    }
    response(200, "list users", result, res);
  } catch (error) {
    response(501, "Terjadi kesalahan database", error, res);
  }
};

("LOGIN TANPA JWT DAN SESSION");
// exports.Login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const sql = "SELECT * FROM users where email = ?";
//     const [result] = await db.execute(sql, [email]);

//     if (result.length === 0) {
//       response(200, "email tidak ditemukan", null, res);
//     }

//     const user = result[0];
//     const isPassword = await bcrypt.compare(password, user.password);
//     if (!isPassword) {
//       response(401, "Password salah!!", { isSuccess: false }, res);
//     }
//     const data = {
//       id: user.id,
//       user: user.nama,
//       email: user.email,
//       isSuccess: true,
//     };
//     response(200, "anda berhasil login", data, res);
//   } catch (error) {
//     console.log(error.message);
//     response(500, "terjadi kesalahan", error, res);
//   }
// };

("LOGIN DENGAN jwt");

exports.Login = async (req, res) => {
  try {
    const { email, password} = req.body;
    const sql = "SELECT * FROM users where email = ?";
    const [result] = await db.execute(sql, [email]);

    if (result.length === 0) {
      response(200, "email tidak ditemukan", null, res);
    }
    const user = result[0];
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      response(401, "Password salah!!", { isSuccess: false }, res);
    }
    const payload = {
      id: user.id,
      nama: user.nama,
      email: user.email,
    };
    const token = jwt.sign(payload, SECRET_KEY, options);
    const data = {
      token: token,
      isSuccess: true,
    };
    response(200, "anda berhasil login", data, res);
  } catch (error) {
    console.log(error.message);
    response(500, "terjadi kesalahan", error, res);
    
  }
};
