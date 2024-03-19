const express = require("express");
const route = express.Router();
const multer = require('multer');

const expenseController = require("./controller/ExpenseController");
const userController = require("./controller/UserController");
const categoryController = require("./controller/CategoryController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    cb(null, file.fieldname + '-' + Date.now() + '.' + extension)
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 4 * 1000 * 1000 },
  fileFilter: (req, file, cb) => {
    const extArray = file.mimetype.split("/");
    const extension = extArray[extArray.length - 1];
    const allowedFileTypes = ["pdf", "jpeg", "jpg", "heic", "csv", "msword", "vnd.ms-excel",
      "vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "vnd.openxmlformats-officedocument.wordprocessingml.document"];

    if (!allowedFileTypes.includes(extension)) {
      const error = new Error('Invalid file type');
      error.code = 'INVALID_FILE_TYPE';
      return cb(error, false);
    }
    cb(null, true);
  },
  onError : function(err, next) {
    console.log('error', err);
    next(err);
  }
});

// API - Expense 

route.get("/api/expenses", expenseController.find);

route.get("/api/expenses/numbers", expenseController.numbers);

route.post("/api/expenses", expenseController.create);

route.put("/api/expenses/:id", expenseController.update);

route.delete("/api/expenses/:id", expenseController.delete);

route.post("/api/expenses/file/add", upload.single('bill_file'), expenseController.fileUpload);

route.delete("/api/expenses/file/delete/:file_name", expenseController.fileDelete);


// API - Users

route.get("/api/users", userController.find);

route.post("/api/users", userController.create);

route.put("/api/users/:id", userController.update);

route.delete("/api/users/:id", userController.delete);


// API - Categories

route.get("/api/categories", categoryController.find);

route.get("/api/categories/:id", categoryController.find);


module.exports = route;
