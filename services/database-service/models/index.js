const { DataTypes } = require('sequelize');
const sequelize = require('../utilities/dbConnection');

const Album = require('./album');
const AlbumConcepts = require('./albumConcepts')(sequelize, DataTypes);
const AlbumListeningParty = require('./albumListeningParty')(sequelize, DataTypes);
const ArtistBlog = require('./artistBlog')(sequelize, DataTypes);
const ArtistCollabRequests = require('./artistCollabRequests')(sequelize, DataTypes);
const ArtistDiary = require('./artistDiary')(sequelize, DataTypes);
const ArtistEndorsements = require('./artistEndorsements')(sequelize, DataTypes);
const ArtistProfile = require('./artistProfile');
const Badge = require('./badge')(sequelize, DataTypes);
const BehindTheScenes = require('./behindTheScenes')(sequelize, DataTypes);
const Bid = require('./bid')(sequelize, DataTypes);
const Challenges = require('./challenges')(sequelize, DataTypes);
const Chat = require('./chat')(sequelize, DataTypes);
const Collaboration = require('./collaboration')(sequelize, DataTypes);
const Comment = require('./comment')(sequelize, DataTypes);
const CustomizedMerch = require('./customizedMerch')(sequelize, DataTypes);
const EquipmentRentals = require('./equipmentRentals')(sequelize, DataTypes);
const Event = require('./event');
const FanArt = require('./fanArt')(sequelize, DataTypes);
const FanClub = require('./fanClub')(sequelize, DataTypes);
const Genre = require('./genre')(sequelize, DataTypes);
const NFT = require('./nft')(sequelize, DataTypes);
const User = require('./user')(sequelize, DataTypes);

const albumModel = Album(sequelize, DataTypes);

// Define Associations
User.hasMany(NFT, { foreignKey: 'userId', as: 'nfts' });
NFT.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// ... other associations ...

module.exports = {
    sequelize,
    albumModel,
    AlbumConcepts,
    AlbumListeningParty,
    ArtistBlog,
    ArtistCollabRequests,
    ArtistDiary,
    ArtistEndorsements,
    ArtistProfile,
    Badge,
    BehindTheScenes,
    Bid,
    Challenges,
    Chat,
    Collaboration,
    Comment,
    CustomizedMerch,
    EquipmentRentals,
    Event,
    FanArt,
    FanClub,
    Genre,
    NFT,
    User
};
