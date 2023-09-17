module.exports = (sequelize, DataTypes) => {
    const Workshop = sequelize.define('Workshop', {
        title: DataTypes.STRING,
        description: DataTypes.TEXT,
        date: DataTypes.DATE,
        fee: DataTypes.FLOAT
    });

    return Workshop;
};
