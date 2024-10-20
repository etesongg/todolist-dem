const User = require("../model/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const userController = {};

// 회원가입
userController.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email }); // { email:email }
    if (!name || !email || !password) {
      throw new Error("정보를 모두 입력해 주세요.");
    }
    if (user) {
      throw new Error("이미 가입 된 유저 입니다.");
    }
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = new User({ name, email, password: hash });
    await newUser.save();
    res.status(200).json({ status: "success" });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

// 로그인
userController.loginWithEmail = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }, "-createdAt -updatedAt -__v");
    if (user) {
      // password 유저가 입력한 그 자체, user.pasword 암호화된 패스워드
      const isMatch = bcrypt.compareSync(password, user.password);
      if (isMatch) {
        const token = user.generateToken();
        return res.status(200).json({ status: "success", user, token });
      }
      throw new Error("아이디 또는 비밀번호가 일치하지 않습니다.");
    }
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

userController.getUser = async (req, res) => {
  try {
    const { userId } = req;
    const user = await User.findById(userId).select(
      "-createdAt -updatedAt -__v"
    );
    if (!user) {
      throw new Error("can not find user");
    }
    res.status(200).json({ status: "success", user });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

module.exports = userController;
