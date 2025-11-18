const Property = require('../models/propertyModel')

async function getAllProperties(req, res) {
    try {
        const properties = await Property.find()
        res.status(200).json({ properties: properties, success: true })
    } catch (error) {
        console.error(" getAllProperty error", error);
        res.status(500).json({ message: "Server error" });
    }

}

async function getPropertyById(req, res) {
    try {
        const { id } = req.params;

        const property = await Property.findById(id);

        if (!property) {
            return res.status(404).json({ message: "Property not found" });
        }

        res.status(200).json({ success: true, property });
    } catch (error) {
        console.error("getPropertyById error:", error);
        res.status(500).json({ message: "Server error" });
    }
}

async function createProperty(req, res) {
    try {
        const { title, price, location, description, type } = req.body;

        // Handle multiple image uploads from multer
        const imageUrls = req.files.map(file => {
            return `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;
        });

        const newProperty = await Property.create({
            title,
            price,
            location,
            description,
            type,
            imageUrls,
        });

        res.status(201).json({
            success: true,
            message: "Property created successfully",
            property: newProperty,
        });
    } catch (error) {
        console.error("createProperty error:", error);
        res.status(500).json({ message: "Server error" });
    }
}

async function updateProperty(req, res) {
    try {
        const { id } = req.params;

        let updatedData = req.body;

        if (req.files && req.files.length > 0) {
            updatedData.imageUrls = req.files.map(file => {
                return `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;
            });
        }

        const updatedProperty = await Property.findByIdAndUpdate(id, updatedData, {
            new: true,
        });

        if (!updatedProperty) {
            return res.status(404).json({ message: "Property not found" });
        }

        res.status(200).json({
            success: true,
            message: "Property updated successfully",
            property: updatedProperty,
        });
    } catch (error) {
        console.error("updateProperty error:", error);
        res.status(500).json({ message: "Server error" });
    }
}

async function deleteProperty(req, res) {
    try {
        const { id } = req.params;

        const deleted = await Property.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ message: "Property not found" });
        }

        res.status(200).json({
            success: true,
            message: "Property deleted successfully",
        });
    } catch (error) {
        console.error("deleteProperty error:", error);
        res.status(500).json({ message: "Server error" });
    }
}



module.exports = {
    getAllProperties,
    getPropertyById,
    createProperty,
    updateProperty,
    deleteProperty


}