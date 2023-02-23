import React, { useState }from 'react';
import styled from "styled-components";
import { mobile } from "../utils/responsive";

import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://i.ibb.co/NCmJRVC/back-signup.jpg")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;


const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  background-color:#048EA9; 
`;

const Error = styled.span`
  color: red;
`;



const Signup = () => {
  // set initial form state
  const [formState, setFormState] = useState({ firstName: '', lastName: '', username: '', email: '', password: '' });
   // define mutation for adding a user
  const [addUser, { error }] = useMutation(ADD_USER);
// update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ 
      ...formState,
      [name]: value,
     });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    try {
      const { data } = await addUser({
        variables: { ...formState }
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }

  };
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={handleFormSubmit}>
        
          <Input 
            placeholder="name"
            name='firstName'
            type = 'text'
            onChange={handleChange}
            value={formState.name}
            required 
          />
          <Input 
            placeholder="last name"
            name='lastName'
            type = 'text'
            onChange={handleChange}
            value={formState.lastName}
            required  
          />
          <Input 
            placeholder="username" 
            name='username'
            type = 'text'
            onChange={handleChange}
            value={formState.username}
            required 
            />
          <Input 
            placeholder="email" 
            name='email'
            type = 'email'
            onChange={handleChange}
            value={formState.email}
            required 
            />
          <Input 
            placeholder="password" 
            name='password'
            type='password'
            onChange={handleChange}
            value={formState.password}
            required 
            />
          
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button
            type='submit'
            variant='success'>
            CREATE
            </Button>
            {error && <Error>Something went wrong...</Error>}
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Signup;