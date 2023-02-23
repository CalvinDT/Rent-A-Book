import React from 'react';
import { useSelector } from "react-redux";
import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Footer from "../components/Footer";
import { mobile } from "../utils/responsive";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import StripeCheckout from "react-stripe-checkout";



const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
  
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;


const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "20px 15px" })}
  
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const KEY = process.env.REACT_APP_STRIPE;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const quantity = useSelector(state=>state.cart.quantity);
  const [qty, setQty] = useState(1);
  const [subtotal, setSubtotal] = useState(0);
  const [ setStripeToken] = useState(null);

  const onToken = (token) => {
    setStripeToken(token);
  };

  const handleQty = (type) => {
    if (type === "dec") {
      qty > 1 && setQty(qty - 1);
    } else {
      setQty(qty + 1);
    }
  };

  useEffect(() => {
    let total = 0
   cart.books.forEach(book => {
       total = total + parseFloat(book.price.substring(1))*book.quantity
   })
   setSubtotal(total)
  },[])

  return (
    <Container>
     
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <Link to="/books/all">
          <TopButton>CONTINUE SHOPPING</TopButton>
          </Link>
          <TopTexts>
            <TopText>Shopping Bag ({quantity})</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <StripeCheckout
              name="Rent-A-Book"
              image="https://i.ibb.co/nqpctJp/Asset-1-100x.png"
              billingAddress
              shippingAddress
              description={`Your total is $${subtotal +10}`}
              amount={subtotal +10 * 100}
              token={onToken}
              stripeKey={KEY}
            >
              <TopButton>CHECKOUT NOW</TopButton>
            </StripeCheckout>
          
        </Top>
        <Bottom>
          <Info>
          {cart.books.map((book) => (
            <Product>
              <ProductDetail>
                <Image src={book.img} />
                <Details>
                  <ProductName>
                    <b>TITLE:</b> {book.title}
                  </ProductName>
                  <ProductId>
                    <b>ID:</b> {book.id}
                  </ProductId>
                  
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductAmountContainer>
                  <Add onClick={() => handleQty("inc")}/>
                  <ProductAmount>{book.quantity}</ProductAmount>
                  <Remove onClick={() => handleQty("dec")}/>
                </ProductAmountContainer>
                <ProductPrice>{"$"}{  parseFloat(book.price.substring(1)) * parseInt(book.quantity)}</ProductPrice>
              </PriceDetail>
            </Product>
          ))}
          {console.log(cart)}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {subtotal}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping</SummaryItemText>
              <SummaryItemPrice>$ 10.00</SummaryItemPrice>
            </SummaryItem>
           
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {subtotal + 10}</SummaryItemPrice>
            </SummaryItem>
              <StripeCheckout
              name="Rent-A-Book"
              image="https://i.ibb.co/nqpctJp/Asset-1-100x.png"
              billingAddress
              shippingAddress
              description={`Your total is $${subtotal +10}`}
              amount={subtotal +10 * 100}
              token={onToken}
              stripeKey={KEY}
            >
              <Button>CHECKOUT NOW</Button>
            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;