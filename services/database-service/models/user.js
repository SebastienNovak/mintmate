const crypto = require('crypto');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        recoveryEmail: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true
            }
        },
        phoneNumber: DataTypes.STRING,
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        profileImage: DataTypes.STRING,
        bio: DataTypes.TEXT,
        dateOfBirth: DataTypes.DATE,
        role: {
            type: DataTypes.ENUM('user', 'artist', 'admin'),
            defaultValue: 'user'
        },
        isVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        signupMethod: {
            type: DataTypes.ENUM('direct', 'facebook', 'google'),
            defaultValue: 'direct'
        },
        walletAddress: DataTypes.STRING,
        notificationsEnabled: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        lastLogin: DataTypes.DATE,
        country: DataTypes.STRING,
        settings: DataTypes.JSON,
        socialMediaLinks: DataTypes.JSON,
        referralCode: DataTypes.STRING,
        accountStatus: {
            type: DataTypes.ENUM('active', 'suspended', 'deactivated'),
            defaultValue: 'active'
        },
        followersCount: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        followingCount: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        twoFactorEnabled: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        twoFactorSecret: DataTypes.STRING,
        apiTokens: DataTypes.JSON,
        privacySettings: DataTypes.JSON,
        preferredLanguage: DataTypes.STRING,
        timezone: DataTypes.STRING,
        badges: DataTypes.JSON,
        lastPasswordChange: DataTypes.DATE,
        passwordResetToken: DataTypes.STRING,
        passwordResetExpiry: DataTypes.DATE,
        loginHistory: DataTypes.JSON,
        affiliation: DataTypes.STRING,
        pinnedItems: DataTypes.JSON,
    }, {
        scopes: {
            verified: {
                where: {
                    isVerified: true
                }
            },
            admin: {
                where: {
                    role: 'admin'
                }
            }
        },
        indexes: [
            { unique: true, fields: ['email', 'username'] },
            { fields: ['country'] }
        ]
    });

    User.associate = (models) => {
        User.belongsToMany(models.User, { as: 'Followers', through: 'UserFollowers', foreignKey: 'userId' });
        User.belongsToMany(models.User, { as: 'Following', through: 'UserFollowers', foreignKey: 'followerId' });
        User.hasMany(models.Playlist, { foreignKey: 'userId', as: 'playlists' });
        User.belongsToMany(models.Artist, { through: 'UserFavoriteArtists', foreignKey: 'userId' });
        User.belongsToMany(models.Album, { through: 'UserFavoriteAlbums', foreignKey: 'userId' });
        User.hasMany(models.Ticket, { foreignKey: 'userId', as: 'tickets' });
        User.hasOne(models.Wallet, { foreignKey: 'userId', as: 'wallet' });
        User.hasMany(models.Transaction, { foreignKey: 'userId', as: 'transactions' });
        User.hasOne(models.ArtistProfile, { foreignKey: 'userId', as: 'artistProfile' });
    };

     // Hooks
    User.beforeCreate(async (user, options) => {
        if (user.password) {
            user.password = await bcrypt.hash(user.password, 10);
        }
    });

    User.beforeUpdate(async (user, options) => {
        if (user.changed('password')) {
            user.password = await bcrypt.hash(user.password, 10);
        }
        if (user.changed('email')) {
            user.isVerified = false;
            // Potentially add code to send verification email
        }
    });

     // Methods
    User.prototype.validPassword = async function(password) {
        return await bcrypt.compare(password, this.password);
    };

    User.prototype.generatePasswordResetToken = function() {
        this.passwordResetToken = crypto.randomBytes(20).toString('hex');
        this.passwordResetExpiry = new Date(Date.now() + 1*60*60*1000); // set token to expire in 1 hour
    };

    User.prototype.invalidatePasswordResetToken = function() {
        this.passwordResetToken = null;
        this.passwordResetExpiry = null;
    };

    return User;
};
