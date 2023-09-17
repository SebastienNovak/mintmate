const artistProfile = (sequelize, DataTypes) => {
    const ArtistProfile = sequelize.define('ArtistProfile', {
        biography: DataTypes.TEXT,
        genre: DataTypes.STRING,
        albumsReleased: DataTypes.INTEGER,
        websiteUrl: DataTypes.STRING,
        socialMediaLinks: DataTypes.JSON,
        profileImage: DataTypes.STRING,
        discography: DataTypes.TEXT,
        accolades: DataTypes.TEXT,
        imageUrl: DataTypes.STRING, // URL for profile picture
        bannerUrl: DataTypes.STRING
    });

    ArtistProfile.associate = (models) => {
        ArtistProfile.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'artist'
        });
        ArtistProfile.hasMany(models.Album, {
            foreignKey: 'artistId',
            as: 'albums'
        });
        ArtistProfile.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'artist'
        });
    };

    return ArtistProfile;
};
