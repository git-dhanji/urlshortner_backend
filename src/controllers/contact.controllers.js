
import contactModel from "../models/contact.model.js";
const contactData = async (req, res, next) => {
    try {
        const { fullName, emailAddress, subject, message } = req.body;
        const user = req.user;

        if (!fullName || !emailAddress || !subject || !message) {
            return res.status(400).json({
                message: "all fields are required",
            });
        }

        const contact = new contactModel({
            fullName,
            emailAddress,
            subject,
            message,
            user: user ? user._id : null,
        });

        
        await contact.save();
        res.status(201).json({
            message: "contact data saved successfully",
        });

    } catch (error) {
        console.log(error);
        next(error);
    }
};



export { contactData };