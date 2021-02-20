import { GENRE_FRAGMENT } from './../fragments/genre';
import gql from 'graphql-tag';

export const ADD_GENRE = gql`
  mutation insertGenre($genre: String!){
    addGenre(genre: $genre){
      status
      message
      genre{
       ...GenreObject
      }
    }
  }
  ${GENRE_FRAGMENT}
`;
