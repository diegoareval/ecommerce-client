import { GENRE_FRAGMENT } from './../fragments/genre';
import gql from 'graphql-tag';

export const ADD_GENRE = gql`
  mutation insertGenre($genre: String!) {
    addGenre(genre: $genre) {
      status
      message
      genre {
        ...GenreObject
      }
    }
  }
  ${GENRE_FRAGMENT}
`;

export const UPDATE_GENRE = gql`
  mutation updateGenre($id: ID!, $genre: String!) {
    updateGenre(id: $id, genre: $genre) {
      status
      message
      genre {
        ...GenreObject
      }
    }
  }
  ${GENRE_FRAGMENT}
`;

export const BLOCK_GENRE = gql`
  mutation blockGenre($id: ID!) {
    blockGenre(id: $id) {
      status
      message
    }
  }
`;
