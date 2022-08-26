module.exports = (sequelize, Sequelize) => {
    const ActivityGroup = sequelize.define("activity_group", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
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
        indexes:[
         {
           unique: false,
           fields:['email']
         },
         {
            unique: false,
            fields:['title']
          }
        ]
    },{
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });
    

    ActivityGroup.associate = models => {
        ActivityGroup.hasMany(models.todo_item, {
          foreignKey: 'activity_group_id',
          sourceKey: 'id'
        });
      }
    
    return ActivityGroup;
  };
