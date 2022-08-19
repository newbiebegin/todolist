const {validationResult} = require('express-validator');
const db = require("../models");
const ActivityGroup = db.activity_group;
const Op = db.Sequelize.Op;
const Response = require('../helpers/response_helper');

const getAll = (req, res) => {
    const title = req.query.title;
    const email = req.query.email;

    var conditionTitle = title ? { title: { [Op.like]: `%${title}%` } } : null;
    var conditionEmail = email ? { email: { [Op.like]: `%${email}%` } } : null;
    var condition = conditionTitle;

    ActivityGroup.findAll({
        where: condition
    }).then(data => {
        if(data.length > 0){
            Response.success(res, data, 'getAll');
        }
        else{
            Response.error(res, "Activity Not Found", 404, null);
        }
    }).catch(err => {
        Response.error(res, err.message || "Some error occurred while retrieving activity groups.", 500, null);
    });
};

const find = (req, res) => {

    const id = req.params.id;

    ActivityGroup.findOne({
        where: {               
            id: id,             
            deleted_at: null, 
        }
    }).then(data => {
        
        if (data) {
            Response.success(res, data, 'find');
        } else {
           Response.error(res, `Activity with ID ${id} Not Found`, 404, null);
        }
    }).catch(err => {
        Response.error(res, err.message || "Some error occurred while retrieving activity groups.", 500, null);
    });
};

const create =  (req, res) => {

    const errors = validationResult(req);
    
    if(errors.array().length > 0){
        Response.error(res, errors.array(), 400, null);
    }
    else{
       const activity_group = {
            title: req.body.title,
            email: req.body.email,
            created_at : new Date(),      
            updated_at : new Date(),
        };

        ActivityGroup.create(activity_group).then((data) => {
       
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
      
        const activityGroup = await ActivityGroup.findOne({
            where: {               
                id: id,             
                deleted_at: null, 
            }
        });
        
        if (activityGroup) {
            try{
                activityGroup.title = req.body.title;
                activityGroup.email = req.body.email;
                activityGroup.updated_at = new Date();
                await activityGroup.save();
            } 
            catch(err) {
                Response.error(res, err.message || "Some error occurred while updating activity groups.", 500, null);
            };
            
            Response.success(res, activityGroup, 'update');
        }
        else{
            Response.error(res, `Activity with ID ${id} Not Found`, 404, null);
        }
    }
};

const destroy =  async(req, res) => {

    const id = req.params.id;
    
    
    const activityGroup = await ActivityGroup.findOne({
        where: {               
            id: id,             
            deleted_at: null, 
        }
    });
    
    if (activityGroup) {
        try{
            activityGroup.deleted_at = new Date();
            await activityGroup.save();
        } 
        catch(err) {
            Response.error(res, err.message || "Some error occurred while deleting activity groups.", 500, null);
        };
        
        Response.success(res, null, 'delete');
    }
    else{
        Response.error(res, `Activity with ID ${id} Not Found`, 404, null);
    }
};

module.exports = {
    getAll,
    find,
    create,
    update,
    destroy
};