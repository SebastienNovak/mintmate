module.exports = (sequelize, DataTypes) => {
    const Dispute = sequelize.define('Dispute', {
        disputeStatus: DataTypes.ENUM('raised', 'resolved', 'pending'),
        disputeDetails: DataTypes.TEXT,
        resolvedOn: DataTypes.DATE,
        resolutionDetails: DataTypes.TEXT,
    });
    
    Dispute.belongsTo(Transaction);
    Transaction.hasOne(Dispute);
    

    return Dispute;
};
