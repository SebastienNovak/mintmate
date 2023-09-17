// BehindTheScenes.js
module.exports = (sequelize, DataTypes) => {
    const BehindTheScenes = sequelize.define('BehindTheScenes', {
        title: DataTypes.STRING,
        content: DataTypes.TEXT,
        mediaUrl: DataTypes.STRING
    });

    BehindTheScenes.associate = (models) => {
        BehindTheScenes.belongsTo(models.User, {
            foreignKey: 'artistId',
            as: 'artist'
        });
    };

    return BehindTheScenes;
};
