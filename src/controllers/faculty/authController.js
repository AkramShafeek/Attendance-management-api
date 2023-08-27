const generateToken = require("../../database/generateToken");
const Faculty = require("../../models/Faculty");
const Student = require("../../models/Student");

const login = async (req, res, Target) => {
  const { email, password } = req.body;
  if (!email || !password)
    throw new Error("Invalid username or password");
  const user = await Target.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    user.password = undefined;
    const token = generateToken(user._id);
    return res.status(200).json({ token, user });
  }
  console.log(user);
  return res.status(400).send("Invalid username or password");
}

const facultyLogin = async (req, res) => {
  await login(req, res, Faculty);
}
const studentLogin = async (req, res) => {
  await login(req, res, Student);
}

const testController = async (req, res) => {
  res.send({ user: req.user, status: "Authenticated" });
}

module.exports = { facultyLogin, studentLogin, testController }