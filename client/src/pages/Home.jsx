import React from 'react';
import Bestsellers from '../components/Bestsellers';
import Categories from '../components/Categories';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import Slider from '../components/Slider';
import styled from "styled-components";


const Title = styled.h1`
  font-size: 50px;
  margin-top: 20px;
  text-align: center;
`;


const Home = () => {
  return (
    <div>
        <Slider/>
        <Title>CATEGORIES</Title>
        <Categories/>
        <Title>NEW ARRIVALS</Title>
        <Bestsellers/>
        <Newsletter/>
        <Footer/>
    </div>
  )
}

export default Home 