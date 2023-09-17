const event = (sequelize, DataTypes) => {
    const Event = sequelize.define('Event', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: DataTypes.TEXT,
        date: DataTypes.DATE,
        location: DataTypes.STRING,
        ticketPrice: DataTypes.FLOAT,
        imageUrl: DataTypes.STRING
    });

    Event.associate = (models) => {
        Event.belongsTo(models.ArtistProfile, {
            foreignKey: 'artistId',
            as: 'artist'
        });
    };

    return Event;
};
