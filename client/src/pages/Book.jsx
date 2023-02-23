import React from 'react';

import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";

import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";
import { mobile } from "../utils/responsive";
import { useState } from "react";
import { allBooks } from "../utils/data";
import { useParams } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { addBook } from '../redux/cartRedux';



const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection:"column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
  text-align: right;
  ${mobile({ padding: "10px", textAlign: "center" })}
`;

const Image = styled.img`
  width: 50%;
  height: 70vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
`;

const Title = styled.h1`
  font-weight: 200;
`;
const Authors = styled.h4`
  font-weight: 200;
  font-style: italic;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  &:hover{
      background-color: #f8f4f4;
  }
`;

const Book = () => {
  const {id} = useParams ()
  const book = allBooks.find(book => book.id == id);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();


  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = () => {
    //update cart
      dispatch(
      addBook({ ...book, quantity })
    );
  };


    return (
      <Container>
        <Wrapper>
          <ImgContainer>
            <Image src={book.img} />
          </ImgContainer>
          <InfoContainer>
            <Title>{book.title}</Title>
            <Authors>{book.authors}</Authors>
            <Desc>
            {book.description}
            </Desc>
            <Price>{book.price}</Price>
            
            <AddContainer>
            <AmountContainer>
              <Remove onClick={() => handleQuantity("dec")} />
              <Amount>{quantity}</Amount>
              <Add onClick={() => handleQuantity("inc")} />
            </AmountContainer>
            <Button onClick={handleClick}>ADD TO CART</Button>
          </AddContainer>
          </InfoContainer>
        </Wrapper>
        <Newsletter />
        <Footer />
      </Container>
    );
};
  

export default Book;