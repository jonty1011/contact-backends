const ContactModel = require("../models/contactmodel");

// Get all contacts for the logged-in user
const getContact = async (req, res) => {
    try {
        const contacts = await ContactModel.find({ user_id:req.user.id});
        res.status(200).json(contacts);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

// Create a new contact
const createContact = async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        if (!name || !email || !phone) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const contact = await ContactModel.create({
            name,
            email,
            phone,
            user_id: req.user.id, // Use the logged-in user's ID
        });

        res.status(201).json(contact);  // Created successfully
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

// Get a single contact by ID
const getContacts = async (req, res) => {
    try {
        const contact = await ContactModel.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: "Contact not found" });
        }
        res.status(200).json(contact);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

// Update a contact
const updateContact = async (req, res) => {
    try {
        const contact = await ContactModel.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: "Contact not found" });
        }
        if(contact.user_id.toString()!== req.User.id ){
         return res.status(403).json({ message: "User don't have permission to update other contact" });
        }

        contact.name = req.body.name || contact.name;
        contact.email = req.body.email || contact.email;
        contact.phone = req.body.phone || contact.phone;

        /* const updatedContact = await ContactModel.findByIdAndUpdate{
        req.params.id,
        req.body,
        {new:true}} */
        await contact.save();

        // to update contact 

        res.status(200).json(contact);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

// Delete a contact
const deleteContact = async (req, res) => {
    try {
        const contact = await ContactModel.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: "Contact not found" });
        }

        if(contact.user_id.toString()!== req.User.id ){
            return res.status(403).json({ message: "User don't have permission to delete other contact" });
           }

        await ContactModel.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: "Contact deleted" });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

module.exports = {
    getContact,
    createContact,
    getContacts,
    updateContact,
    deleteContact,
};
