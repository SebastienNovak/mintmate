// Import required modules
const fs = require('fs');
const path = require('path');
const { merge } = require('lodash');
const { gql } = require('apollo-server-express');

// Importing Resolvers
const albumConceptsResolver = require('../graphql/resolvers/albumConceptsResolver');
const albumListeningPartyResolver = require('../graphql/resolvers/albumListeningPartyResolver');
const albumResolver = require('../graphql/resolvers/albumResolver');
const artistBlogResolver = require('../graphql/resolvers/artistBlogResolver');
const artistCollabRequestsResolver = require('../graphql/resolvers/artistCollabRequestsResolver');
const artistDiaryResolver = require('../graphql/resolvers/artistDiaryResolver');
const artistEndorsementsResolver = require('../graphql/resolvers/artistEndorsementsResolver');
const artistProfileResolver = require('../graphql/resolvers/artistProfileResolver');
const badgeResolver = require('../graphql/resolvers/badgeResolver');
const behindTheScenesResolver = require('../graphql/resolvers/behindTheScenesResolver');
const bidResolver = require('../graphql/resolvers/bidResolver');
const blockchainDataResolver = require('../graphql/resolvers/blockchainDataResolver');
const challengesResolver = require('../graphql/resolvers/challengesResolver');
const chatResolver = require('../graphql/resolvers/chatResolver');
const collaborationResolver = require('../graphql/resolvers/collaborationResolver');
const commentResolver = require('../graphql/resolvers/commentResolver');
const customizedMerchResolver = require('../graphql/resolvers/customizedMerchResolver');
const disputeResolver = require('../graphql/resolvers/disputeResolver');
const equipmentRentalsResolver = require('../graphql/resolvers/equipmentRentalsResolver');
const eventResolver = require('../graphql/resolvers/eventResolver');
const fanArtResolver = require('../graphql/resolvers/fanArtResolver');
const fanClubResolver = require('../graphql/resolvers/fanClubResolver');
const fanExperienceResolver = require('../graphql/resolvers/fanExperienceResolver');
const genreResolver = require('../graphql/resolvers/genreResolver');
const labelResolver = require('../graphql/resolvers/labelResolver');
const leaderboardResolver = require('../graphql/resolvers/leaderboardResolver');
const mentorshipResolver = require('../graphql/resolvers/mentorshipResolver');
const merchandiseResolver = require('../graphql/resolvers/merchandiseResolver');
const musicLessonsResolver = require('../graphql/resolvers/musicLessonsResolver');
const musicVideoResolver = require('../graphql/resolvers/musicVideoResolver');
const nftResolver = require('../graphql/resolvers/nftResolver');
const notificationResolver = require('../graphql/resolvers/notificationResolver');
const playlistResolver = require('../graphql/resolvers/playlistResolver');
const refundResolver = require('../graphql/resolvers/refundResolver');
const reviewResolver = require('../graphql/resolvers/reviewResolver');
const royaltyResolver = require('../graphql/resolvers/royaltyResolver');
const soundPacksResolver = require('../graphql/resolvers/soundPacksResolver');
const storyResolver = require('../graphql/resolvers/storyResolver');
const subscriptionResolver = require('../graphql/resolvers/subscriptionResolver');
const ticketResolver = require('../graphql/resolvers/ticketResolver');
const trackResolver = require('../graphql/resolvers/trackResolver');
const transactionMetaResolver = require('../graphql/resolvers/transactionMetaResolver');
const transactionResolver = require('../graphql/resolvers/transactionResolver');
const triviaResolver = require('../graphql/resolvers/triviaResolver');
const userResolver = require('../graphql/resolvers/userResolver');
const virtualGoodsResolver = require('../graphql/resolvers/virtualGoodsResolver');
const virtualInstrumentResolver = require('../graphql/resolvers/virtualInstrumentResolver');
const virtualStudioSessionsResolver = require('../graphql/resolvers/virtualStudioSessionsResolver');
const virtualVenueResolver = require('../graphql/resolvers/virtualVenueResolver');
const votingResolver = require('../graphql/resolvers/votingResolver');
const walletBasicInfosResolver = require('../graphql/resolvers/walletBasicInfosResolver');
const walletLoginSecurityResolver = require('../graphql/resolvers/walletLoginSecurityResolver');
const walletSecurityResolver = require('../graphql/resolvers/walletSecurityResolver');
const walletWhitelistResolver = require('../graphql/resolvers/walletWhitelistResolver');
const workshopResolver = require('../graphql/resolvers/workshopResolver');

// Importing TypeDefs
const album = gql(fs.readFileSync(path.join(__dirname, '../graphql/typeDefs/album.gql'), 'utf8'));
const albumConcepts = gql(fs.readFileSync(path.join(__dirname, '../graphql/typeDefs/albumConcepts.gql'), 'utf8'));
const albumListeningParty = gql(fs.readFileSync(path.join(__dirname, '../graphql/typeDefs/albumListeningParty.gql'), 'utf8'));
const artistBlog = gql(fs.readFileSync(path.join(__dirname, '../graphql/typeDefs/artistBlog.gql'), 'utf8'));
const artistCollabRequests = gql(fs.readFileSync(path.join(__dirname, '../graphql/typeDefs/artistCollabRequests.gql'), 'utf8'));
const artistDiary = gql(fs.readFileSync(path.join(__dirname, '../graphql/typeDefs/artistDiary.gql'), 'utf8'));
const artistEndorsements = gql(fs.readFileSync(path.join(__dirname, '../graphql/typeDefs/artistEndorsements.gql'), 'utf8'));
const artistProfile = gql(fs.readFileSync(path.join(__dirname, '../graphql/typeDefs/artistProfile.gql'), 'utf8'));
const badge = gql(fs.readFileSync(path.join(__dirname, '../graphql/typeDefs/badge.gql'), 'utf8'));
const behindTheScenes = gql(fs.readFileSync(path.join(__dirname, '../graphql/typeDefs/behindTheScenes.gql'), 'utf8'));
const bid = gql(fs.readFileSync(path.join(__dirname, '../graphql/typeDefs/bid.gql'), 'utf8'));
const blockchainData = gql(fs.readFileSync(path.join(__dirname, '../graphql/typeDefs/blockchainData.gql'), 'utf8'));
const challenges = gql(fs.readFileSync(path.join(__dirname, '../graphql/typeDefs/challenges.gql'), 'utf8'));
const chat = gql(fs.readFileSync(path.join(__dirname, '../graphql/typeDefs/chat.gql'), 'utf8'));
const collaboration = gql(fs.readFileSync(path.join(__dirname, '../graphql/typeDefs/collaboration.gql'), 'utf8'));
const comment = gql(fs.readFileSync(path.join(__dirname, '../graphql/typeDefs/comment.gql'), 'utf8'));
const customizedMerch = gql(fs.readFileSync(path.join(__dirname, '../graphql/typeDefs/customizedMerch.gql'), 'utf8'));
const dispute = gql(fs.readFileSync(path.join(__dirname, '../graphql/typeDefs/dispute.gql'), 'utf8'));
const equipmentRentals = gql(fs.readFileSync(path.join(__dirname, '../graphql/typeDefs/equipmentRentals.gql'), 'utf8'));
const event = gql(fs.readFileSync(path.join(__dirname, '../graphql/typeDefs/event.gql'), 'utf8'));
const fanArt = gql(fs.readFileSync(path.join(__dirname, '../graphql/typeDefs/fanArt.gql'), 'utf8'));
const fanClub = gql(fs.readFileSync(path.join(__dirname, '../graphql/typeDefs/fanClub.gql'), 'utf8'));
const fanExperience = gql(fs.readFileSync(path.join(__dirname, '../graphql/typeDefs/fanExperience.gql'), 'utf8'));
const genre = gql(fs.readFileSync(path.join(__dirname, '../graphql/typeDefs/genre.gql'), 'utf8'));
const label = gql(fs.readFileSync(path.join(__dirname, '../graphql/typeDefs/label.gql'), 'utf8'));
const leaderboard = gql(fs.readFileSync(path.join(__dirname, '../graphql/typeDefs/leaderboard.gql'), 'utf8'));
const mentorship = gql(fs.readFileSync(path.join(__dirname, '../graphql/typeDefs/mentorship.gql'), 'utf8'));
const merchandise = gql(fs.readFileSync(path.join(__dirname, '../graphql/typeDefs/merchandise.gql'), 'utf8'));
const musicLessons = gql(fs.readFileSync(path.join(__dirname, '../graphql/typeDefs/musicLessons.gql'), 'utf8'));
const musicVideo = gql(fs.readFileSync(path.join(__dirname, '../graphql/typeDefs/musicVideo.gql'), 'utf8'));
const nft = gql(fs.readFileSync(path.join(__dirname, '../graphql/typeDefs/nft.gql'), 'utf8'));
const notification = gql(fs.readFileSync(path.join(__dirname, '../graphql/typeDefs/notification.gql'), 'utf8'));
const playlist = gql(fs.readFileSync(path.join(__dirname, '../graphql/typeDefs/playlist.gql'), 'utf8'));
const refund = gql(fs.readFileSync(path.join(__dirname, '../graphql/typeDefs/refund.gql'), 'utf8'));
const review = gql(fs.readFileSync(path.join(__dirname, '../graphql/typeDefs/review.gql'), 'utf8'));
const royalty = gql(fs.readFileSync(path.join(__dirname, '../graphql/typeDefs/royalty.gql'), 'utf8'));
const soundPacks = gql(fs.readFileSync(path.join(__dirname, '../graphql/typeDefs/soundPacks.gql'), 'utf8'));
const story = gql(fs.readFileSync(path.join(__dirname, '../graphql/typeDefs/story.gql'), 'utf8'));
const subscription = gql(fs.readFileSync(path.join(__dirname, '../graphql/typeDefs/subscription.gql'), 'utf8'));
const ticket = gql(fs.readFileSync(path.join(__dirname, '../graphql/typeDefs/ticket.gql'), 'utf8'));
const track = gql(fs.readFileSync(path.join(__dirname, '../graphql/typeDefs/track.gql'), 'utf8'));
const transaction = gql(fs.readFileSync(path.join(__dirname, '../graphql/typeDefs/transaction.gql'), 'utf8'));
const transactionMeta = gql(fs.readFileSync(path.join(__dirname, '../graphql/typeDefs/transactionMeta.gql'), 'utf8'));
const trivia = gql(fs.readFileSync(path.join(__dirname, '../graphql/typeDefs/trivia.gql'), 'utf8'));
const user = gql(fs.readFileSync(path.join(__dirname, '../graphql/typeDefs/user.gql'), 'utf8'));
const virtualGoods = gql(fs.readFileSync(path.join(__dirname, '../graphql/typeDefs/virtualGoods.gql'), 'utf8'));
const virtualInstrument = gql(fs.readFileSync(path.join(__dirname, '../graphql/typeDefs/virtualInstrument.gql'), 'utf8'));
const virtualStudioSessions = gql(fs.readFileSync(path.join(__dirname, '../graphql/typeDefs/virtualStudioSessions.gql'), 'utf8'));
const virtualVenue = gql(fs.readFileSync(path.join(__dirname, '../graphql/typeDefs/virtualVenue.gql'), 'utf8'));
const voting = gql(fs.readFileSync(path.join(__dirname, '../graphql/typeDefs/voting.gql'), 'utf8'));
const walletBasicInfos = gql(fs.readFileSync(path.join(__dirname, '../graphql/typeDefs/walletBasicInfos.gql'), 'utf8'));
const walletLoginSecurity = gql(fs.readFileSync(path.join(__dirname, '../graphql/typeDefs/walletLoginSecurity.gql'), 'utf8'));
const walletSecurity = gql(fs.readFileSync(path.join(__dirname, '../graphql/typeDefs/walletSecurity.gql'), 'utf8'));
const walletWhitelist = gql(fs.readFileSync(path.join(__dirname, '../graphql/typeDefs/walletWhitelist.gql'), 'utf8'));
const workshop = gql(fs.readFileSync(path.join(__dirname, '../graphql/typeDefs/workshop.gql'), 'utf8'));

// Initialize an object to hold your resolvers
const resolvers = {};

// Merge your imported resolvers
merge(
    resolvers,
    albumConceptsResolver,
    albumListeningPartyResolver,
    albumResolver,
    artistBlogResolver,
    artistCollabRequestsResolver,
    artistDiaryResolver,
    artistEndorsementsResolver,
    artistProfileResolver,
    badgeResolver,
    behindTheScenesResolver,
    bidResolver,
    blockchainDataResolver,
    challengesResolver,
    chatResolver,
    collaborationResolver,
    commentResolver,
    customizedMerchResolver,
    disputeResolver,
    equipmentRentalsResolver,
    eventResolver,
    fanArtResolver,
    fanClubResolver,
    fanExperienceResolver,
    genreResolver,
    labelResolver,
    leaderboardResolver,
    mentorshipResolver,
    merchandiseResolver,
    musicLessonsResolver,
    musicVideoResolver,
    nftResolver,
    notificationResolver,
    playlistResolver,
    refundResolver,
    reviewResolver,
    royaltyResolver,
    soundPacksResolver,
    storyResolver,
    subscriptionResolver,
    ticketResolver,
    trackResolver,
    transactionMetaResolver,
    transactionResolver,
    triviaResolver,
    userResolver,
    virtualGoodsResolver,
    virtualInstrumentResolver,
    virtualStudioSessionsResolver,
    virtualVenueResolver,
    votingResolver,
    walletBasicInfosResolver,
    walletLoginSecurityResolver,
    walletSecurityResolver,
    walletWhitelistResolver,
    workshopResolver
);

// Create an array to store your TypeDefs
const typeDefs = [
    album,
    albumConcepts,
    albumListeningParty,
    artistBlog,
    artistCollabRequests,
    artistDiary,
    artistEndorsements,
    artistProfile,
    badge,
    behindTheScenes,
    bid,
    blockchainData,
    challenges,
    chat,
    collaboration,
    comment,
    customizedMerch,
    dispute,
    equipmentRentals,
    event,
    fanArt,
    fanClub,
    fanExperience,
    genre,
    label,
    leaderboard,
    mentorship,
    merchandise,
    musicLessons,
    musicVideo,
    nft,
    notification,
    playlist,
    refund,
    review,
    royalty,
    soundPacks,
    story,
    subscription,
    ticket,
    track,
    transaction,
    transactionMeta,
    trivia,
    user,
    virtualGoods,
    virtualInstrument,
    virtualStudioSessions,
    virtualVenue,
    voting,
    walletBasicInfos,
    walletLoginSecurity,
    walletSecurity,
    walletWhitelist,
    workshop
];

// Export them
module.exports = {
    resolvers,
    typeDefs
};
