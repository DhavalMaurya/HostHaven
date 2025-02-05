const cloudinary = require("cloudinary").v2
require("dotenv").config();

cloudinary.config({
    cloud_name: 'ddhdbs7xz',
    api_key: '435825357855384',
    api_secret: "7NJVnqIbFRnkmpiliUa4LyABHxw",
})

module.exports = cloudinary
