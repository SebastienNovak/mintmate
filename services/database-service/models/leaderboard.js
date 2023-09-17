// Leaderboard.js (A simple example based on NFT sales)
module.exports = (sequelize, DataTypes) => {
    const Leaderboard = sequelize.define('Leaderboard', {
        userId: DataTypes.INTEGER,
        nftSales: DataTypes.INTEGER
    });

    return Leaderboard;
};
