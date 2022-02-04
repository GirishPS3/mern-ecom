import { Rating } from "@material-ui/lab";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ProductCard = ({ product }) => {
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <CardContainer to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <div>
        <p>{product.name}</p>
        <span>{`₹${product.price}`}</span>
        <Rating {...options} />
        &nbsp;{" "}
        <span id="productCardSpan">({product.numOfReviews} Reviews)</span>
      </div>
    </CardContainer>
  );
};

export default ProductCard;

const CardContainer = styled(Link)`
  width: 14vmax;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: rgb(48, 48, 48);
  margin: 2vmax;
  transition: all 0.5s;
  padding-bottom: 0.5vmax;
  text-align: left;
  img {
    width: 100%;
  }
  div {
    padding: 1vmax;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    #productCardSpan {
      color: tomato;
      font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
      font: 300 0.7vmax "Roboto";
    }
    span {
      font-size: 1.5vmax;
      color: tomato;
    }
    p {
      font-family: "Roboto";
      font-size: 1.5vmax;
    }
  }

  &:hover {
    box-shadow: 0 0 5px rgba(15, 15, 15, 0.26);
    transform: translateY(-1vmax);
  }
`;
