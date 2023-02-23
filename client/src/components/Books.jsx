import React from 'react';
import styled from "styled-components";
import { allBooks } from "../utils/data";
import Book from "./Book";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Books = (props) => {
  const {category} = props

  return (
    <Container>
    
      {category!=="all"?allBooks.map((item) => {
           console.log(category, item.category)
       if (category===item.category){
        console.log(category, item.id)
        return   <Book item={item} key={item.id} />
       }
       else {
        return  ""
       }
    
      }):allBooks.map(item => {
        return <Book item={item} key={item.id} />
      })}
    </Container> 
  );
};

export default Books;