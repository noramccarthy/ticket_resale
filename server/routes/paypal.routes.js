const PaypalController = require ('../controllers/paypal.controller')

module.exports = (app) => {
    app.post("/api/paypal/create", PaypalController.create);
    app.post("/api/paypal/order", PaypalController.order)
}