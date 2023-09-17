module.exports = (sequelize, DataTypes) => {
    const WalletWhitelist = sequelize.define('WalletWhitelist', {
        whitelistAddresses: DataTypes.ARRAY(DataTypes.STRING),
        ipWhitelist: DataTypes.ARRAY(DataTypes.STRING),
        userAgentWhitelist: DataTypes.ARRAY(DataTypes.STRING),
        walletId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'WalletBasicInfos',
                key: 'id'
            }
        }
    });

    WalletWhitelist.associate = (models) => {
        WalletWhitelist.belongsTo(models.WalletBasicInfo, {
            foreignKey: 'walletId',
            as: 'basicInfo'
        });
    };

    return WalletWhitelist;
};
