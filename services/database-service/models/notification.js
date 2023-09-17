module.exports = (sequelize, DataTypes) => {
    const Notification = sequelize.define('Notification', {
        content: DataTypes.TEXT,
        type: DataTypes.ENUM('bid', 'purchase', 'event', 'message')
    });

    Notification.associate = (models) => {
        Notification.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'recipient'
        });
    };

    return Notification;
};
