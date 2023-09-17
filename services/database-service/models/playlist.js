module.exports = (sequelize, DataTypes) => {
    const Playlist = sequelize.define('Playlist', {
        name: DataTypes.STRING,
        description: DataTypes.TEXT
    });

    Playlist.associate = (models) => {
        Playlist.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'creator'
        });
        Playlist.belongsToMany(models.Track, {
            through: 'PlaylistTracks',
            as: 'tracks',
            foreignKey: 'playlistId'
        });
    };

    return Playlist;
};
