const router = require("express").Router();
const LeadController = require("../controllers/Lead");

router.post("/create", LeadController.register);

module.exports = router;
