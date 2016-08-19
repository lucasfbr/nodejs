module.exports = function (sequelize, Sequelize) {
    var Tasks = sequelize.define('Tasks', {
        task : Sequelize.STRING,
        done : Sequelize.BOOLEAN
    });

    return Tasks;
};
