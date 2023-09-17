// FanClub.js
module.exports = (sequelize, DataTypes) => {
    const FanClub = sequelize.define('FanClub', {
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
        exclusiveContentUrl: DataTypes.STRING
    });

    FanClub.associate = (models) => {
        FanClub.belongsTo(models.User, {
            foreignKey: 'artistId',
            as: 'artist'
        });
    };

    return FanClub;
};
