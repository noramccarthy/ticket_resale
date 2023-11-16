const MapController = require ('../controllers/map.controller')

module.exports = (app) => {
    app.post("/api/load", MapController.load);
}