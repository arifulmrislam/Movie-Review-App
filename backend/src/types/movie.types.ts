export interface MovieAttributes {
    movie_id: number;
    user_id: number;
    movie_title: string;
    movie_img: string;
    movie_desc: string;
    release_year: number;
    director_name: string;
    duration_minutes: number;
    producer_name: string;
}

export type MovieCreationAttributes = Optional<MovieAttributes, 'movie_id'>;