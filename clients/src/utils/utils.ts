export const randomlySelectMovies = (movies, count) => {
    const shuffledMovies = movies.slice().sort(() => Math.random() - 0.5);
    return shuffledMovies.slice(0, count);
}