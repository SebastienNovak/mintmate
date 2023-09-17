const express = require('express');
const router = express.Router();
const NFT = require('../models/nft');

// Retrieve all NFTs
router.get('/', async (req, res) => {
    try {
        const nfts = await NFT.findAll();
        res.json(nfts);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// ... Additional CRUD routes (create, update, delete, get by ID)

module.exports = router;
