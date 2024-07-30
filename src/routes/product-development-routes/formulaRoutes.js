const express = require('express');
const formulaController = require('../../controllers/product-development-controller/formulaController');
const roleMiddleware = require('../../middleware/roleMiddlewaree');

const router = express.Router();

router.get('/get-formulas', roleMiddleware(['admin', 'manager']), formulaController.getAllFormulas);
router.get('/get-formula/:entity_id', roleMiddleware(['admin', 'manager' , 'user']), formulaController.getFormulaById);
router.post('/create-formula', roleMiddleware(['admin', 'manager']), formulaController.createFormula);
router.put('/update-formula/:entity_id', roleMiddleware(['admin', 'manager']), formulaController.updateFormula);
router.delete('/delete-formula/:entity_id',  roleMiddleware(['admin']), formulaController.deleteFormula);

module.exports = router;
