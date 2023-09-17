module.exports = (sequelize, DataTypes) => {
    const Bid = sequelize.define('Bid', {
        amount: DataTypes.FLOAT,
        status: DataTypes.ENUM('open', 'accepted', 'rejected')
    });

    Bid.associate = (models) => {
        Bid.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'bidder'
        });
        Bid.belongsTo(models.NFT, {
            foreignKey: 'nftId',
            as: 'nft'
        });
    };

    return Bid;
};
