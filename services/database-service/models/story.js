// Story.js
module.exports = (sequelize, DataTypes) => {
    const Story = sequelize.define('Story', {
        content: DataTypes.TEXT,
        mediaUrl: DataTypes.STRING,
        expiresAt: DataTypes.DATE
    });

    Story.associate = (models) => {
        Story.belongsTo(models.User, {
            foreignKey: 'artistId',
            as: 'artist'
        });
    };

    return Story;
};
