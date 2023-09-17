module.exports = (sequelize, DataTypes) => {
    const AlbumConcepts = sequelize.define('AlbumConcepts', {
        artistId: DataTypes.INTEGER,
        title: DataTypes.STRING,
        description: DataTypes.TEXT,
        images: DataTypes.ARRAY(DataTypes.STRING)
    });

    return AlbumConcepts;
};
