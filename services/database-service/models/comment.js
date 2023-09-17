module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        content: DataTypes.TEXT,
        type: DataTypes.ENUM('nft', 'album', 'event')  // What is the comment related to?
    });

    Comment.associate = (models) => {
        Comment.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user'
        });
        Comment.belongsTo(models.NFT, {
            foreignKey: 'nftId',
            as: 'nft'
        });
        Comment.belongsTo(models.Album, {
            foreignKey: 'albumId',
            as: 'album'
        });
        Comment.belongsTo(models.Event, {
            foreignKey: 'eventId',
            as: 'event'
        });
    };

    return Comment;
};
