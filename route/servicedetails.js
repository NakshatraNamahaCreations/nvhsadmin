const express = require("express");
const router = express.Router();
const servicedetailscontroller = require("../controller/servicedetails");



router.get(
  "/getbookingservicepagewise",
  servicedetailscontroller.getbookingservicepagewise
);
router.get(
  "/getbookingservicelength",
  servicedetailscontroller.getbookingservicelength
);

module.exports = router;
