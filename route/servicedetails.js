const express = require("express");
const router = express.Router();
const servicedetailscontroller = require("../controller/servicedetails");



router.get(
  "/getbookingservicepagewise",
  servicedetailscontroller.getbookingservicepagewise
);


module.exports = router;
