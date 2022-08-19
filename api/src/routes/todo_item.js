const express = require('express');
const db = require("../models");
const activityGroupModel = db.activity_group;
const todoItemController = require('../controllers/todo_item_controller');
const {body} = require('express-validator');
const router = new express.Router();

router.get('/', todoItemController.getAll);
router.get('/:id', 
        todoItemController.find
    );
router.post('/', 
        body('title').not().isEmpty().escape(),
        body('activity_group_id').not().isEmpty().escape().custom(value => {
                return activityGroupModel.findOne({
                    where: {               
                        id: value,             
                        deleted_at: null, 
                    }
                }).then(acitivityGroup => {
                    if (!acitivityGroup) {
                        return Promise.reject('Activity Group Not Found')
                    }
                })
            }),
        body('is_active').escape(),
        body('priority').escape(),
        todoItemController.create
    );
router.patch('/:id', 
        body('title').not().isEmpty().escape(),
        body('activity_group_id').not().isEmpty().escape().custom(value => {
                return activityGroupModel.findOne({
                    where: {               
                        id: value,             
                        deleted_at: null, 
                    }
                }).then(acitivityGroup => {
                    if (!acitivityGroup) {
                        return Promise.reject('Activity Group Not Found')
                    }
                })
            }),
        body('is_active').escape(),
        body('priority').escape(),
        todoItemController.update
    );
    
router.delete('/:id', 
        todoItemController.destroy
    );

module.exports = router;