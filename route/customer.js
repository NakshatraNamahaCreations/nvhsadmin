const express = require("express");
const router = express.Router();
const customercontroller = require("../controller/customer");


router.get(
  "/getcustomerdatapagewise",
  customercontroller.getcustomerdatapagewise
);

module.exports = router;
