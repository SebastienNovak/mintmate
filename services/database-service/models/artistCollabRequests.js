module.exports = (sequelize, DataTypes) => {
    const ArtistCollabRequests = sequelize.define('ArtistCollabRequests', {
        artistId: DataTypes.INTEGER,
        description: DataTypes.TEXT,
        isOpen: DataTypes.BOOLEAN
    });

    return ArtistCollabRequests;
};
