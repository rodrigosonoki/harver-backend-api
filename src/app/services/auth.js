const User = require("../models/User");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

exports.register = async (userInputDTO) => {
  const { email, password } = userInputDTO;

  //CHECK IF USER ALREADY EXISTS
  const isRegistered = async (email) => {
    const registered = await User.findOne({ email });
    if (registered) return true;
  };

  //HASH PASSWORD
  const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);
    return encryptedPassword;
  };

  //CREATE TOKEN FOR VERIFICATION (isVerified)
  const generateIsVerifiedToken = () => {
    const token = crypto.randomBytes(20).toString("hex");
    return token;
  };

  //CREATE USER
  const createUser = async (email, verificationToken, password) => {
    const user = await new User({ email, verificationToken, password });
    await user.save();
    return user;
  };

  if (await isRegistered(email)) {
    return { user: null, message: "Usuário já cadastrado" };
  }

  try {
    const encryptedPassword = await hashPassword(password);
    const token = await generateIsVerifiedToken();
    const user = await createUser(email, token, encryptedPassword);
    return { user, message: null };
  } catch (err) {
    return { user: null, message: err };
  }
};

exports.login = async (userInputDTO) => {
  const { email, password } = userInputDTO;

  //FIND USER
  const findUser = async (email) => {
    const user = await User.findOne({ email });
    if (!user) return false;
    return user;
  };

  //COMPARE PASSWORD
  const comparePassword = async (password, user) => {
    const isPasswordValid = await bcrypt.compare(password, user.password);
    return isPasswordValid;
  };

  //GENERATE TOKEN
  const generateToken = (user) => {
    const token = jwt.sign(
      {
        email: user.emaul,
        id: user._id,
      },
      process.env.SECRET_TOKEN
    );
    return token;
  };

  try {
    const user = await findUser(email);
    if (!user) {
      return { token: null, message: "Credenciais inválidas." };
    }

    const isPasswordValid = await comparePassword(password, user);
    if (!isPasswordValid) {
      return { token: null, message: "Credenciais inválidas." };
    }

    const token = generateToken(user);

    return { token, message: null };
  } catch (err) {
    return { token: null, message: err };
  }
};
