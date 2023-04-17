import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import {
  SearchButton,
  SearchForm,
  SearchInput,
  Header,
  SearchLabel,
} from './Searchbar.styled';

export function Searchbar({ handleFormSubmit }) {
  const [query, setQuery] = useState('');

  const handleInputChange = e => {
    setQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    const searchQuery = query.trim();

    if (searchQuery === '') {
      return toast.warning('Enter data!');
    }

    handleFormSubmit(searchQuery);
    reset();
  };

  const reset = () => {
    setQuery('');
  };

  return (
    <Header>
      <SearchForm onSubmit={handleSubmit}>
        <SearchButton type="submit">
          <SearchLabel>Search</SearchLabel>
        </SearchButton>

        <SearchInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleInputChange}
        />
      </SearchForm>
    </Header>
  );
}

Searchbar.propTypes = {
  handleFormSubmit: PropTypes.func.isRequired,
};
