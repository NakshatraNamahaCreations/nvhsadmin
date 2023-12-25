const customerModel = require("../model/customer");

class addcustomer {


  async getcustomerdatapagewise(req, res) {
    try {
      const page = req.query.page || 1;
      const pageSize = 25;
      const skip = (page - 1) * pageSize;
      const searchQuery = req.query.search || "";

      // Set initial filter for type === "userapp"
      const filter = { type: { $in: ["userapp", "website"] } };

      if (searchQuery) {
        // Add additional conditions for customerName and email
        const searchCondition = {
          $or: [
            { customerName: { $regex: searchQuery, $options: "i" } },
            { email: { $regex: searchQuery, $options: "i" } },
          ],
        };
        // Combine the type condition and search condition using $and
        filter.$and = [filter, searchCondition];
      }

      const totalRecords = await customerModel.countDocuments(filter);
      const customer = await customerModel
        .find(filter)
        .sort({ _id: -1 })
        .skip(skip)
        .limit(pageSize);

      if (customer.length > 0) {
        return res
          .status(200)
          .json({ customer, totalRecords, currentPage: page });
      } else {
        return res.status(404).json({ message: "No customer found." });
      }
    } catch (error) {
      console.log("errorcustomersearch ", error.message);
      return res
        .status(500)
        .json({ message: "Internal server error.", error: error.message });
    }
  }
}
const customercontroller = new addcustomer();
module.exports = customercontroller;
