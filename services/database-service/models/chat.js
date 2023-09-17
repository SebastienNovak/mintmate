module.exports = (sequelize, DataTypes) => {
    const Chat = sequelize.define('Chat', {
        message: DataTypes.TEXT
    });

    Chat.associate = (models) => {
        Chat.belongsTo(models.User, {
            foreignKey: 'senderId',
            as: 'sender'
        });
        Chat.belongsTo(models.User, {
            foreignKey: 'receiverId',
            as: 'receiver'
        });
    };

    return Chat;
};
