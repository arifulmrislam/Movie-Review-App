export interface GenreAttributes {
    genres_id: number;
    genre: string;
}

export type GenreCreationAttributes = Optional<GenreAttributes, 'genres_id'>;