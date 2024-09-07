'use client';

import Form from 'react-bootstrap/Form';

const genres = ['Action', 'Comedy', 'Drama', 'Sci-Fi', 'Horror', 'Romance'];

export default function GenreFilter({ onGenreChange }) {
  return (
    <Form.Select onChange={(e) => onGenreChange(e.target.value)}>
      <option value="">All Genres</option>
      {genres.map((genre) => (
        <option key={genre} value={genre}>
          {genre}
        </option>
      ))}
    </Form.Select>
  );
}