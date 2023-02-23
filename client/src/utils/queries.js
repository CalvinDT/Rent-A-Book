import { gql } from '@apollo/client';

export const QUERY_BOOK = gql`
  query getBook($id: ID) {
    book(id: $id) {
        _id
        title
        description
        authors
        img
        quantity
        price
        category {
        _id
        }
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($books: [ID]!) {
    checkout(books: $books) {
      session
    }
  }
`;

export const QUERY_ALL_BOOKS = gql`
  {
    books {
        _id
        title
        description
        authors
        img
        quantity
        price
        category {
        _id
        }
    }
  }
`;

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }
`;

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      orders {
        _id
        books {
            _id
            title
            description
            authors
            img
            quantity
            price
        }
      }
    }
  }
`;