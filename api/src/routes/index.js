const router = require('express').Router();

require('dotenv').config();

const activityGroupRoutes = require('./activity_group');
const todoItemRoutes = require('./todo_item');

// api routes
router.use('/activity-groups', activityGroupRoutes);
router.use('/todo-items', todoItemRoutes);

module.exports = router;