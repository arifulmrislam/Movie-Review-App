export interface ReviewAttributes {
    review_id: number;
    movie_id: number;
    user_id: number;
    rating: number;
    comment: string;
}

export type ReviewCreationAttributes = Optional<ReviewAttributes, 'review_id'>;
