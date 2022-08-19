module.exports = (sequelize, Sequelize) => {
    const TodoItem = sequelize.define("todo_item", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        activity_group_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        is_active: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        },
        priority: {
            type: Sequelize.STRING,
            defaultValue: 'very-high'
        },        
        created_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        updated_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        deleted_at: {
            type: Sequelize.DATE,
            // defaultValue: Sequelize.NOW
        }
    },{
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });
    
    TodoItem.associate = (models) => {
        TodoItem.belongsTo(models.activity_group, {
          foreignKey: 'activity_group_id',
          targetKey: 'id'
        })
      }

    return TodoItem;
  };