const track = (sequelize, DataTypes) => {
    const Track = sequelize.define('Track', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        duration: DataTypes.INTEGER,  // Assuming duration is saved in seconds
        streamUrl: DataTypes.STRING, // URL for the track stream
        genre: DataTypes.STRING,
        audioFile: DataTypes.STRING,
        featuredArtists: DataTypes.ARRAY(DataTypes.STRING),  // Array of artist names
        isNFT: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        price: DataTypes.FLOAT // applicable if it's an NFT
    });

    Track.associate = (models) => {
        Track.belongsTo(models.Album, {
            foreignKey: 'albumId',
            as: 'album'
        });
    };

    return Track;
};
