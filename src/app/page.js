'use client';

import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import RecommendedSlider from './components/RecommendedSlider';
import MovieList from './components/MovieList';
import SearchBar from './components/SearchBar';
import GenreFilter from './components/GenreFilter';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  return (
    <>
      <RecommendedSlider />
      <Container fluid>
        <Row>
          <Col xs={12} md={3} className="p-4 bg-dark ">
            <h3>Search</h3>
            <SearchBar  onSearch={setSearchQuery}/>
            <h3 className="mt-4">Genres</h3>
            <GenreFilter onGenreChange={setSelectedGenre} />
          </Col>
          <Col xs={12} md={9} className="p-4 bg-cart">
            <h2>Popular</h2>
            <MovieList searchQuery={searchQuery} selectedGenre={selectedGenre} />
          </Col>
        </Row>
      </Container>
    </>
  );
}