import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import Movie from './movie';
import User from './user';

interface ReviewAttributes {
    review_id: number;
    movie_id: number;
    user_id: number;
    rating: number;
    comment: string;
}

export interface ReviewCreationAttributes extends Optional<ReviewAttributes, 'review_id'> { }

class Review extends Model<ReviewAttributes, ReviewCreationAttributes> implements ReviewAttributes {
    review_id!: number;
    movie_id!: number;
    user_id!: number;
    rating!: number;
    comment!: string;
}

Review.init(
    {
        review_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true, // SERIAL in PostgreSQL
        },
        movie_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'Movies', key: 'movie_id' }, // Foreign key to Movies
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'Users', key: 'user_id' }, // Foreign key to Users
        },
        rating: {
            type: DataTypes.DECIMAL(3, 2), // For ratings like 9.5
            allowNull: false,
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'Reviews',
        underscored: true,
    }
);

export default Review;
