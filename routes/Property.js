const express = require("express");
const { addProperty } = require("../controllers/Property");
const upload = require("../utils/multerFile");

const propertyRouter = express.Router();

propertyRouter.post("/add-property" ,upload.array('images') ,addProperty);

module.exports = propertyRouter