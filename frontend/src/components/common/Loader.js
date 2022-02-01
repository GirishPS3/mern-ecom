import React from "react";
import styled from 'styled-components';

const Loader = () => {
  return (
    <Container >
      <Spinner > </Spinner>
    </Container>
  );
};

export default Loader;
const Spinner = styled.div`
  width: 6vmax;
  height: 6vmax;
  border-bottom: 5px solid rgba(0, 0, 0, 0.719);

  border-radius: 50%;

  animation: loadingRotate 800ms linear infinite;

  @keyframes loadingRotate {
  to {
    transform: rotateZ(360deg);
  }
}
`;
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: white;
  display: grid;
  place-items: center;
  max-width: 100%;
`;