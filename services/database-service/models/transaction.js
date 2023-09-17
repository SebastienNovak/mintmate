module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define('Transaction', {
        type: DataTypes.ENUM('buy', 'sell', 'deposit', 'withdrawal'),
        amount: DataTypes.FLOAT,
        status: DataTypes.ENUM('pending', 'completed', 'failed'),
        currency: DataTypes.STRING,
        txHash: DataTypes.STRING,
        blockchain: DataTypes.STRING,
        fromAddress: DataTypes.STRING,
        toAddress: DataTypes.STRING,
        fee: DataTypes.FLOAT,
        blockchainTimestamp: DataTypes.DATE,
        details: DataTypes.TEXT,
        nftEdition: DataTypes.STRING,
        counterpartyId: DataTypes.INTEGER,
        relatedTransactionId: DataTypes.INTEGER,
        transactionCategory: DataTypes.ENUM('standard', 'promotion', 'adjustment'),
        priority: DataTypes.ENUM('low', 'medium', 'high'),
        scheduledTime: DataTypes.DATE,
        expirationTime: DataTypes.DATE,
        apiKeyHash: DataTypes.STRING,
        isDeleted: DataTypes.BOOLEAN
    });
    
    return Transaction;
};
