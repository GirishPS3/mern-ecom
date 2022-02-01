import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Typography } from "@material-ui/core";
import CheckoutSteps from "../common/Stepper";
import styled from 'styled-components';

const ConfirmOrder = ({ history }) => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const navigate = useHistory();
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const totalQty = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.zipcode}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
      totalQty
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    navigate.push("/process/payment");
  };

  return (
    <Container>
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.contactNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>{" "}
                    <span>
                      {item.quantity} X ₹{item.price} ={" "}
                      <b>₹{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="orderSummary">
            <Typography>Order Summery</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>₹{subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>₹{shippingCharges}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>₹{tax}</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>₹{totalPrice}</span>
            </div>

            <button onClick={proceedToPayment}>Proceed To Payment</button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ConfirmOrder;
const Container = styled.div`
margin-top: 10%;
.confirmOrderPage {
  height: 100vh;
  background-color: white;
  display: grid;
  grid-template-columns: 6fr 3fr;
}

.confirmOrderPage > div:last-child {
  border-left: 1px solid rgba(0, 0, 0, 0.247);
}

.confirmshippingArea {
  padding: 5vmax;
  padding-bottom: 0%;
}

.confirmshippingArea > p {
  font: 400 1.8vmax "Roboto";
}

.confirmshippingAreaBox,
.confirmCartItemsContainer {
  margin: 2vmax;
}

.confirmshippingAreaBox > div {
  display: flex;
  margin: 1vmax 0;
}

.confirmshippingAreaBox > div > p {
  font: 400 1vmax "Roboto";
  color: black;
}
.confirmshippingAreaBox > div > span {
  margin: 0 1vmax;
  font: 100 1vmax "Roboto";
  color: #575757;
}

.confirmCartItems > p {
  font: 400 1.8vmax "Roboto";
}

.confirmCartItems {
  padding: 5vmax;
  padding-top: 2vmax;
}

.confirmCartItemsContainer {
  max-height: 20vmax;
  overflow-y: auto;
}

.confirmCartItemsContainer > div {
  display: flex;
  font: 400 1vmax "Roboto";
  align-items: center;
  justify-content: space-between;
  margin: 2vmax 0;
}

.confirmCartItemsContainer > div > img {
  width: 3vmax;
}

.confirmCartItemsContainer > div > a {
  color: #575757;
  margin: 0 2vmax;
  width: 60%;
  text-decoration: none;
}

.confirmCartItemsContainer > div > span {
  font: 100 1vmax "Roboto";
  color: #5e5e5e;
}

.orderSummary {
  padding: 7vmax;
}

.orderSummary > p {
  text-align: center;
  font: 400 1.8vmax "Roboto";
  border-bottom: 1px solid rgba(0, 0, 0, 0.267);
  padding: 1vmax;
  width: 100%;
  margin: auto;
  box-sizing: border-box;
}

.orderSummary > div > div {
  display: flex;
  font: 300 1vmax "Roboto";
  justify-content: space-between;
  margin: 2vmax 0;
}
.orderSummary > div > div > span {
  color: rgba(0, 0, 0, 0.692);
}

.orderSummaryTotal {
  display: flex;
  font: 300 1vmax "Roboto";
  justify-content: space-between;
  border-top: 1px solid rgba(0, 0, 0, 0.363);
  padding: 2vmax 0;
}

.orderSummary > button {
  background-color: tomato;
  color: white;
  width: 100%;
  padding: 1vmax;
  border: none;
  margin: auto;
  cursor: pointer;
  transition: 0.5s;
  font: 400 1vmax "Roboto";
}

.orderSummary > button:hover {
  background-color: rgb(192, 71, 50);
}

@media screen and (max-width: 600px) {
  .confirmOrderPage {
    grid-template-columns: 1fr;
    height: unset;
  }

  .confirmOrderPage > div:last-child {
    border-left: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.247);
  }

  .confirmshippingArea > p {
    font: 400 6vw "Roboto";
  }

  .confirmshippingAreaBox > div {
    display: flex;
    margin: 6vw 0;
  }

  .confirmshippingAreaBox > div > p {
    font: 400 4vw "Roboto";
  }
  .confirmshippingAreaBox > div > span {
    font: 100 4vw "Roboto";
  }

  .confirmCartItems > p {
    font: 400 6vw "Roboto";
  }

  .confirmCartItemsContainer {
    max-height: 50vw;
  }

  .confirmCartItemsContainer > div {
    font: 400 4vw "Roboto";
    margin: 4vw 0;
  }

  .confirmCartItemsContainer > div > img {
    width: 10vw;
  }

  .confirmCartItemsContainer > div > a {
    margin: 0;
    width: 30%;
  }

  .confirmCartItemsContainer > div > span {
    font: 100 4vw "Roboto";
  }

  .orderSummary {
    padding: 12vw;
  }

  .orderSummary > p {
    font: 400 6vw "Roboto";
    padding: 4vw;
  }

  .orderSummary > div > div {
    font: 300 4vw "Roboto";
  }

  .orderSummaryTotal {
    font: 300 4vw "Roboto";
    padding: 5vw 0;
  }

  .orderSummary > button {
    padding: 4vw;
    margin: 4vw auto;
    font: 400 4vw "Roboto";
  }
}
`;