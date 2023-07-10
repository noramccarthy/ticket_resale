const StateController = require('../controllers/state.controller')
const {authenticate} = require('../config/jwt.config')

module.exports = (app) => {
    // admin
    app.get("/api/admin/state", authenticate, StateController.findAllStates)

    // client
    app.get("/api/state", StateController.findAllStates);
    app.post("/api/state/create", StateController.createState);
    app.get("/api/state/:id", StateController.findOneState);
}