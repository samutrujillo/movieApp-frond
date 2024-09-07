'use client';

import { useState, useCallback } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Heart, HeartFill } from 'react-bootstrap-icons';
import AuthModal from './AuthModal';
import { useMovies } from '../hooks/useMovies';

const CircularProgressBar = ({ percentage }) => {
  const roundedPercentage = Math.round(percentage);
  const strokeWidth = 4;
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (roundedPercentage / 100) * circumference;

  return (
    <div style={{ position: 'relative', width: '48px', height: '48px' }}>
      <svg width="48" height="48" viewBox="0 0 48 48">
        <circle
          cx="24"
          cy="24"
          r={radius}
          fill="none"
          stroke="#204529"
          strokeWidth={strokeWidth}
        />
        <circle
          cx="24"
          cy="24"
          r={radius}
          fill="none"
          stroke="#21d07a"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform="rotate(-90 24 24)"
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '14px',
          fontWeight: 'bold',
          color: 'white'
        }}
      >
        {roundedPercentage}
      </div>
    </div>
  );
};

const FavoriteButton = ({ onClick, isFavorite }) => (
  <button
    onClick={onClick}
    style={{
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: 0,
      marginRight: '10px',
    }}
  >
    {isFavorite ? (
      <HeartFill color="red" size={24} />
    ) : (
      <Heart color="white" size={24} />
    )}
  </button>
);

export default function RecommendedSlider() {
  const [favorites, setFavorites] = useState({});
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [currentMovieId, setCurrentMovieId] = useState(null);
  const { movies } = useMovies("https://movieapp-back-pcy3.onrender.com/movies/get-released-soon");

  const toggleFavorite = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    setFavorites(prev => ({...prev, [currentMovieId]: !prev[currentMovieId]}));
    setShowAuthModal(true);
  }, [currentMovieId]);

  const handleSlideChange = useCallback((selectedIndex) => {
    setCurrentMovieId(movies[selectedIndex]?.id || null);
  }, [movies]);

  const currentMovie = movies.find(m => m.id === currentMovieId);

  return (
    <div style={{ position: 'relative' }}>
      <Carousel className="mb-4" onSlide={handleSlideChange}>
        {movies.map((movie) => (
          <Carousel.Item key={movie.id}>
            <div
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${
                  movie.backdrop_path || movie.poster_path
                })`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                height: "56.25vw",
                maxHeight: "60vh",
                width: "100%",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  padding: "20px",
                }}
              >
                <h3>{movie.title}</h3>
                <p>{movie.overview}</p>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          display: 'flex',
          alignItems: 'center',
          zIndex: 10,
          marginBottom: '100px'
        }}
      >
        <FavoriteButton 
          onClick={toggleFavorite}
          isFavorite={favorites[currentMovieId]}
        />
        <CircularProgressBar percentage={currentMovie?.vote_average * 10 || 0} />
      </div>
      <AuthModal show={showAuthModal} onHide={() => setShowAuthModal(false)} />
    </div>
  );
}