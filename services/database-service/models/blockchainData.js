module.exports = (sequelize, DataTypes) => {
    const BlockchainData = sequelize.define('BlockchainData', {
        gasFee: DataTypes.FLOAT,
        gasPrice: DataTypes.FLOAT,
        tokenContractAddress: DataTypes.STRING,
        exchangeRate: DataTypes.FLOAT,
        escrowStatus: DataTypes.ENUM('not_in_escrow', 'in_escrow', 'released', 'refunded'),
        failureReason: DataTypes.TEXT
    });
    
    BlockchainData.belongsTo(Transaction);
    Transaction.hasOne(BlockchainData);
    

    return BlockchainData;
};
