module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gender: {
            type: DataTypes.ENUM('ma', 'fe'),
        },
        profilePicURL: {
            type: DataTypes.STRING,
        },
        address: {
            type: DataTypes.STRING,
        },
        city: {
            type: DataTypes.STRING,
        },
        country: {
            type: DataTypes.STRING,
        },
        role: {
            type: DataTypes.ENUM('user', 'admin'),
            defaultValue: 'user',
        },
        emailToken: {
            type: DataTypes.STRING,
        },
        resetToken: {
            type: DataTypes.STRING,
        },
        expireToken: {
            type: DataTypes.DATE,
        },
        isVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    })

    User.associate = (models) => {
        User.hasMany(models.Order, {
            onDelete: 'cascade',
            foreignKey: 'userId',
            as: 'orders',
        })

        User.hasMany(models.Item, {
            onDelete: 'cascade',
            foreignKey: 'userId',
            as: 'user',
        })

        User.hasMany(models.Wishlist, {
            onDelete: 'cascade',
            foreignKey: 'userId',
            as: 'wishlist',
        })

        User.hasMany(models.Review, {
            onDelete: 'cascade',
            foreignKey: 'userId',
            as: 'review',
        })

        User.hasMany(models.ItemReview, {
            onDelete: 'cascade',
            foreignKey: 'userId',
            as: 'itemReview',
        })

        User.hasMany(models.Comment, {
            onDelete: 'cascade',
            foreignKey: 'userId',
            as: 'comment',
        })
    }

    return User
}
