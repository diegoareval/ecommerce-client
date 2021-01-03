import gql from "graphql-tag"

export const USER_FRAGMENT = gql`
fragment  UserObject on User {
    id,
    name,
    lastname
    role
    email
    registerDate @include(if: $include)
    birthdate @include(if: $include)
}
`;