const TicketController = require('../controllers/ticket.controller');
const {authenticate} = require('../config/jwt.config');
const Ticket = require('../models/ticket.model');

module.exports = (app) => {
    // admin
    app.get("/api/admin/ticket", authenticate, TicketController.findAllTickets)
    app.get("/api/admin/ticket/:id", authenticate, TicketController.findOneTicket)
    app.put("/api/admin/ticket/:id", authenticate, TicketController.updateTicket);
    app.delete("/api/admin/ticket/:id", authenticate, TicketController.deleteTicket);
    app.get("/api/admin/yourtickets", authenticate, TicketController.findAllTicketsByUserId);
    
    // client
    app.post("/api/ticket", TicketController.createTicket);
    app.get("/api/ticket", TicketController.findAllTickets);
    app.get("/api/ticket/deals", TicketController.findAllDeals);
    app.get("/api/ticket/concerts", TicketController.findAllConcerts);
    app.get("/api/ticket/sports", TicketController.findAllSports);
    app.get("/api/ticket/theater", TicketController.findAllTheater);
    app.get("/api/ticket/search", TicketController.searchTickets);

    app.get("/api/ticket/:id", TicketController.findOneTicket);
    app.put("/api/ticket/update/:id", TicketController.updateStock);
    app.delete("/api/ticket/delete/:id", TicketController.deleteTicket);


}