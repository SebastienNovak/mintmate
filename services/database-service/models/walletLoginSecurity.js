module.exports = (sequelize, DataTypes) => {
    const WalletLoginSecurity = sequelize.define('WalletLoginSecurity', {
        failedLoginAttempts: DataTypes.INTEGER,
        lastFailedLogin: DataTypes.DATE,
        walletId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'WalletBasicInfos',
                key: 'id'
            }
        }
    });

    WalletLoginSecurity.associate = (models) => {
        WalletLoginSecurity.belongsTo(models.WalletBasicInfo, {
            foreignKey: 'walletId',
            as: 'basicInfo'
        });
    };

    return WalletLoginSecurity;
};
