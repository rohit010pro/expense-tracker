const User = require("../Model/UserModel");


/**
 *  @description Create User
 *  @method POST
 */
exports.create = (req, res) => {
    if (Object.keys(req.body).length === 0) {
        res.status(400).send({ message: "Content can not be emtpy!" });
        return;
    }

    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    newUser.save()
        .then(data => {
            res.status(200).send({ message: "User created successfully" });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error while creating a user"
            })
        })
}


/**
 *  @description Get User
 *  @method GET
 */
exports.find = (req, res) => {
    if (req.query.id) {
        const userId = req.query.id;

        User.findById(userId)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "Not found user with Id: " + userId })
                } else {
                    res.status(200).send(data)
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Error while finding a user with Id: " + userId
                })
            })
    } else {
        User.find()
            .then(data => {
                res.status(200).send(data)
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Error while finding a users"
                })
            })
    }
}


/**
 *  @description Update User
 *  @method PUT
 */
exports.update = (req, res) => {
    if (Object.keys(req.body).length === 0) {
        res.status(400).send({ message: "Content can not be emtpy!" });
        return;
    }

    const userId = req.params.id;

    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    User.findByIdAndUpdate(userId, req.body)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found user with id: " + userId });
            else
                res.status(200).send({ message: "User updated successfully" });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error while updating a user"
            })
        })
}


/**
 *  @description Delete User
 *  @method DELETE
 */
exports.delete = (req, res) => {
    const userId = req.params.id;

    User.findByIdAndDelete(userId)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found user with id: " + userId });
            else
                res.status(200).send({ message: "User deleted successfully" });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error while deleting a user"
            })
        })
}