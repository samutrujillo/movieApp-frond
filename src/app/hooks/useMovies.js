
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export function useMovies(initialUrl) {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [url, setUrl] = useState(initialUrl);

  const fetchMovies = useCallback(async (pageNumber) => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}?page=${pageNumber}`);
      const { results, total_pages } = response.data;
      setMovies(results);
      setTotalPages(total_pages);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies(page);
  }, [page, fetchMovies]);

  const goToNextPage = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  return { movies, page, totalPages, loading, goToNextPage, goToPreviousPage };
}
