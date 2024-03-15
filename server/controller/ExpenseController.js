const Expense = require("../Model/ExpenseModel");

/**
 * Store data
 */
exports.create = (req, res) => {
    // validate request
    if (Object.keys(req.body).length === 0) {
        res.status(400).send({ message: "Content can not be emtpy!" });
        return;
    }

    // new user
    const newExpense = new Expense({
        itemName: req.body.itemName,
        itemDescription: req.body.itemDescription,
        itemCost: req.body.itemCost,
        itemCategory: req.body.itemCategory,
        paymentMode: req.body.paymentMode,
        shopDetails: req.body.shopDetails,
        userId: req.body.userId
    })

    // save user in the database
    newExpense
        .save(newExpense)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error occurred while creating an expense"
            });
        });
}

/**
 * Get all data or by ID 
 */

exports.find = (req, res) => {

    // Get data by ID
    if (req.query.id || req.query.userId) {
        const expenseId = req.query.id;
        const userId = req.query.userId;

        let filter = {};
        if (expenseId && userId)
            filter = {
                $and: [
                    { _id: expenseId },
                    { userId: userId }
                ]
            }
        else
            filter = {
                $or: [
                    { _id: expenseId },
                    { userId: userId }
                ]
            }

        Expense.find(filter)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "Not found expense with id " + expenseId })
                } 
                else if (data.length === 0)
                    res.status(200).send({ message: "Not expense found" });
                else {
                    res.status(200).send(data)
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Error occurred while retrieving expense with id " + expenseId
                })
            })
    }
    // Get all data
    else {
        Expense.find()
            .then(data => {
                if (data.length === 0)
                    res.status(200).send({ message: "Not expenses found" });
                else
                    res.status(200).send(data)
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Error occurred while retriving expense information"
                })
            })
    }
}


/**
 * Update data
 */
exports.update = (req, res) => {

    if (Object.keys(req.body).length === 0) {
        res.status(400).send({ message: "Content can not be emtpy!" });
        return;
    }

    const expenseId = req.params.id;

    Expense.findByIdAndUpdate(expenseId, req.body)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found expense with id " + expenseId });
            else
                res.status(200).send({ message: "Data updated successfully" });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error occurred while updating an expense"
            });
        });
}


/**
 * Delete data
 */
exports.delete = (req, res) => {
    const expenseId = req.params.id;

    Expense.findByIdAndDelete(expenseId)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found expense with id " + expenseId });
            else
                res.status(200).send({ message: "Data deleted successfully" });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error occurred while deleting an expense"
            });
        });
}


/**
 * Get Numbers
 */

exports.numbers = (req, res) => {
    Expense.aggregate([
        {
            $group: {
                _id: null,
                totalCost: {
                    $sum: "$itemCost"
                },
                avgCost: {
                    $avg: "$itemCost"
                },
                totalExpense: {
                    $sum: 1
                }
            }
        }
    ])
        .then(data => {
            if (data.length === 0)
                res.status(200).send({ message: "Not data found" });
            else{
                data[0].avgCost = data[0].avgCost.toFixed(2);
                res.status(200).send(data[0]);
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error occurred while fetching numbers"
            });
        });
}