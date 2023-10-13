const mongoose = require("mongoose")

const contactSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true
    },
    social: String,
    phone: Number,
    message: String,
    read: Number
})

const contact = new mongoose.model("contact", contactSchema)

module.exports = contact