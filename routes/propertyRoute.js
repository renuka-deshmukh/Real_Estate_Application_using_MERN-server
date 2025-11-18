const express = require('express')
const propertyController = require('../controllers/propertyController')
const {adminOnly, protect} = require('../middleware/auth')
const { uploadMultiple } = require('../middleware/multer')
const router = express.Router()

router.get('/getAllProperties', propertyController.getAllProperties)
router.get('/getPropertyById/:id', propertyController.getPropertyById)
router.post('/createProperty', protect, adminOnly,uploadMultiple("images", 5), propertyController.createProperty)
router.put('updateProperty/:id',protect, adminOnly,uploadMultiple("images", 5), propertyController.updateProperty)
router.delete('/deleteProperty/:id',protect, adminOnly, propertyController.deleteProperty)

module.exports = router