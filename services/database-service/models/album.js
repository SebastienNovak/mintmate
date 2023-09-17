const album = (sequelize, DataTypes) => {
    const Album = sequelize.define('Album', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        releaseDate: DataTypes.DATE,
        coverArt: DataTypes.STRING,
        genre: DataTypes.STRING
    });

    Album.associate = (models) => {
        Album.belongsTo(models.ArtistProfile, {
            foreignKey: 'artistId',
            as: 'artist'
        });
        Album.hasMany(models.Track, {
            foreignKey: 'albumId',
            as: 'tracks'
        });
    };

    return Album;
};
