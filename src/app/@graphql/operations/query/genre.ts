import { GENRE_FRAGMENT } from '@graphql/operations//fragments/genre';
import { RESULT_INFO_FRAGMENT } from '@graphql/operations/fragments/result-info';
import gql from 'graphql-tag';

export const GENRE_LIST_QUERY = gql`
  query genreList($page: Int, $itemsPage: Int) {
    genres(page: $page, itemsPage: $itemsPage) {
      info {
        ...ResultInfoObject
      }
      status
      message
      genres {
        ...GenreObject
      }
    }
  }
  ${GENRE_FRAGMENT}
  ${RESULT_INFO_FRAGMENT}
`;
