'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await queryInterface.sequelize.query(
      `SELECT id FROM "Users" LIMIT 1`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (users.length === 0) {
      console.log("No users found. Cannot seed NFTs without users.");
      return;
    }

    const userId = users[0].id;

    return queryInterface.bulkInsert('NFTs', [{
      title: 'Demo NFT',
      description: 'This is a demo NFT description',
      imageUrl: 'https://example.com/demo-nft-image.jpg',
      metadataUrl: 'https://example.com/demo-nft-metadata.json',
      edition: '1/100',
      totalEditions: 100,
      isForSale: true,
      price: 1.5,
      dateMinted: new Date(),
      dateListed: new Date(),
      tags: ['demo', 'nft', 'sample'],
      category: 'Art',
      tokenID: '1234567890abcdef',
      blockchainType: 'Ethereum',
      contractAddress: '0x1234567890abcdef1234567890abcdef12345678',
      isVisible: true,
      fileType: 'image',
      userId: userId,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      title: 'New NFT',
      description: 'This is a new NFT description',
      imageUrl: 'https://example.com/new-nft-image.jpg',
      metadataUrl: 'https://example.com/new-nft-metadata.json',
      edition: '1/50',
      totalEditions: 50,
      isForSale: true,
      price: 2.0,
      dateMinted: new Date(),
      dateListed: new Date(),
      tags: ['new', 'nft', 'example'],
      category: 'Music',
      tokenID: 'abcdef1234567890',
      blockchainType: 'Ethereum',
      contractAddress: '0xabcdef1234567890abcdef1234567890123456789',
      isVisible: true,
      fileType: 'audio',
      userId: userId,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      title: 'Digital Art',
      description: 'Unique digital art pieces.',
      imageUrl: 'https://example.com/digital-art-image.jpg',
      metadataUrl: 'https://example.com/digital-art-metadata.json',
      edition: '1/30',
      totalEditions: 30,
      isForSale: true,
      price: 3.0,
      dateMinted: new Date(),
      dateListed: new Date(),
      tags: ['digital', 'art', 'abstract'],
      category: 'Art',
      tokenID: 'abcdef3333337890',
      blockchainType: 'Ethereum',
      contractAddress: '0xabcdef3333337890abcdef1234567890123456789',
      isVisible: true,
      fileType: 'image',
      userId: userId,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Space Exploration',
      description: 'Pictures from outer space.',
      imageUrl: 'https://example.com/space-image.jpg',
      metadataUrl: 'https://example.com/space-metadata.json',
      edition: '1/20',
      totalEditions: 20,
      isForSale: true,
      price: 4.0,
      dateMinted: new Date(),
      dateListed: new Date(),
      tags: ['space', 'planets', 'exploration'],
      category: 'Science',
      tokenID: 'abcdef4444447890',
      blockchainType: 'Ethereum',
      contractAddress: '0xabcdef4444447890abcdef1234567890123456789',
      isVisible: true,
      fileType: 'image',
      userId: userId,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('NFTs', null, {});
  }
};
