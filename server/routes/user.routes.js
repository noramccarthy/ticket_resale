const UserController = require("../controllers/user.controller");
const {authenticate} = require("../config/jwt.config");

module.exports = (app) => {
    app.post("/api/register", UserController.register);
    app.post("/api/login", UserController.login);
    app.get("/api/logout", UserController.logout);
    app.get("/api/admin/user", authenticate, UserController.getOneUser);
    app.get("/api/user", UserController.getOneUser);
    app.get("/api/users", UserController.findAllUsers);
}