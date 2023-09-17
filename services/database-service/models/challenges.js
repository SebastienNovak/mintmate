// Challenges.js
module.exports = (sequelize, DataTypes) => {
    const Challenges = sequelize.define('Challenges', {
        title: DataTypes.STRING,
        description: DataTypes.TEXT,
        deadline: DataTypes.DATE,
        prize: DataTypes.STRING
    });

    return Challenges;
};
