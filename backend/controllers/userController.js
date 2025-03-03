const User = require("../models/user");
import cloudinary from "../services/cloudinary";

const updateProfileController = async (req, res) => {
    try {
        const { profilePic } = req.body;
        const userId = req.user._id;
        if (!profilePic) {
            return res.status(400).json({ message: "profile pic is required" });
        }
        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePic: uploadResponse.secure_url },
            { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (error) {
        console.log("couldn't update profile picture");
        res.status(500).json({ message: "internal server error" });
    }
};

module.exports = { updateProfileController };
