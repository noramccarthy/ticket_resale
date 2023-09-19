const CategoryController = require('../controllers/category.controller')
const {authenticate} = require('../config/jwt.config')

module.exports = (app) => {
    // admin
    app.get("/api/admin/category", authenticate, CategoryController.findAllCategories)

    // client
    app.get("/api/category", CategoryController.findAllCategories);
    app.post("/api/category/create", CategoryController.createCategory);
    app.get("/api/category/:id", CategoryController.findOneCategory);
    app.delete("/api/category/delete/:id", CategoryController.deleteCategory);
}