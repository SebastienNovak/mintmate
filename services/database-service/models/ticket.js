const ticket = (sequelize, DataTypes) => {
    const Ticket = sequelize.define('Ticket', {
        // Ticket-specific fields
        type: DataTypes.STRING,  
        availableCount: DataTypes.INTEGER,
        purchaseDate: DataTypes.DATE,
        seatNumber: DataTypes.STRING,
        soldCount: DataTypes.INTEGER,
        
        // NFT fields
        title: DataTypes.STRING,
        description: DataTypes.TEXT,
        imageUrl: DataTypes.STRING,
        metadataUrl: DataTypes.STRING,
        edition: DataTypes.STRING,
        totalEditions: DataTypes.INTEGER,
        isForSale: DataTypes.BOOLEAN,
        dateMinted: DataTypes.DATE,
        dateListed: DataTypes.DATE,
        tags: DataTypes.ARRAY(DataTypes.STRING),
        category: DataTypes.STRING,
        tokenID: DataTypes.STRING,
        blockchainType: DataTypes.STRING,
        contractAddress: DataTypes.STRING,
        attributes: DataTypes.JSONB,
        isVisible: DataTypes.BOOLEAN,
        fileType: DataTypes.STRING,
        audioUrl: DataTypes.STRING,
        videoPreviewUrl: DataTypes.STRING,
        licenseType: DataTypes.STRING,
        hasPhysicalRedemption: DataTypes.BOOLEAN,
        physicalRedemptionDetails: DataTypes.TEXT,
        isOnAuction: DataTypes.BOOLEAN,
        auctionStartTime: DataTypes.DATE,
        auctionEndTime: DataTypes.DATE,
        startingBid: DataTypes.FLOAT,
        highestBid: DataTypes.FLOAT,
        highestBidderId: DataTypes.INTEGER,
        isVerified: DataTypes.BOOLEAN,
        reservePrice: DataTypes.FLOAT,
        unlockableContentUrl: DataTypes.STRING
    });

    Ticket.associate = (models) => {
        // Relationships from the NFT model
        Ticket.belongsTo(models.User, { foreignKey: 'userId', as: 'owner' });
        Ticket.belongsToMany(models.User, { through: 'NFTOwnersHistory', as: 'pastOwners', foreignKey: 'ticketId' });
        Ticket.hasMany(models.Transaction, { foreignKey: 'nftId', as: 'transactions' });
        Ticket.hasOne(models.Royalty, { foreignKey: 'nftId', as: 'royalty' });
        Ticket.belongsTo(models.Track, { foreignKey: 'trackId', as: 'track' });
        Ticket.belongsToMany(models.User, { through: 'NFTFavorites', as: 'favoritedBy', foreignKey: 'ticketId' });
        Ticket.belongsToMany(models.User, { through: 'NFTCollaborators', as: 'collaborators', foreignKey: 'ticketId' });
        Ticket.hasMany(models.Comment, { foreignKey: 'nftId', as: 'comments' });
        Ticket.hasMany(models.Report, { foreignKey: 'nftId', as: 'reports' });

        // Ticket-specific relationships
        Ticket.belongsTo(models.Event, { foreignKey: 'eventId', as: 'event' });
        Ticket.hasMany(models.Transaction, { foreignKey: 'ticketId', as: 'transactions' });
    };

    return Ticket;
};
