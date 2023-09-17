module.exports = (sequelize, DataTypes) => {
    const Refund = sequelize.define('Refund', {
        refundStatus: DataTypes.ENUM('not_requested', 'pending', 'completed', 'denied'),
        refundAmount: DataTypes.FLOAT
    });
    
    Refund.belongsTo(Transaction);
    Transaction.hasOne(Refund);
    

    return Refund;
};
