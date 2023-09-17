module.exports = (sequelize, DataTypes) => {
    const EquipmentRentals = sequelize.define('EquipmentRentals', {
        itemName: DataTypes.STRING,
        description: DataTypes.TEXT,
        dailyRate: DataTypes.FLOAT,
        availableFrom: DataTypes.DATE,
        availableTo: DataTypes.DATE
    });

    return EquipmentRentals;
};
