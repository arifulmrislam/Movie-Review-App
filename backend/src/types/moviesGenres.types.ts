export interface MoviesGenresAttributes {
    moviesgenres_id: number;
    genres_id: number;
    movie_id: number;
}

export type MoviesGenresCreationAttributes = Optional<MoviesGenresAttributes, 'moviesgenres_id'>;