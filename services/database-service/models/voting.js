module.exports = (sequelize, DataTypes) => {
    const Voting = sequelize.define('Voting', {
        title: DataTypes.STRING,
        description: DataTypes.TEXT,
        deadline: DataTypes.DATE
    });

    return Voting;
};
