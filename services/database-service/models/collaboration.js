module.exports = (sequelize, DataTypes) => {
    const NFT = sequelize.define('NFT', {
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: DataTypes.TEXT,
      imageUrl: DataTypes.STRING,
      metadataUrl: DataTypes.STRING,
      privateMetadataUrl: DataTypes.STRING,
      accessKey: DataTypes.STRING,
      edition: DataTypes.STRING,
      totalEditions: DataTypes.INTEGER,
      copyNumber: DataTypes.INTEGER,
      isForSale: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      price: DataTypes.FLOAT,
      dateMinted: DataTypes.DATE,
      dateListed: DataTypes.DATE,
      tags: DataTypes.ARRAY(DataTypes.STRING),
      category: DataTypes.STRING,
      tokenID: DataTypes.STRING,
      blockchainType: DataTypes.STRING,
      contractAddress: DataTypes.STRING,
      attributes: DataTypes.JSONB,
      isVisible: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
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
      unlockableContentUrl: DataTypes.STRING,
      originalCreatorId: DataTypes.INTEGER,
      mintingPlatform: DataTypes.STRING,
      hashValue: DataTypes.STRING,
      signature: DataTypes.STRING,
      dimensions: DataTypes.STRING,
      weight: DataTypes.FLOAT,
      material: DataTypes.STRING,
      utilities: DataTypes.TEXT,
      expirationDate: DataTypes.DATE,
      status: DataTypes.STRING,
      viewCount: DataTypes.INTEGER,
      likeCount: DataTypes.INTEGER,
      shareCount: DataTypes.INTEGER,
      copyrightStatus: DataTypes.STRING,
      resellRights: DataTypes.BOOLEAN
      // ... add other fields as needed
    });
  
    NFT.associate = (models) => {
      NFT.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'owner'
      });
  
      NFT.belongsToMany(models.User, { 
        through: 'NFTOwnersHistory',
        as: 'pastOwners',
        foreignKey: 'nftId'
      });
  
      NFT.hasMany(models.Transaction, {
        foreignKey: 'nftId',
        as: 'transactions'
      });
  
      NFT.hasOne(models.Royalty, {
        foreignKey: 'nftId',
        as: 'royalty'
      });
  
      NFT.belongsTo(models.Track, {
        foreignKey: 'trackId',
        as: 'track'
      });
  
      NFT.belongsToMany(models.User, {
        through: 'NFTFavorites',
        as: 'favoritedBy',
        foreignKey: 'nftId'
      });
  
      NFT.belongsToMany(models.User, {
        through: 'NFTCollaborators',
        as: 'collaborators',
        foreignKey: 'nftId'
      });
  
      NFT.hasMany(models.Comment, {
        foreignKey: 'nftId',
        as: 'comments'
      });
  
      NFT.hasMany(models.Report, {
        foreignKey: 'nftId',
        as: 'reports'
      });
  
      NFT.hasMany(models.NFTReview, {
        foreignKey: 'nftId',
        as: 'reviews'
      });
  
      NFT.hasMany(models.NFTPriceHistory, {
        foreignKey: 'nftId',
        as: 'priceHistory'
      });
  
      // ... add other relationships as needed
    };
  
    return NFT;
  };
  