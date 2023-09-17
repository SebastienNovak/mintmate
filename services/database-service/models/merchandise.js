// Merchandise.js
module.exports = (sequelize, DataTypes) => {
    const Merchandise = sequelize.define('Merchandise', {
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
        price: DataTypes.FLOAT,
        imageUrl: DataTypes.STRING
    });

    Merchandise.associate = (models) => {
        Merchandise.belongsTo(models.User, {
            foreignKey: 'artistId',
            as: 'artist'
        });
    };

    return Merchandise;
};
