const artistBlogResolver = {
    Query: {
        artistBlog: async (_, { id }, context) => {
            // Authentication and Authorization
            if (!context.user || !context.user.hasPermission('READ_ARTIST_BLOG')) {
                throw new Error('Unauthorized');
            }
            
            // Input Validation
            if (!id) {
                throw new Error('ID is required to retrieve an ArtistBlog');
            }
            
            try {
                // Retrieve a specific ArtistBlog by ID
                return await context.dataSources.artistBlogAPI.getArtistBlogById(id);
            } catch (error) {
                // Logging and Error Handling
                console.error(error);
                throw new Error('An error occurred while fetching Artist Blog');
            }
        },
        artistBlogs: async (_, __, context) => {
            // Authentication and Authorization
            if (!context.user || !context.user.hasPermission('READ_ARTIST_BLOGS')) {
                throw new Error('Unauthorized');
            }
            
            try {
                // Retrieve all ArtistBlogs
                return await context.dataSources.artistBlogAPI.getAllArtistBlogs();
            } catch (error) {
                // Logging and Error Handling
                console.error(error);
                throw new Error('An error occurred while fetching Artist Blogs');
            }
        },
    },
    ArtistBlog: {
        user: async (artistBlog, _, context) => {
            // Authentication and Authorization
            if (!context.user || !context.user.hasPermission('READ_ARTIST_PROFILE')) {
                throw new Error('Unauthorized');
            }
            
            try {
                // Resolve the user (ArtistProfile) associated with the ArtistBlog
                return await context.dataSources.artistProfileAPI.getArtistProfileById(artistBlog.userId);
            } catch (error) {
                // Logging and Error Handling
                console.error(error);
                throw new Error('An error occurred while fetching associated Artist Profile');
            }
        },
    },
};

module.exports = artistBlogResolver;
