module.exports = (sequelize, DataTypes) => {
    const WalletBasicInfos = sequelize.define('WalletBasicInfos', {
        balance: DataTypes.FLOAT,
        currency: DataTypes.STRING,
        address: DataTypes.STRING,
        publicKey: DataTypes.STRING,
        isColdStorage: DataTypes.BOOLEAN,
        multisigAddresses: DataTypes.ARRAY(DataTypes.STRING),
        hardwareWalletType: DataTypes.STRING,
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Users',
                key: 'id'
            }
        }
    });

    WalletBasicInfos.associate = (models) => {
        WalletBasicInfos.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'owner'
        });
        WalletBasicInfos.hasMany(models.Transaction, {
            foreignKey: 'walletId',
            as: 'transactions'
        });
    };

    return WalletBasicInfos;
};
