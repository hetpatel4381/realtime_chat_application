import User from "../models/UserModel.js";

const searchContacts = async (req, res) => {
  try {
    const { searchTerm } = req.body;
    if (!searchTerm) {
      return res.status(400).send("searchTerm is Required!");
    }

    const sanitizedSearchTerm = searchTerm.replace(
      /[.**?^${}()|[\]\\]/g,
      "\\$&"
    );

    const regex = new RegExp(sanitizedSearchTerm, "i");

    const contacts = await User.find({
      $and: [
        { _id: { $ne: req.userId } },
        {
          $or: [{ firstName: regex }, { lastName: regex }, { email: regex }],
        },
      ],
    });

    return res.status(200).json({ contacts });
  } catch (error) {
    return res.status(500).send("Error while logging out the user!");
  }
};

export { searchContacts };
