'use client';

import Form from 'react-bootstrap/Form';
import { Search } from 'react-bootstrap-icons';

export default function SearchBar({ onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(e.target.search.value);
  };

  return (
    <Form  onSubmit={handleSubmit}>
      <div className="search-container">
        <Form.Control
          type="search"
          placeholder="Search movies"
          aria-label="Search"
          name="search"
        />
        <Search className="search-icon" />
      </div>
    </Form>
  );
}