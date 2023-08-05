const express = require("express");
const PromptController = require("../controllers/prompt");

const router = express.Router();

router.get('/', PromptController.getAll);
router.post('/create', PromptController.create);
router.put('/update', PromptController.update);
router.put('/updateByNum', PromptController.updateByNum);
router.delete('/delete', PromptController.delete);

module.exports = router;
