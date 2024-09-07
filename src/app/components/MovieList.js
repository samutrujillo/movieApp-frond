'use client';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import MovieCard from './MovieCard';
import { useRouter } from 'next/navigation'; // 
import { useMovies } from '../hooks/useMovies';

export default function MovieList({ searchQuery, selectedGenre }) {
  const { movies, page, totalPages, loading, goToNextPage, goToPreviousPage } = useMovies("https://movieapp-back-pcy3.onrender.com/movies/get-movies");
  const router = useRouter();

  const handleCardClick = (id) => {
    router.push(`/movies/${id}`);
  };

  return (
    <>
      {loading && (
        <div className="text-center my-4">
          <p>Loading...</p>
        </div>
      )}
      {!loading && (
        <>
          <Row>
            {movies.map((movie) => (
              <Col key={movie.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                <MovieCard movie={movie} onClick={() => handleCardClick(movie.id)} />
              </Col>
            ))}
          </Row>
          <div className="text-center my-4">
            <Button
              onClick={goToPreviousPage}
              disabled={page === 1}
              className="me-2"
            >
              Anterior
            </Button>
            <Button
              onClick={goToNextPage}
              disabled={page === totalPages}
            >
              Siguiente
            </Button>
          </div>
        </>
      )}
    </>
  );
}
