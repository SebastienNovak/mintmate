const fs = require('fs');
const path = require('path');
const { gql } = require('graphql-tag');

const walletLoginSecurityTypeDefs = gql(fs.readFileSync(path.join(__dirname, '../typeDefs/walletLoginSecurity.gql'), 'utf8'));
const walletBasicInfoTypeDefs = gql(fs.readFileSync(path.join(__dirname, '../typeDefs/walletBasicInfos.gql'), 'utf8'));

const walletWhitelistResolver = {
  Query: {
    walletWhitelist: async (_, { id }) => {
      try {
        const walletWhitelist = await walletLoginSecurityTypeDefs.findByPk(id); // Updated from findById
        if (!walletWhitelist) throw new Error(`WalletWhitelist with id ${id} not found`);
        return walletWhitelist;
      } catch (error) {
        console.error(`Error fetching WalletWhitelist with id ${id}:`, error);
        throw new Error('Unable to fetch WalletWhitelist');
      }
    },
    walletWhitelists: async () => {
      try {
        return await walletLoginSecurityTypeDefs.findAll();
      } catch (error) {
        console.error('Error fetching all WalletWhitelists:', error);
        throw new Error('Unable to fetch WalletWhitelists');
      }
    },
  },
  
  Mutation: {
    createWalletWhitelist: async (_, { input }) => {
      try {
        const walletWhitelist = await walletLoginSecurityTypeDefs.create(input);
        if (!walletWhitelist) throw new Error('Failed to create WalletWhitelist');
        return walletWhitelist;
      } catch (error) {
        console.error('Error creating WalletWhitelist:', error);
        throw new Error('Unable to create WalletWhitelist');
      }
    },
  },
  
  WalletWhitelist: {
    wallet: async (walletWhitelist) => {
      try {
        const wallet = await walletBasicInfoTypeDefs.findByPk(walletWhitelist.walletId);
        if (!wallet) throw new Error(`WalletBasicInfo with id ${walletWhitelist.walletId} not found`);
        return wallet;
      } catch (error) {
        console.error('Error fetching associated WalletBasicInfo:', error);
        throw new Error('Unable to fetch associated WalletBasicInfo');
      }
    },
  },
};

module.exports = walletWhitelistResolver;
