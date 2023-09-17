module.exports = (sequelize, DataTypes) => {
    const AlbumListeningParty = sequelize.define('AlbumListeningParty', {
        albumId: DataTypes.INTEGER,
        date: DataTypes.DATE,
        virtualStageId: DataTypes.INTEGER
    });

    return AlbumListeningParty;
};
