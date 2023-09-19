const Category = require('../models/category.model')

module.exports = {
    createCategory: (req, res) => {
        Category.create(req.body)
            .then((newCategory) => {
                console.log(newCategory);
                res.json(newCategory);
            })
            .catch((err) => res.json(400).json({
                message:"Something went wrong with createCategory()",
                error: err
            }))
    },

    findAllCategories:(req, res) => {
        Category.find().sort({categoryName:1})
            .then(categories => res.json({categories}))
            .catch((err) => res.json(400).json({
                message:"Something went wrong with getAllCategories()",
                error: err
            }))
    },

    findOneCategory:(req, res) => {
        Category.findOne({_id: req.params.id})
            .then(oneCategory => res.json({oneCategory}))
            .catch((err) => res.json(400).json({
                message:"Something went wrong with getOneCategory()",
                error: err
            }))
    },

    deleteCategory:(req, res) => {
        Category.findByIdAndDelete(req.params.id)
            .then(deletedCategory => {
                console.log(deletedCategory)
                res.json(deletedCategory)
            })
            .catch((err) => res.status(400).status({
                error:err
            }))
    }
}