module.exports = (sequelize, DataTypes) => {
    const CustomizedMerch = sequelize.define('CustomizedMerch', {
        userId: DataTypes.INTEGER,
        merchId: DataTypes.INTEGER,
        customizations: DataTypes.JSONB // Details of customizations
    });

    return CustomizedMerch;
};
