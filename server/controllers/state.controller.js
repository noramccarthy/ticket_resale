const State = require('../models/state.model')

module.exports = {
    createState: (req, res) => {
        State.create(req.body)
            .then((newState) => {
                console.log(newState);
                res.json(newState);
            })
            .catch((err) => res.json(400).json({
                message:"Something went wrong with createState()",
                error: err
            }))
    },

    findAllStates:(req, res) => {
        // State.find().sort({stateName:1})
        State.find()
            .then(states => res.json({states}))
            .catch((err) => res.json(400).json({
                message:"Something went wrong with getAllStates()",
                error: err
            }))
    },

    findOneState:(req, res) => {
        State.findOne({_id: req.params.id})
            .then(oneState => res.json({oneState}))
            .catch((err) => res.json(400).json({
                message:"Something went wrong with getOneState()",
                error: err
            }))
    },

    updateState:(req, res) => {
        State.findOneAndUpdate({_id: req.params.id}, req.body)
            .then(updatedState => res.json({updatedState}))
            .catch((err) => res.status(400).json({
                error: err
            }))
    },

    deleteState:(req,res) => {
        State.findByIdAndDelete(req.params.id)
            .then(deletedTicket => {
                res.json(deletedTicket)
                console.log(deletedTicket)
            })
            .catch((err) => res.status(400).json({
                message: "Error with delete",
                error: err
            }))
    }
}