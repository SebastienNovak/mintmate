// Badge.js
module.exports = (sequelize, DataTypes) => {
    const Badge = sequelize.define('Badge', {
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
        type: DataTypes.ENUM('top_seller', 'super_fan')
    });

    Badge.associate = (models) => {
        Badge.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user'
        });
    };

    return Badge;
};
