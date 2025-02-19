import MovieDetails from './MovieDetails';
// import MovieReviews from './MovieReviews';

const MoviePage: React.FC = () => (
    <div className='min-h-screen w-full bg-gray-50'>
        <main className='max-w-6xl mx-auto p-6'>
            <MovieDetails />
            {/* <MovieReviews /> */}
        </main>
    </div>
);

export default MoviePage;
