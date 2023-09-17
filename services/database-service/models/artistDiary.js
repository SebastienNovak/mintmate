module.exports = (sequelize, DataTypes) => {
    const ArtistDiary = sequelize.define('ArtistDiary', {
        date: DataTypes.DATE,
        entry: DataTypes.TEXT
    });

    return ArtistDiary;
};
