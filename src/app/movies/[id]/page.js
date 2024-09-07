"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { BsArrowLeft } from 'react-icons/bs'; 
import { AiFillHeart } from 'react-icons/ai'; 
import styles from './MovieDetailsPage.module.css'; 


export default function MovieDetailsPage({ params }) {
  const [movie, setMovie] = useState(null);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    // Obtener los detalles de la película
    axios.get(`https://movieapp-back-pcy3.onrender.com/movies/get-details/${id}`)
      .then(response => {
        setMovie(response.data);
      })
      .catch(error => {
        console.error('Error fetching movie details:', error);
      });

    // Obtener películas recomendadas
    axios.get('https://movieapp-back-pcy3.onrender.com/movies/get-movies?page=1') 
      .then(response => {
        setRecommendedMovies(response.data.results.slice(0, 6)); 
      })
      .catch(error => {
        console.error('Error fetching recommended movies:', error);
      });
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <Container className={styles.pageContainer}>
      <div className={styles.header}>
        <BsArrowLeft className={styles.backIcon} onClick={() => router.push('/')} />
      </div>

      <div className={styles.movieDetailsContent}>
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          className={styles.movieImage}
        />
        <div className={styles.movieDetails}>
          <h1 className={styles.movieTitle}>{movie.title} ({movie.release_date.split('-')[0]})</h1>
          <p className={styles.releaseDate}>Release Date: {movie.release_date}</p>
          <p className={styles.movieOverview}>{movie.overview}</p>
          <Button className={styles.trailerButton}>Official Trailer</Button>
          <div className={styles.favoriteSection}>
            <AiFillHeart className={styles.favoriteIcon} />
            <span className={styles.favoriteText}>Add to Favorites</span>
          </div>
        </div>
      </div>

      <div className={styles.recommendations}>
        <h3 className={styles.recommendationsTitle}>Recommended Movies</h3>
        <Row>
          {recommendedMovies.map(recommendedMovie => (
            <Col key={recommendedMovie.id} xs={12} sm={6} md={4} lg={2} className={styles.recommendationCard}>
              <Card onClick={() => router.push(`/movies/${recommendedMovie.id}`)}>
                <Card.Img
                  variant="top"
                  src={`https://image.tmdb.org/t/p/w500/${recommendedMovie.poster_path}`}
                  alt={recommendedMovie.title}
                />
                <Card.Body>
                  <Card.Title>{recommendedMovie.title}</Card.Title>
                  <p>Rating: {recommendedMovie.vote_average}/10</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
}
