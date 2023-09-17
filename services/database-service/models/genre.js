module.exports = (sequelize, DataTypes) => {
    const Genre = sequelize.define('Genre', {
        name: DataTypes.STRING,
        description: DataTypes.TEXT
    });

    Genre.associate = (models) => {
        Genre.belongsToMany(models.Track, {
            through: 'TrackGenres',
            as: 'tracks',
            foreignKey: 'genreId'
        });
        Genre.belongsToMany(models.Album, {
            through: 'AlbumGenres',
            as: 'albums',
            foreignKey: 'genreId'
        });
    };

    return Genre;
};
