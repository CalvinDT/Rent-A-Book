
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Category {
    _id: ID
    name: String
  }
  type Book {
    _id: ID
    title: String
    description: String
    authors: String
    img: String
    quantity: Int
    price: Float
    category: Category
  }
  type Order {
    _id: ID
    books: [Book]
  }
  type Cart {
    userId: ID
    books: [Book]
  }
  type User {
    _id: ID
    firstName: String
    lastName: String
    username: String
    email: String
    orders: [Order]
  }
  type Checkout {
    session: ID
  }
  type Auth {
    token: ID
    user: User
  }
  type Query {
    categories: [Category]
    books(category: ID, title: String): [Book]
    book(_id: ID!): Book
    user: User
    order(_id: ID!): Order
    cart(_id: ID!): Cart
    checkout(products: [ID]!): Checkout
  }
  type Mutation {
    addUser(firstName: String!, lastName: String!, username: String!, email: String!, password: String!): Auth
    addOrder(books: [ID]!): Order
    updateUser(firstName: String, lastName: String, username: String, email: String, password: String): User
    updateBook(_id: ID!, quantity: Int!): Book
    login(username: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;