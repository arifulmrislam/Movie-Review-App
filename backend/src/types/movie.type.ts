import { Optional } from 'sequelize';

export interface MovieAttributes {
    movie_id: number;
    user_id: number;
    title: string;
    img?: string;
    desc?: string;
    release_yr: number;
    length?: number;
    producer?: string;
}

export interface MovieCreationAttributes extends Optional<MovieAttributes, "movie_id"> { }