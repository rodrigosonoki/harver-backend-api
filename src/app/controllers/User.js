const AuthService = require("../services/auth");

exports.register = async (req, res) => {
  try {
    const { user, message } = await AuthService.register(req.body);
    if (!user) return res.status(400).json({ message });
    return res.status(200).json({ user });
  } catch (err) {
    return res.status(400).json({ err });
  }
};

exports.login = async (req, res) => {
  try {
    const { token, message } = await AuthService.login(req.body);
    if (!token) return res.status(400).json({ message });
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(400).json({ err });
  }
};
