const Sequelize = require('sequelize');
const db = require('../utils/database');

const NFT = db.define('nft', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    metadata: {
        type: Sequelize.JSONB,
        allowNull: true
    },
    imageURL: {
        type: Sequelize.STRING,
        allowNull: true
    },
    thumbnailURL: {
        type: Sequelize.STRING,
        allowNull: true
    },
    videoURL: {
        type: Sequelize.STRING,
        allowNull: true
    },
    artistId: {
        type: Sequelize.UUID,
        allowNull: false
    },
    currentOwner: {
        type: Sequelize.STRING,  // This can be an Ethereum address or user ID
        allowNull: false
    },
    previousOwner: {
        type: Sequelize.STRING, // Previous owner might be useful for provenance tracking
        allowNull: true
    },
    mintDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    lastTransferDate: {
        type: Sequelize.DATE,
        allowNull: true
    },
    creationDate: {
        type: Sequelize.DATE,   // This might differ from the mint date, indicating when the artwork/content itself was created.
        allowNull: true
    },
    editionNumber: {
        type: Sequelize.INTEGER, // Useful for limited edition NFTs
        allowNull: true
    },
    totalEditions: {
        type: Sequelize.INTEGER, // Total editions available for this particular NFT
        allowNull: true
    },
    price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
    },
    isForSale: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    tags: {
        type: Sequelize.ARRAY(Sequelize.STRING), // Array of tags for categorization or searching
        allowNull: true
    },
    editionNumber: {
        type: Sequelize.INTEGER, 
        allowNull: true
    },
    eventId: {
        type: Sequelize.UUID,
        allowNull: true
    },
    limitedAccessLink: {
        type: Sequelize.STRING,
        allowNull: true
    },
    audioURL: {
        type: Sequelize.STRING,
        allowNull: true
    },
    isTransferable: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
    expirationDate: {
        type: Sequelize.DATE,
        allowNull: true
    },
    redeemed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    redemptionInstructions: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    originalPrice: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
    },
    royaltyPercentage: {
        type: Sequelize.FLOAT,
        allowNull: true
    },
    unlockableContent: {
        type: Sequelize.STRING,
        allowNull: true
    },
    isVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    genre: {
        type: Sequelize.STRING,  // Like "art", "music", "virtual real estate", etc.
        allowNull: true
    },
    platform: {
        type: Sequelize.STRING,
        allowNull: true
    },
    physicalRepresentation: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    location: {
        type: Sequelize.STRING,
        allowNull: true
    },
    collaborators: {
        type: Sequelize.JSONB,
        allowNull: true
    },
    resaleCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    verifiedHistory: {
        type: Sequelize.JSONB,
        allowNull: true
    },
    additionalLinks: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true
    },
    specialAttributes: {
        type: Sequelize.JSONB,
        allowNull: true
    },
    chain: {
        type: Sequelize.STRING,
        allowNull: true
    },
    embedCode: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    history: {
        type: Sequelize.JSONB,
        allowNull: true
    },
    popularityScore: {
        type: Sequelize.FLOAT,
        defaultValue: 0
    },
    hiddenMetadata: {
        type: Sequelize.JSONB,
        allowNull: true
    },
    externalURL: {
        type: Sequelize.STRING,
        allowNull: true
    },
    attributesRarity: {
        type: Sequelize.JSONB,
        allowNull: true
    },
    licenseType: {
        type: Sequelize.STRING,
        allowNull: true
    },
    interactivityType: {
        type: Sequelize.STRING,
        allowNull: true
    },
    categories: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true
    },
    language: {
        type: Sequelize.STRING,
        allowNull: true
    },
    dimensions: {
        type: Sequelize.JSONB, // { width, height, depth, unit }
        allowNull: true
    },
    weight: {
        type: Sequelize.JSONB, // { value, unit }
        allowNull: true
    },
    frameDetails: {
        type: Sequelize.JSONB, // { material, color, style, etc. }
        allowNull: true
    },
    signatures: {
        type: Sequelize.JSONB, // { artistName, date, locationOnArt, etc. }
        allowNull: true
    },
    certificateOfAuthenticity: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    viewCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    likes: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    commentsCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    relatedNFTs: {
        type: Sequelize.ARRAY(Sequelize.UUID),
        allowNull: true
    },
    parentNFT: {
        type: Sequelize.UUID,
        allowNull: true
    },
    accessRestrictions: {
        type: Sequelize.JSONB, // { age, country, memberStatus, etc. }
        allowNull: true
    },
    utility: {
        type: Sequelize.STRING,
        allowNull: true
    },
    isBurnable: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    contractAddress: {
        type: Sequelize.STRING, // Address of the contract on Ethereum where this NFT lives
        allowNull: true
    },
    tokenID: {
        type: Sequelize.STRING, // Unique identifier of the NFT on its contract
        allowNull: true
    }
});

module.exports = NFT;
