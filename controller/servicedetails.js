const servicedetailsmodel = require("../model/servicedetails");





class servicedetails {
  async getbookingservicepagewise(req, res) {
    try {
      const page = req.query.page || 1;
      const pageSize = 15;
      const skip = (page - 1) * pageSize;
      const searchQuery = req.query.search || ""; // Extract search query from request

      // Set initial filter for type === "userapp"
      const filter = { type: { $in: ["userapp", "website"] } };

      if (searchQuery) {
        // Add additional conditions for customerName and email
        const searchCondition = {
          $or: [
            {
              $or: [
                {
                  "customerData.customerName": {
                    $regex: searchQuery,
                    $options: "i",
                  },
                },
                { category: { $regex: searchQuery, $options: "i" } },
                { service: { $regex: searchQuery, $options: "i" } },
                { city: { $regex: searchQuery, $options: "i" } },
              ],
            },
          ],
        };
        // Combine the type condition and search condition using $and
        filter.$and = [filter, searchCondition];
      }

      const totalRecords = await servicedetailsmodel.countDocuments(filter);
      const service = await servicedetailsmodel
        .find(filter)
        .sort({ _id: -1 })
        .skip(skip)
        .limit(pageSize);

      if (service.length > 0) {
        return res
          .status(200)
          .json({ service, totalRecords, currentPage: page });
      } else {
        return res.status(404).json({ message: "No services found." });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Internal server error.", error: error.message });
    }
  }

 
}

const servicedetailscontroller = new servicedetails();
module.exports = servicedetailscontroller;
