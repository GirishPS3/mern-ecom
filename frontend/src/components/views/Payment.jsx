import React, { Fragment, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Typography } from "@material-ui/core";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import CheckoutSteps from "../common/Stepper";
import axios from '../../utils/service';
import styled from 'styled-components';
import { createOrder } from "../../store/actions/order";
import { useHistory } from "react-router";
import { clearCart, clearErrors } from "../../store/actions/cart";
import { useSnackbar } from 'notistack';

const Payment = ({ history }) => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const navigate=useHistory();
  const payBtn = useRef(null);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingAddress: shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalAmount: orderInfo.totalPrice,
    quantity: orderInfo.totalQty
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;

      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order));
          dispatch(clearCart())
          navigate.push("/order/success");
        } else {
          enqueueSnackbar("There's some issue while processing payment ", {variant: 'error'});
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
    }
  };

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
  }, [ error]);

  return (
    <Container>
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <Typography>Card Info</Typography>
          <div>
            <CreditCardIcon />
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <EventIcon />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <VpnKeyIcon />
            <CardCvcElement className="paymentInput" />
          </div>

          <input
            type="submit"
            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </div>
    </Container>
  );
};

export default Payment;

const Container = styled.div`
margin-top: 40px;
.paymentContainer {
  display: grid;
  place-items: center;
  background-color: rgb(255, 255, 255);
  height: 65vh;
  margin: 2vmax;
}

.paymentForm {
  width: 22%;
  height: 100%;
}

.paymentForm > p {
  font: 400 2vmax "Roboto";
  color: rgba(0, 0, 0, 0.753);
  border-bottom: 1px solid rgba(0, 0, 0, 0.13);
  padding: 1vmax 0;
  text-align: center;
  width: 50%;
  margin: auto;
}

.paymentForm > div {
  display: flex;
  align-items: center;
  margin: 2vmax 0;
}

.paymentInput {
  padding: 1vmax 4vmax;
  padding-right: 1vmax;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, 0.267);
  border-radius: 4px;
  outline: none;
}

.paymentForm > div > svg {
  position: absolute;
  transform: translateX(1vmax);
  font-size: 1.6vmax;
  color: rgba(0, 0, 0, 0.623);
}

.paymentFormBtn {
  border: none;
  background-color: tomato;
  color: white;
  font: 300 0.9vmax "Roboto";
  width: 100%;
  padding: 0.8vmax;
  cursor: pointer;
  transition: all 0.5s;
  outline: none;
}

.paymentFormBtn:hover {
  background-color: rgb(179, 66, 46);
}

@media screen and (max-width: 600px) {
  .paymentForm {
    width: 90%;
  }

  .paymentForm > p {
    font: 400 8vw "Roboto";
    padding: 4vw 0;
    width: 60%;
  }

  .paymentForm > div {
    margin: 10vw 0;
  }

  .paymentInput {
    padding: 4vw 10vw;
  }

  .paymentForm > div > svg {
    font-size: 6vw;
  }

  .paymentFormBtn {
    font: 300 4vw "Roboto";
    padding: 4vw;
  }
}
`;