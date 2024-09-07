'use client';

import { useState, useCallback } from 'react';
import Card from 'react-bootstrap/Card';
import { Heart, HeartFill } from 'react-bootstrap-icons';
import AuthModal from './AuthModal'; 
import { useRouter } from 'next/navigation'; 

const CircularProgressBar = ({ percentage }) => {
  const roundedPercentage = Math.round(percentage);
  const strokeWidth = 4;
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (roundedPercentage / 100) * circumference;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <p style={{ margin: 0, color: 'white' }}>Rating</p>
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
    </div>
  );
};

const FavoriteButton = ({ onClick, isFavorite }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <p style={{ margin: 0, color: 'white' }}>Favorites</p>
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
  </div>
);

export default function MovieCard({ movie }) {
  const [favorites, setFavorites] = useState({});
  const [showAuthModal, setShowAuthModal] = useState(false);
  const router = useRouter(); 

  const toggleFavorite = useCallback(() => {
    setFavorites(prev => ({ ...prev, [movie.id]: !prev[movie.id] }));
    setShowAuthModal(true);
  }, [movie.id]);

  const handleCardClick = () => {
    router.push(`/movies/${movie.id}`);
  };

  return (
    <>
      <Card 
        bg="dark" 
        text="white" 
        style={{ height: '100%', display: 'flex', flexDirection: 'column', cursor: 'pointer' }} 
        onClick={handleCardClick}
      >
        <Card.Img 
          variant="top" 
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} 
          style={{ height: '300px', objectFit: 'cover' }} 
        />
        <Card.Body style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Card.Title>{movie.title}</Card.Title>
          <div className="d-flex justify-content-between align-items-center">
            <CircularProgressBar percentage={movie.vote_average * 10} />
            <FavoriteButton
              onClick={(e) => {
                e.stopPropagation(); 
                toggleFavorite();
              }}
              isFavorite={favorites[movie.id]}
            />
          </div>
        </Card.Body>
      </Card>
      <AuthModal show={showAuthModal} onHide={() => setShowAuthModal(false)} />
    </>
  );
}
