//if we use async in order to handle errors we need to use try catch block, so in order to do this we need to add try-catch in all the function
// to achive this we have a good way, we can use of middleware 'express-async-handler' which is going to handle our exceptions inside async express routes
const asyncHandler = require("express-async-handler")
const Contact = require("../models/contactModels");

//@desc Get all contact
//@route GET /api/contacts
//access public
const getAllContacts = asyncHandler(async (req, res) => {
    console.log("req...");
    const contacts = await Contact.find();
    console.log("cont..", contacts);
    res.status(200).json(contacts)
});

//@desc Get contact
//@route GET /api/contacts/id
//access public
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

//@desc Create contact
//@route POST /api/contacts
//access public
const createContact = asyncHandler(async (req, res) => {
    console.log("The request body - ", req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory")
    }
    const contact = await Contact.create({
        name,
        email,
        phone
    });

    res.status(201).json(contact);
});

//@desc Update contact
//@route PUT /api/contacts/id
//access public
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json(updatedContact);
});

//@desc Delete contact
//@route DELETE /api/contacts/id
//access public
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    console.log("contact-", contact);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    const resp = await Contact.deleteOne()
    res.status(200).json(contact)
});

module.exports = {
    getAllContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
}