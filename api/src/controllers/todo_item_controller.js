const {validationResult} = require('express-validator');
const db = require("../models");
const TodoItemModel = db.todo_item;
const Op = db.Sequelize.Op;
const Response = require('../helpers/response_helper');

const getAll = (req, res) => {
    const title = req.query.title;
    const activity_group_id = req.query.activity_group_id;
    const priority = req.query.priority;
    const is_active = req.query.is_active;
    
    var condition = Object.assign(
        { deleted_at: null },
        title ? { title: { [Op.like]: `%${title}%` } } : null,
        activity_group_id ? { activity_group_id: activity_group_id } : null,
        priority ? { priority: priority } : null,
        is_active ? { is_active: (is_active === 'true' ? 1:0) } : null,
    ) ;
    
    TodoItemModel.findAll({
        where: condition
    }).then(data => {
        if(data.length > 0){
            Response.success(res, data, 'getAll');
        }
        else{
            Response.error(res, "Todo Item Not Found", 404, null);
        }
    }).catch(err => {
        Response.error(res, err.message || "Some error occurred while retrieving todo items.", 500, null);
    });
};

const find = (req, res) => {

    const id = req.params.id;

    TodoItemModel.findOne({
        where: {               
            id: id,             
            deleted_at: null, 
        }
    }).then(data => {
        
        if (data) {
            Response.success(res, data, 'find');
        } else {
           Response.error(res, `Todo Item with ID ${id} Not Found`, 404, null);
        }
    }).catch(err => {
        Response.error(res, err.message || "Some error occurred while retrieving todo items.", 500, null);
    });
};

const create =  (req, res) => {

    const errors = validationResult(req);
    
    if(errors.array().length > 0){
        Response.error(res, errors.array(), 400, null);
    }
    else{
       const todo_item = {
            title: req.body.title,
            activity_group_id: req.body.activity_group_id,
            is_active : (!req.body.is_active || req.body.is_active == '' )  ? true : req.body.is_active,
            priority : (!req.body.priority || req.body.priority == '') ? 'very-high' : req.body.priority,
            created_at : new Date(),      
            updated_at : new Date(),
        };

        TodoItemModel.create(todo_item).then((data) => {
       
            if(data){
             
                Response.success(res, data, 'create');
            }
            else{
                Response.error(res, "occur error: create fail", 400, null);
            }
        }).catch((err) => {
            Response.error(res, err.message || "Some error occurred while creating activity groups.", 500, null);
        });
    }
};

const update =  async(req, res) => {

    const errors = validationResult(req);
    
    if(errors.array().length > 0){
        Response.error(res, errors.array(), 400, null);
    }
    else{
        const id = req.params.id;
      
        const todoItem = await TodoItemModel.findOne({
                                                        where: {               
                                                            id: id,             
                                                            deleted_at: null, 
                                                        }
                                                    });
        
        if (todoItem) {
            
            try{
                todoItem.title = req.body.title;
                todoItem.activity_group_id = req.body.activity_group_id;
                todoItem.is_active = (!req.body.is_active || req.body.is_active == '' )  ? true : req.body.is_active;
                todoItem.priority = (!req.body.priority || req.body.priority == '') ? 'very-high' : req.body.priority;
                todoItem.updated_at = new Date();
                await todoItem.save();
            } 
            catch(err) {
                Response.error(res, err.message || "Some error occurred while updating todo items.", 500, null);
            };
            
            Response.success(res, todoItem, 'update');
        }
        else{
            Response.error(res, `Todo Item with ID ${id} Not Found`, 404, null);
        }
    }
};

const destroy =  async(req, res) => {

    const id = req.params.id;
    
    const todoItem = await TodoItemModel.findOne({
                                                    where: {               
                                                        id: id,             
                                                        deleted_at: null, 
                                                    }
                                                });
        
    if (todoItem) {
        
        try{
            todoItem.deleted_at = new Date();
            await todoItem.save();
        } 
        catch(err) {
            Response.error(res, err.message || "Some error occurred while deleting todo items.", 500, null);
        };
        
        Response.success(res, todoItem, 'delete');
    }
    else{
        Response.error(res, `Todo Item with ID ${id} Not Found`, 404, null);
    }
};

module.exports = {
    getAll,
    find,
    create,
    update,
    destroy
};