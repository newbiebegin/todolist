const express = require('express');
const activityGroupController = require('../controllers/activity_group_controller');
const {body} = require('express-validator');
const router = new express.Router();

router.get('/', activityGroupController.getAll);
router.get('/:id', 
        activityGroupController.find
    );
router.post('/', 
        body('title').not().isEmpty().escape(),
        body('email').isEmail().normalizeEmail(),
        activityGroupController.create
    );
router.put('/:id', 
        body('title').not().isEmpty().escape(),
        body('email').isEmail().normalizeEmail(),
        activityGroupController.update
    );
    
router.delete('/:id', 
        activityGroupController.destroy
    );

module.exports = router;