const Lead = require("../models/Lead");

exports.create = async (userDTO) => {
  try {
    const lead = await new Lead(userDTO);
    lead.save();
    return { lead, message: null };
  } catch (err) {
    return { lead: null, message: err };
  }
};
