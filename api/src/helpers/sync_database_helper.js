
const db = require("./../models");

class SyncDatabase {

    static process () {

        // sync database
        db.sequelize.sync({
        force: true
        }).then(() => {
        console.log("Synced db.");
        }).catch((err) => {
            console.log("Failed to sync db: " + err.message);
        });
    };
}  

module.exports = SyncDatabase;