module.exports = (sequelize, DataTypes) => {
    const WalletSecurity = sequelize.define('WalletSecurity', {
        privateKeyEncrypted: DataTypes.STRING,
        status: DataTypes.ENUM('active', 'inactive', 'suspended'),
        twoFactorEnabled: DataTypes.BOOLEAN,
        twoFactorSecret: DataTypes.STRING,
        encryptedPIN: DataTypes.STRING,
        backupPhraseEncrypted: DataTypes.STRING,
        securityQuestions: DataTypes.JSON,
        securityAnswersEncrypted: DataTypes.JSON,
        fingerprintEnabled: DataTypes.BOOLEAN,
        walletId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'WalletBasicInfos',
                key: 'id'
            }
        }
    });

    WalletSecurity.associate = (models) => {
        WalletSecurity.belongsTo(models.WalletBasicInfo, {
            foreignKey: 'walletId',
            as: 'basicInfo'
        });
    };

    return WalletSecurity;
};
