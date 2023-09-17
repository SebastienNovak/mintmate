// Royalty.js
module.exports = (sequelize, DataTypes) => {
    const Royalty = sequelize.define('Royalty', {
        percentage: DataTypes.FLOAT,
        amount: DataTypes.FLOAT
    });

    Royalty.associate = (models) => {
        Royalty.belongsTo(models.NFT, {
            foreignKey: 'nftId',
            as: 'nft'
        });
        Royalty.belongsTo(models.User, {
            foreignKey: 'artistId',
            as: 'artist'
        });
    };

    return Royalty;
};
