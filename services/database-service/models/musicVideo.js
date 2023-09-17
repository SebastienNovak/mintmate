module.exports = (sequelize, DataTypes) => {
    const MusicVideo = sequelize.define('MusicVideo', {
        title: DataTypes.STRING,
        description: DataTypes.TEXT,
        videoUrl: DataTypes.STRING,
        releaseDate: DataTypes.DATE
    });

    return MusicVideo;
};
