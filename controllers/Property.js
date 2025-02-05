const Property = require("../models/Property")
const imageUploader = require("../utils/imageUploader")


exports.addProperty = async (req, res) => {
    try {
        const { name, description, address, city, state, country, price_per_night, location, amenites, house_rules, } = req.body;
        const images = req.file

        if (!name || !description || !address || !city || !state || !country || !price_per_night || !images || !category || !amenites || house_rules || !location) {
            return res.status(400).json({ success: false, message: "Please fill in all fields." })
        }

        if (images.length == 0) {
            return res.status(400).json({ success: false, message: "Please add at least one image" });
        }
        const image_urls = []

        images.map((elem) => {
            const uploadRseult = imageUploader(elem)
            image_urls.push(uploadRseult.secure_url);
        })

        const hostedProperty = await Property.create({
            name,
            description,
            address,
            city,
            state,
            country,
            price_per_night,
            location,
            amenites,
            house_rules,
            images: image_urls,
        })

        res.status(201).json({ success: true, message: "Property added successfully", hostedProperty });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error", error });
    }
}

exports.approveProperty = async (req, res) => {
    try {
        const { propertyId } = req.body;

        //fetch property with it id
        const property = await Property.findById(propertyId);

        //if property doesn't exist
        if (!property) {
            return res.status(404).json({
                success: false, message: "Property not found"
            });
        }

        //check if property is already approve 
        if(property.approval){
            return res.status(400).json({ success: false, message: "Property is already approved"});
        }

        //approve the property 
        property.approval = true;

        //save changes in database
        await property.save();

        return res.status(200).json({success : true , message : "Property approved" , property});

    } catch (error) {
        console.error(error);
        res.status(401).json({ success: false, message: "error while approving the property", error});
    }
}