import React from 'react';
import styled from "styled-components";
import Books from "../components/Books";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../utils/responsive";
import {useState } from "react";
import { useParams } from "react-router-dom"

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
 
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
  
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
 
`;
const Option = styled.option``;



const BookList = () => {
  const {category:name} = useParams()

  const [category, setCategory] = useState(name)


  return (
    <Container>
      <Title>BOOKS</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Books:</FilterText>
          <Select value={category} onChange={(event) => setCategory(event.target.value)}>
            <Option value="all">
              Category
            </Option>
            <Option value="fiction">Fiction</Option>
            <Option value = "non-fiction">Non-Fiction</Option>
            <Option value = "kids">Kids</Option>
          </Select>
         
        </Filter>
        
      </FilterContainer>
      <Books category={category}/>
      <Newsletter/>
      <Footer />
    </Container>
  );
};

export default BookList;