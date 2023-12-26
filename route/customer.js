const express = require("express");
const router = express.Router();
const customercontroller = require("../controller/customer");


router.get(
  "/getcustomerdatapagewise",
  customercontroller.getcustomerdatapagewise
);

router.get(
  "/gettotalcustomerlength",
  customercontroller.gettotalcustomerlength
);
module.exports = router;
