module.exports = (sequelize, DataTypes) => {
    const TransactionMeta = sequelize.define('TransactionMeta', {
        ipAddress: DataTypes.STRING,
        userAgent: DataTypes.STRING,
        transactionNote: DataTypes.TEXT,
        previousStatus: DataTypes.ENUM('pending', 'completed', 'failed'),
        internalNotes: DataTypes.TEXT,
        attachments: DataTypes.JSON,
        externalReferences: DataTypes.JSON,
        verificationCode: DataTypes.STRING,
        auditTrail: DataTypes.JSON,
        twoFactorAuthUsed: DataTypes.BOOLEAN,
        sessionId: DataTypes.STRING,
        geoLocation: DataTypes.JSON,
        digitalSignature: DataTypes.STRING,
        promoCode: DataTypes.STRING
    });
    
    TransactionMeta.belongsTo(Transaction);
    Transaction.hasOne(TransactionMeta);
    

    return TransactionMeta;
};
