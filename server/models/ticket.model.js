const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema({
    // reference
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    lon: {
        type: Number,
        required: [true]
    },
    lat: {
        type: Number,
        required: [true]
    },
    address: {
        type: String,
        required: [ true, "Address is required."]
    },
    city: {
        type: String,
        required: [ true, "City is required."]
    },
    artist: {
        type: String,
        required: [ true, "Artist is required."]
    },
    date: {
        type: Date,
        required: [true, "Date is required."]
    },
    location: {
        type: String,
        required: [true, "Location is required."]
    },
    state: {
        type: String,
        required: [true, "State is required."]
    },
    category: {
        type: String,
        required: [true, "Category is required."]
    },
    image: {
        type: String,
    },
    price: {
        type: Number,
        required: [true, "Price is required."],
        min:[1.00, "Price must be greater than $1.00"],
    },
    stock: {
        type: Number,
        required: [true, "How many tickets are you selling?"],
        min: [1, "How many tickets are you selling?"],
        validate: {
            validator: Number.isInteger,
            message: "Quantity must be a whole number."
        }
    },
    onSale: {
        type: Boolean,
        default: false
    },
    discount: {
        type: Number,
        default: 0,
        min: [0.0, "Ticket must be discounted at least 0"]
    },
    sold: {
        type: Boolean,
        default: false,
    },
    section: {
        type: String,
        required: [true, "Section is required."]
    },
    row: {
        type: String,
        required: [true, "Row is required."]
    },
    seat: {
        type: String,
        required: [true, "Seat is required."]
    }
}, {timestamps: true});

const Ticket = mongoose.model("Ticket", TicketSchema);
module.exports = Ticket;