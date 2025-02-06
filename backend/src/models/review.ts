import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import Movie from './movie';
import User from './user';
import { ReviewAttributes, ReviewCreationAttributes } from "../types/review.types";

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
            autoIncrement: true, 
        },
        movie_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'Movies', key: 'movie_id' }, 
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'Users', key: 'user_id' }, 
        },
        rating: {
            type: DataTypes.DECIMAL(3, 2), 
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
