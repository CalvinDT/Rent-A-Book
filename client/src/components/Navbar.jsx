import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import logo from "../images/logo.svg";
import { mobile } from '../utils/responsive';
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import { useSelector } from "react-redux";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  ${mobile({ display: "none" })}
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
  ${mobile({ marginLeft: "0" })} 
`;

const Logo = styled.h1`
  ${mobile({ width: "270%", textAlign: "left" })}
  
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
  
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "10px", marginLeft: "10px" })}
  
`;
const StyledLink  = styled(Link)`
${mobile({ fontSize: "10px", marginLeft: "10px" })}
`;

const logout = event => {
  event.preventDefault();
  Auth.logout();
};


const Navbar = () => {
  const quantity = useSelector(state=>state.cart.quantity)
 
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
            <Logo>
                <a href="/">
                <img src={logo} className="" style={{ width: "45%" }} alt="logo" />
                </a>
            </Logo>
        </Center>
        <Right>
          <MenuItem>
            <StyledLink to="/books/all">
              BOOKS
            </StyledLink>
          </MenuItem>
          {Auth.loggedIn() ? (
        <>
          <MenuItem>
            <StyledLink to="/" onClick={logout}>
              LOGOUT
            </StyledLink>
          </MenuItem> 
        </>
      ) : (
        <>
          <MenuItem>
            <StyledLink to="/signup">
              SIGN UP
            </StyledLink>
          </MenuItem>
          <MenuItem>
            <StyledLink to="/login">
              SIGN IN
            </StyledLink>
          </MenuItem>
        </>
        )}
        <Link to="/cart">
          <MenuItem>
            <Badge badgeContent={quantity} color="primary">
              <ShoppingCartOutlined />
            </Badge>
          </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;