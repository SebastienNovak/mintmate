import { configureStore } from '@reduxjs/toolkit';
import userPrivateProfileReducer from './slices/userAndArtist/userPrivateProfileSlice';
import userPublicProfileReducer from './slices/userAndArtist/userPublicProfileSlice';
import tooltipsReducer from './slices/utility/tooltipsSlice';
import paginationReducer from './slices/utility/paginationSlice';
import breadcrumbsReducer from './slices/utility/breadcrumbsSlice';
import userEditProfileReducer from './slices/userAndArtist/userEditProfileSlice';
import notificationCenterReducer from './slices/userAndArtist/notificationCenterSlice';
import artistPortfolioReducer from './slices/userAndArtist/artistPortfolioSlice';
import artistDiaryReducer from './slices/userAndArtist/artistDiarySlice';
import artistCollaborationRequestsReducer from './slices/userAndArtist/artistCollaborationRequestsSlice';
import artistBlogReducer from './slices/userAndArtist/artistBlogSlice';
import followButtonReducer from './slices/social/followButtonSlice';
import reactionButtonReducer from './slices/social/reactionButtonSlice';
import shareButtonReducer from './slices/social/shareButtonSlice';
import accessibilitySettingsReducer from './slices/settingsAndConfiguration/accessibilitySettingsSlice';
import securitySettingsReducer from './slices/settingsAndConfiguration/securitySettingsSlice';
import userSettingsReducer from './slices/settingsAndConfiguration/userSettingsSlice';
import discoveryFeedReducer from './slices/searchAndDiscover/discoveryFeedSlice';
import searchBarReducer from './slices/searchAndDiscover/searchBarSlice';
import searchResultsReducer from './slices/searchAndDiscover/searchResultsSlice';
import moderationQueueReducer from './slices/safetyAndModeration/moderationQueueSlice';
import reportReducer from './slices/safetyAndModeration/reportSlice';
import mobileNavbarReducer from './slices/responsive/mobileNavbarSlice';
import tabletSidebarReducer from './slices/responsive/tabletSidebarSlice';
import billingHistoryReducer from './slices/payment/billingHistorySlice';
import checkoutReducer from './slices/payment/checkoutSlice';
import paymentGatewayReducer from './slices/payment/paymentGatewaySlice';
import subscriptionManagementReducer from './slices/payment/subscriptionManagementSlice';
import badgeDisplayReducer from './slices/other/badgeDisplaySlice';
import collaborationCardReducer from './slices/other/collaborationCardSlice';
import errorBoundaryReducer from './slices/other/errorBoundarySlice';
import loadingSpinnerReducer from './slices/other/loadingSpinnerSlice';
import modalReducer from './slices/other/modalSlice';
import refundRequestReducer from './slices/other/refundRequestSlice';
import reviewCardReducer from './slices/other/reviewCardSlice';
import artistOnboardingReducer from './slices/onboarding/artistOnboardingSlice';
import userOnboardingReducer from './slices/onboarding/userOnboardingSlice';
import notificationDropdownReducer from './slices/notifications/notificationDropdownSlice';
import albumReducer from './slices/music/albumSlice';
import moodBasedPlaylistsReducer from './slices/music/moodBasedPlaylistsSlice';
import personalizedRecommendationsReducer from './slices/music/personalizedRecommendationsSlice';
import playlistReducer from './slices/music/playlistSlice';
import soundPacksReducer from './slices/music/soundPacksSlice';
import trackPlayerReducer from './slices/music/trackPlayerSlice';
import virtualStudioSessionsReducer from './slices/music/virtualStudioSessionsSlice';
import equipmentRentalsReducer from './slices/merchandiseAndGoods/equipmentRentalsSlice';
import merchandiseListReducer from './slices/merchandiseAndGoods/merchandiseListSlice';
import productPageReducer from './slices/merchandiseAndGoods/productPageSlice';
import virtualInstrumentGalleryReducer from './slices/merchandiseAndGoods/virtualInstrumentGallerySlice';
import audioUploaderReducer from './slices/media/audioUploaderSlice';
import imageUploaderReducer from './slices/media/imageUploaderSlice';
import videoPlayerReducer from './slices/media/videoPlayerSlice';
import languageSwitcherReducer from './slices/localization/languageSwitcherSlice';
import regionSpecificContentReducer from './slices/localization/regionSpecificContentSlice';
import resourceLibraryReducer from './slices/learningAndResources/resourceLibrarySlice';
import tutorialCenterReducer from './slices/learningAndResources/tutorialCenterSlice';
import footerReducer from './slices/layout/footerSlice';
import navbarReducer from './slices/layout/navbarSlice';
import sidebarReducer from './slices/layout/sidebarSlice';
import accordionReducer from './slices/interactivity/accordionSlice';
import carouselReducer from './slices/interactivity/carouselSlice';
import challengesReducer from './slices/interactivity/challengesSlice';
import chatBoxReducer from './slices/interactivity/chatBoxSlice';
import commentSectionReducer from './slices/interactivity/commentSectionSlice';
import leaderboardReducer from './slices/interactivity/leaderboardSlice';
import triviaReducer from './slices/interactivity/triviaSlice';
import votingReducer from './slices/interactivity/votingSlice';
import FAQReducer from './slices/feedbackAndSupport/FAQSlice';
import feedbackFormReducer from './slices/feedbackAndSupport/feedbackFormSlice';
import supportChatReducer from './slices/feedbackAndSupport/supportChatSlice';
import albumListeningPartyReducer from './slices/eventAndExperience/albumListeningPartySlice';
import eventCalendarReducer from './slices/eventAndExperience/eventCalendarSlice';
import eventDetailReducer from './slices/eventAndExperience/eventDetailSlice';
import eventListReducer from './slices/eventAndExperience/eventListSlice';
import virtualVenueReducer from './slices/eventAndExperience/virtualVenueSlice';
import workshopReducer from './slices/eventAndExperience/workshopSlice';
import mentorshipReducer from './slices/educationAndLearning/mentorshipSlice';
import musicLessonsReducer from './slices/educationAndLearning/musicLessonsSlice';
import storyReducer from './slices/educationAndLearning/storySlice';
import marketplaceLandingReducer from './slices/economicAndNFT/NFTDetailSlice';
import NFTDetailReducer from './slices/economicAndNFT/NFTGallerySlice';
import NFTGalleryReducer from './slices/economicAndNFT/marketplaceLandingSlice';
import transactionHistoryReducer from './slices/economicAndNFT/transactionHistorySlice';
import walletReducer from './slices/economicAndNFT/walletSlice';
import achievementsGalleryReducer from './slices/communityAndFan/achievementsGallerySlice';
import fanArtGalleryReducer from './slices/communityAndFan/fanArtGallerySlice';
import fanClubReducer from './slices/communityAndFan/fanClubSlice';
import fanExperienceReducer from './slices/communityAndFan/fanExperienceSlice';
import forumReducer from './slices/communityAndFan/forumSlice';
import milestonesReducer from './slices/communityAndFan/milestonesSlice';
import trendingReducer from './slices/communityAndFan/trendingSlice';
import collaborationBoardReducer from './slices/collaborationAndNetworking/collaborationBoardSlice';
import networkingHubReducer from './slices/collaborationAndNetworking/networkingHubSlice';
import emailVerificationReducer from './slices/authenticationAndAuthorization/emailVerificationSlice';
import forgotPasswordReducer from './slices/authenticationAndAuthorization/forgotPasswordSlice';
import loginReducer from './slices/authenticationAndAuthorization/loginSlice';
import registerReducer from './slices/authenticationAndAuthorization/registerSlice';
import resetPasswordReducer from './slices/authenticationAndAuthorization/resetPasswordSlice';
import twoFactorAuthenticationReducer from './slices/authenticationAndAuthorization/twoFactorAuthenticationSlice';
import artistDashboardReducer from './slices/analytics/artistDashboardSlice';
import userDashboardReducer from './slices/analytics/userDashboardSlice';

const store = configureStore({
    reducer: {
        userPrivateProfile: userPrivateProfileReducer,
        userPublicProfile: userPublicProfileReducer,
        tooltips: tooltipsReducer,
        pagination: paginationReducer,
        breadcrumbs: breadcrumbsReducer,
        userEditProfile: userEditProfileReducer,
        notificationCenter: notificationCenterReducer,
        artistPortfolio: artistPortfolioReducer,
        artistDiary: artistDiaryReducer,
        artistCollaborationRequests: artistCollaborationRequestsReducer,
        artistBlog: artistBlogReducer,
        followButton: followButtonReducer,
        reactionButton: reactionButtonReducer,
        shareButton: shareButtonReducer,
        accessibilitySettings: accessibilitySettingsReducer,
        securitySettings: securitySettingsReducer,
        userSettings: userSettingsReducer,
        discoveryFeed: discoveryFeedReducer,
        searchBar: searchBarReducer,
        searchResults: searchResultsReducer,
        moderationQueue: moderationQueueReducer,
        report: reportReducer,
        mobileNavbar: mobileNavbarReducer,
        tabletSidebar: tabletSidebarReducer,
        billingHistory: billingHistoryReducer,
        checkout: checkoutReducer,
        paymentGateway: paymentGatewayReducer,
        subscriptionManagement: subscriptionManagementReducer,
        badgeDisplay: badgeDisplayReducer,
        collaborationCard: collaborationCardReducer,
        errorBoundary: errorBoundaryReducer,
        loadingSpinner: loadingSpinnerReducer,
        modal: modalReducer,
        refundRequest: refundRequestReducer,
        reviewCard: reviewCardReducer,
        artistOnboarding: artistOnboardingReducer,
        userOnboarding: userOnboardingReducer,
        notificationDropdown: notificationDropdownReducer,
        album: albumReducer,
        moodBasedPlaylists: moodBasedPlaylistsReducer,
        personalizedRecommendations: personalizedRecommendationsReducer,
        playlist: playlistReducer,
        soundPacks: soundPacksReducer,
        trackPlayer: trackPlayerReducer,
        virtualStudioSessionsReducer: virtualStudioSessionsReducer,
        equipmentRentals: equipmentRentalsReducer,
        merchandiseList: merchandiseListReducer,
        productPage: productPageReducer,
        virtualInstrumentGallery: virtualInstrumentGalleryReducer,
        audioUploader: audioUploaderReducer,
        imageUploader: imageUploaderReducer,
        videoPlayer: videoPlayerReducer,
        languageSwitcher: languageSwitcherReducer,
        regionSpecificContent: regionSpecificContentReducer,
        resourceLibrary: resourceLibraryReducer,
        tutorialCenter: tutorialCenterReducer,
        footer: footerReducer,
        navbar: navbarReducer,
        sidebar: sidebarReducer,
        accordion: accordionReducer,
        carousel: carouselReducer,
        challenges: challengesReducer,
        chatBox: chatBoxReducer,
        commentSection: commentSectionReducer,
        leaderboard: leaderboardReducer,
        trivia: triviaReducer,
        voting: votingReducer,
        FAQ: FAQReducer,
        feedbackForm: feedbackFormReducer,
        supportChat: supportChatReducer,
        albumListeningParty: albumListeningPartyReducer,
        eventCalendar: eventCalendarReducer,
        eventDetail: eventDetailReducer,
        eventList: eventListReducer,
        virtualVenue: virtualVenueReducer,
        workshop: workshopReducer,
        mentorship: mentorshipReducer,
        musicLessons: musicLessonsReducer,
        story: storyReducer,
        marketplaceLanding: marketplaceLandingReducer,
        NFTDetail: NFTDetailReducer,
        NFTGallery: NFTGalleryReducer,
        transactionHistory: transactionHistoryReducer,
        wallet: walletReducer,
        achievementsGallery: achievementsGalleryReducer,
        fanArtGallery: fanArtGalleryReducer,
        fanClub: fanClubReducer,
        fanExperience: fanExperienceReducer,
        forum: forumReducer,
        milestones: milestonesReducer,
        trending: trendingReducer,
        collaborationBoard: collaborationBoardReducer,
        networkingHub: networkingHubReducer,
        emailVerification: emailVerificationReducer,
        forgotPassword: forgotPasswordReducer,
        login: loginReducer,
        register: registerReducer,
        resetPassword: resetPasswordReducer,
        twoFactorAuthentication: twoFactorAuthenticationReducer,
        artistDashboard: artistDashboardReducer,
        userDashboard: userDashboardReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(), // This includes thunk by default
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
