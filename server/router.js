const express = require("express");
const route = express.Router();

const expenseController = require("./controller/ExpenseController");
const userController = require("./controller/UserController");
const categoryController = require("./controller/CategoryController");

// API - Expense 

route.get("/api/expenses", expenseController.find);

route.get("/api/expenses/numbers", expenseController.numbers);

route.post("/api/expenses", expenseController.create);

route.put("/api/expenses/:id", expenseController.update);

route.delete("/api/expenses/:id", expenseController.delete);


// API - Users

route.get("/api/users", userController.find);

route.post("/api/users", userController.create);

route.put("/api/users/:id", userController.update);

route.delete("/api/users/:id", userController.delete);


// API - Categories

route.get("/api/categories", categoryController.find);

route.get("/api/categories/:id", categoryController.find);


module.exports = route;
