module.exports = (sequelize, DataTypes) => {
    const Subscription = sequelize.define('Subscription', {
        name: DataTypes.STRING,
        price: DataTypes.FLOAT,
        benefits: DataTypes.TEXT
    });

    return Subscription;
};
