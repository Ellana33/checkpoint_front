import { gql } from "@apollo/client";

export const GET_COUNTRIES = gql`
  query Countries {
    countries {
      code
      continent {
        id
        name
      }
      emoji
      id
      name
    }
  }
`;

export const ADD_COUNTRY = gql`
  mutation AddCountry($data: NewCountryInput!) {
    addCountry(data: $data) {
      code
      continent {
        id
        name
      }
      emoji
      id
      name
    }
  }
`;

export const GET_COUNTRY = gql`
  query Query($code: String!) {
    country(code: $code) {
      code
      continent {
        id
        name
      }
      emoji
      id
      name
    }
  }
`;

export const GET_CONTINENTS = gql`
  query Continents {
    continents {
      id
      name
    }
  }
`;
