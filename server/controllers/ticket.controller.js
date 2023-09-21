4// contains all our functionality of our API
// how we will interact with the DB

const Ticket = require('../models/ticket.model');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// structure: Model.MongooseQuery()

module.exports = {
    createTicket: async (req, res) => {

        // create a new instance of Ticket
        newTicketObj = new Ticket(req.body)
        console.log(req.body)
        console.log("JWT ID:", req.jwtpayload)

        // grab decoded jwt (json webtoken) to attach the userID to the Ticket instance
        // decode is a method of jsonwebtoken and we use the help of the cookie-parser to make it work
        const decodedJWT = jwt.decode(req.cookies.usertoken, {complete: true})

        // set decoded user ID to ticket.postedBy
        newTicketObj.postedBy = decodedJWT.payload.id

        try {
            const newTicket = await newTicketObj.save()
            return res.status(200).json(newTicket)
        }
        catch(err) {
            console.log("error:", err)
            return res.status(400).json(err)
        }
    },

    findAllTickets: async (req, res) => {
        try {
            const tickets = await Ticket.find()
            console.log("Tickets:", tickets)
            return res.status(200).json(tickets)
        }
        catch(err) {
            console.log("error:", err)
            return res.status(400).json(err)
        }
    },

    findOneTicket: (req, res) => {
        Ticket.findById(req.params.id)
            .then(oneTicket => {
                console.log(oneTicket);
                res.json(oneTicket);
            })
            .catch((err) => res.status(400).json({
                message: "Something went wrong with findOneTicket()",
                error: err
            }))
    },

    findAllTicketsByUserId: (req, res) => {
        Ticket.find({ postedBy: req.jwtpayload.id })
            .then(tickets => {
                console.log("user id:", req.jwtpayload.id)
                console.log(tickets)
                res.json(tickets)
            })
            .catch((err) => res.status(400).json({
                message: "Something went wrong with findAllTicketsByUserId",
                error: err
            }))
    },

    findAllDeals: (req, res) => {
        Ticket.find({ onSale: true})
            .then(deals => {
                console.log(deals)
                res.json(deals)
            })
            .catch((err) => res.status(400).json({
                message: "Something went wrong with findAllDeals",
                error: err
            }))
    },

    findAllConcerts: (req, res) => {
        Ticket.find({category: "concert"})
            .then(tickets => {
                console.log(tickets)
                res.json(tickets)
            })
            .catch((err) => res.status(400).json({
                message: "Something went wrong with findAllConcerts",
                error: err
            }))
    },

    findAllSports: (req, res) => {
        Ticket.find({category: "sports"})
            .then(tickets => {
                console.log(tickets)
                res.json(tickets)
            })
            .catch((err) => res.status(400).json({
                message: "Something went wrong with findAllSports",
                error: err
            }))
    },

    findAllTheater: (req, res) => {
        Ticket.find({category: "theater"})
            .then(tickets => {
                console.log(tickets)
                res.json(tickets)
            })
            .catch((err) => res.status(400).json({
                message: "Something went wrong with findAllTheater",
                error: err
            }))
    },

    updateTicket: (req, res) => {
        Ticket.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
            .then(updatedTicket => {
                console.log(updatedTicket);
                res.json(updatedTicket);
            })
            .catch((err) => res.status(400).json({
                message: "Something went wrong with updateTicket()",
                error: err
            }))
    },

    deleteTicket: (req, res) => {
        Ticket.findByIdAndDelete(req.params.id)
            .then(deletedTicket => {
                console.log(deletedTicket);
                res.json(deletedTicket)
            })
            .catch((err) => res.status(400).json({
                message: "Something went wrong with deleteTicket()",
                error: err
            }))
    },

    updateStock: (req, res) => {
        const {id} = req.params;
        const {quantity} = req.body;
        Ticket.findByIdAndUpdate(id, {stock: quantity}, {new:true, runValidators:true})
            .then((updatedTicket) => res.json({updatedTicket}))
            .catch((err) => res.status(400).json(err));
    },

    uploadFile: (req, res) => {
        try {
            if (!req.files) {
                res.send({
                    status: "Failed",
                    message: "No file uploaded",
                })
            } else {
                let file = req.files.file;
                console.log(req.files);

                file.mv("./uploads/" + file.name);

                res.send({
                    status: "Success",
                    message: "File successfully uploaded",
                    data: {
                        name: file.name,
                        mimetype: file.mimetype,
                        size: file.size,
                    }
                })
            }
        }
        catch (err) {
            res.status(500).json(err);
        }
    }

};