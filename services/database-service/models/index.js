const sequelize = require('../utilities/dbConnection');

const Album = require('./album')(sequelize);
const AlbumConcepts = require('./albumConcepts')(sequelize);
const AlbumListeningParty = require('./albumListeningParty')(sequelize);
const ArtistBlog = require('./artistBlog')(sequelize);
const ArtistCollabRequests = require('./artistCollabRequests')(sequelize);
const ArtistDiary = require('./artistDiary')(sequelize);
const ArtistEndorsements = require('./artistEndorsements')(sequelize);
const ArtistProfile = require('./artistProfile')(sequelize);
const Badge = require('./badge')(sequelize);
const BehindTheScenes = require('./behindTheScenes')(sequelize);
const Bid = require('./bid')(sequelize);
const Challenges = require('./challenges')(sequelize);
const Chat = require('./chat')(sequelize);
const Collaboration = require('./collaboration')(sequelize);
const Comment = require('./comment')(sequelize);
const CustomizedMerch = require('./customizedMerch')(sequelize);
const EquipmentRentals = require('./equipmentRentals')(sequelize);
const Event = require('./event')(sequelize);
const FanArt = require('./fanArt')(sequelize);
const FanClub = require('./fanClub')(sequelize);
const Genre = require('./genre')(sequelize);
const NFT = require('./nft')(sequelize);
const User = require('./user')(sequelize);

// Define Associations
User.hasMany(NFT, { foreignKey: 'userId', as: 'nfts' });
NFT.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// ... other associations ...

module.exports = {
    sequelize,
    Album,
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
