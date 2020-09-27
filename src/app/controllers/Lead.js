const LeadService = require("../services/lead");

exports.register = async (req, res) => {
  try {
    const lead = await LeadService.create(req.body);
    return res.status(200).json({ lead });
  } catch (err) {
    return res.status(400).json({ err });
  }
};
