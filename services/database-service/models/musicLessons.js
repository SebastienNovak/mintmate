// MusicLessons.js
module.exports = (sequelize, DataTypes) => {
    const MusicLessons = sequelize.define('MusicLessons', {
        title: DataTypes.STRING,
        description: DataTypes.TEXT,
        videoUrl: DataTypes.STRING,
        price: DataTypes.FLOAT
    });

    MusicLessons.associate = (models) => {
        MusicLessons.belongsTo(models.User, {
            foreignKey: 'artistId',
            as: 'artist'
        });
    };

    return MusicLessons;
};
