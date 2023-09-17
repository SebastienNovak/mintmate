module.exports = (sequelize, DataTypes) => {
    const FanExperience = sequelize.define('FanExperience', {
        title: DataTypes.STRING,
        description: DataTypes.TEXT,
        price: DataTypes.FLOAT,
        date: DataTypes.DATE,
        location: DataTypes.STRING,
        virtualLink: DataTypes.STRING
    });

    return FanExperience;
};
