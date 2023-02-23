import React from 'react';
import styled from "styled-components";
import { bestsellers } from "../utils/data";
import Book from "./Book";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Bestsellers = () => {
  return (
    <Container>
      {bestsellers.map((item) => (
        <Book item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Bestsellers;