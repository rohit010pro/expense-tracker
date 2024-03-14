const Category = require("../Model/CategoryModel");

exports.find = (req, res) => {

    if(req.params.id){
        const categoryId = req.params.id;

        if(categoryId.length === 24)
            filter = { _id: categoryId };
        else
            filter = { c_id: +categoryId }

        Category.findOne(filter)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Not found category with id " + categoryId })
            } else {
                res.status(200).send(data)
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error occurred while retrieving category with id " + categoryId
            })
        })
    }
    else{
        Category.find()
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "No category found" })
            } else {
                res.status(200).send(data)
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error occurred while retrieving category"
            })
        })
    }
}