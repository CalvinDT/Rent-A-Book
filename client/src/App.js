import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import React from 'react';
import BookList from './pages/BookList';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Home from './pages/Home';
import Book from './pages/Book';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import Announcement from './components/Announcement';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


const httpLink = createHttpLink({
  uri: '/graphql',// Uniform Resource Identifier
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});



const App = () => {
  
  return (
  
    <ApolloProvider client={client}>
        <Router>
          <Navbar/>
          <Announcement/>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/books/:category">
              <BookList />
            </Route>
            <Route path="/book/:id">
              <Book />
            </Route>
            <Route path="/cart">
              <Cart />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
          </Switch>
        </Router>
    </ApolloProvider>
  );
};


export default App;