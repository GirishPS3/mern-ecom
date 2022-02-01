import { Button } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Img from '../../images/pageNotFound.svg'
export default function PageNotFound() {
  return (
    <Container>
      <img src={Img} alt="" />
      <h2>Page Not Found</h2>
      <Link to='/'><Button variant="outlined" color="primary">Back to Home page</Button></Link>
    </Container>
  )
}

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #ff4d6d;
  a {
    text-decoration: none;
  }
  img {
    height: 50vh;
  }
`;