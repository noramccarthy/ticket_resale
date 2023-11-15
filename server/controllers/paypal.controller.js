
module.exports = {
    // my-server/create-paypal-order
    create: async (req, res) => {
        try {
            const order = await paypal.createOrder();
            res.json(order);
            } catch (err) {
            res.status(500).send(err.message);
            }
    },

    // my-server/capture/paypal-order
    order: async (req, res) => {
        const { orderID } = req.body;
        try {
        const captureData = await paypal.capturePayment(orderID);
        res.json(captureData);
        } catch (err) {
        res.status(500).send(err.message);
        }
    }
}