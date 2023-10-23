const fs = require('fs');
const path = require('path');
const { gql } = require('graphql-tag');

const walletBasicInfoTypeDefs = gql(fs.readFileSync(path.join(__dirname, '../typeDefs/walletBasicInfos.gql'), 'utf8'));
const walletLoginSecurityTypeDefs = gql(fs.readFileSync(path.resolve(__dirname, '../typeDefs/walletLoginSecurity.gql'), 'utf8'));

const walletSecurityResolver = {
  Query: {
    walletLoginSecurity: async (_, { id }) => {
      try {
        const walletLoginSecurity = await walletLoginSecurityTypeDefs.findByPk(id); // findById is replaced by findByPk in newer Sequelize versions
        if (!walletLoginSecurity) throw new Error(`WalletLoginSecurity with id ${id} not found`);
        return walletLoginSecurity;
      } catch (error) {
        console.error(`Error fetching WalletLoginSecurity with id ${id}:`, error);
        throw new Error('Unable to fetch WalletLoginSecurity');
      }
    },
    walletLoginSecurities: async () => {
      try {
        return await walletLoginSecurityTypeDefs.findAll();
      } catch (error) {
        console.error('Error fetching all WalletLoginSecurities:', error);
        throw new Error('Unable to fetch WalletLoginSecurities');
      }
    },
  },
  
  Mutation: {
    createWalletLoginSecurity: async (_, { input }) => {
      try {
        const walletLoginSecurity = await walletLoginSecurityTypeDefs.create(input);
        if (!walletLoginSecurity) throw new Error('Failed to create WalletLoginSecurity');
        return walletLoginSecurity;
      } catch (error) {
        console.error('Error creating WalletLoginSecurity:', error);
        throw new Error('Unable to create WalletLoginSecurity');
      }
    },
  },
  
  WalletLoginSecurity: {
    wallet: async (walletLoginSecurity) => {
      try {
        const wallet = await walletBasicInfoTypeDefs.findByPk(walletLoginSecurity.walletId);
        if (!wallet) throw new Error(`WalletBasicInfo with id ${walletLoginSecurity.walletId} not found`);
        return wallet;
      } catch (error) {
        console.error('Error fetching associated WalletBasicInfo:', error);
        throw new Error('Unable to fetch associated WalletBasicInfo');
      }
    },
  },
};

module.exports = walletSecurityResolver;
