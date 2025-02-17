import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { User, Send } from 'lucide-react';

interface Review {
    id: string;
    rating: number;
    comment: string;
    user: string;
}

const MovieReviews: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [reviews, setReviews] = useState<Review[]>([]);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [reviewToEdit, setReviewToEdit] = useState<Review | null>(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3000/api/review?movie_id=${Number(id)}`
                );
                if (!response.ok) throw new Error('Failed to fetch reviews');
                const data = await response.json();
                setReviews(data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, [id]);

const handleReviewSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const token = localStorage.getItem('token');
  if (!token) {
    console.error('User is not logged in.');
    return;
  }

  // Decode the token to extract user info (assuming your token is a JWT)
  const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
  const userId = decodedToken.id; // Adjust according to your token structure

  const url = editMode
    ? `http://localhost:3000/api/review/${reviewToEdit.id}`
    : 'http://localhost:3000/api/review/';

  const method = editMode ? 'PUT' : 'POST';

  try {
    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        rating,
        comment,
        user_id: userId, // Use dynamic user_id here
        movie_id: id,
      }),
    });

    if (!response.ok) throw new Error('Failed to submit review');

    // Re-fetch reviews after adding or editing
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/review?movie_id=${Number(id)}`
        );
        if (!response.ok) throw new Error('Failed to fetch reviews');
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();

    setComment('');
    setRating(5);
    setEditMode(false);
    setReviewToEdit(null);
  } catch (error) {
    console.error('Error submitting review:', error);
  }
};



    const renderStars = (rating: number) =>
        Array.from({ length: 5 }, (_, index) => (
            <span
                key={index}
                className={`text-lg ${index < rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
            >
                ★
            </span>
        ));
const handleEdit = (id: string) => {
    const selectedReview = reviews.find((r) => r.id === id);
    if (!selectedReview) return;
    
    setEditMode(true);
    setReviewToEdit(selectedReview);
    setComment(selectedReview.comment);
    setRating(selectedReview.rating);
};


const handleDelete = async (id: string) => {
    try {
        const response = await fetch(`http://localhost:3000/api/review/${id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
        });

        if (!response.ok) throw new Error("Failed to delete review");

        setReviews(reviews.filter((review) => review.id !== id));
    } catch (error) {
        console.error("Error deleting review:", error);
    }
};



    return (
        <div>
            <h2 className='text-2xl font-bold mb-6 text-gray-800'>Reviews</h2>
            <div className='grid gap-6 md:grid-cols-2'>
                {reviews.map((review) => (
                    <div
                        key={review.id}
                        className='p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow mb-4'
                    >
                        <div className='flex justify-between items-center'>
                            <div className='flex items-center'>
                                <User className='w-6 h-6 mr-2 text-gray-500' />
                                <strong className='text-gray-800'>
                                    {review.user?.name}
                                </strong>
                                <p>{review.review}</p>
                            </div>
                            <div className='flex space-x-2'>
                                <button
                                    onClick={() => handleEdit(review.id)}
                                    className='text-blue-500 hover:text-blue-600 focus:outline-none'
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(review.id)}
                                    className='text-red-500 hover:text-red-600 focus:outline-none'
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                        <div className='mt-4'>
                            <div className='flex items-center gap-2 mb-3'>
                                <div className='flex'>{renderStars(review.rating)}</div>
                                <span className='text-gray-600'>({review.rating}/5)</span>
                            </div>
                            <p className='text-gray-700 mb-4'>{review.comment}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Review Form */}
            <div className='max-w-2xl mt-8'>
                <form
                    onSubmit={handleReviewSubmit}
                    className='bg-white p-6 rounded-lg shadow-md'
                >
                    <h3 className='text-xl font-semibold mb-4'>Add Your Review</h3>
                    <div className='mb-4'>
                        <label className='block mb-2 font-medium'>Rating</label>
                        <div className='flex gap-2'>
                            {[1, 2, 3, 4, 5].map((value) => (
                                <button
                                    key={value}
                                    type='button'
                                    onClick={() => setRating(value)}
                                    className={`text-2xl ${value <= rating ? 'text-yellow-400' : 'text-gray-300'
                                        }`}
                                >
                                    ★
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='comment' className='block mb-2 font-medium'>
                            Your Review
                        </label>
                        <textarea
                            id='comment'
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            required
                            rows={4}
                            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition'
                            placeholder='Share your thoughts about the movie...'
                        />
                    </div>
                    <button
                        type='submit'
                        className='flex items-center gap-2 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors'
                    >
                        <Send className='w-4 h-4' />
                        Submit Review
                    </button>
                </form>
            </div>
        </div>
    );
};

export default MovieReviews;
