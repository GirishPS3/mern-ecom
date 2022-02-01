import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";
import styled from 'styled-components';
import { getOrderDetails } from "../../store/actions/order";
import Loader from "../common/Loader";

const OrderDetails = ({ match }) => {
  const {id}=useParams()
  const { order, error, loading } = useSelector((state) => state.orderDetails);

  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(getOrderDetails(id));
  }, [dispatch, id]);
  return (
    <Container>
      {loading ? (
        <Loader/>
      ) : (
        <Fragment>
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <Typography component="h1">
                Order #{order && order._id}
              </Typography>
              <Typography>Shipping Info</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Name:</p>
                  <span>{order.user && order.user.name}</span>
                </div>
                <div>
                  <p>Phone:</p>
                  <span>
                    {order.shippingAddress && order.shippingAddress.contactNo}
                  </span>
                </div>
                <div>
                  <p>Address:</p>
                  <span>
                    {order.shippingAddress &&
                      `${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.state}, ${order.shippingAddress.zipcode}, ${order.shippingAddress.country}`}
                  </span>
                </div>
              </div>
              <Typography>Payment</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.paymentInfo &&
                    order.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>

                <div>
                  <p>Amount:</p>
                  <span>{order.totalAmount && order.totalAmount}</span>
                </div>
              </div>

              <Typography>Order Status</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.orderStatus && order.orderStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.orderStatus && order.orderStatus}
                  </p>
                </div>
              </div>
            </div>

            <div className="orderDetailsCartItems">
              <Typography>Order Items:</Typography>
              <div className="orderDetailsCartItemsContainer">
                {order.orderItems &&
                  order.orderItems.map((item) => (
                    <div key={item.product}>
                      <img src={`http://localhost:5001/${item.image}`} alt="Product" />
                      <Link to={`/product/${item.productId}`}>
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
        </Fragment>
      )}
    </Container>
  );
};

export default OrderDetails;

const Container = styled.div`
.orderDetailsPage {
  background-color: white;
}

.orderDetailsContainer > h1 {
  font: 300 3vmax "Roboto";
  margin: 4vmax 0;
  color: tomato;
}

.orderDetailsContainer {
  padding: 5vmax;
  padding-bottom: 0%;
}

.orderDetailsContainer > p {
  font: 400 1.8vmax "Roboto";
}

.orderDetailsContainerBox,
.orderDetailsCartItemsContainer {
  margin: 2vmax;
}

.orderDetailsContainerBox > div {
  display: flex;
  margin: 1vmax 0;
}

.orderDetailsContainerBox > div > p {
  font: 400 1vmax "Roboto";
  color: black;
}
.orderDetailsContainerBox > div > span {
  margin: 0 1vmax;
  font: 100 1vmax "Roboto";
  color: #575757;
}

.orderDetailsCartItems > p {
  font: 400 1.8vmax "Roboto";
}

.orderDetailsCartItems {
  padding: 2vmax 5vmax;
  border-top: 1px solid rgba(0, 0, 0, 0.164);
}

.orderDetailsCartItemsContainer > div {
  display: flex;
  font: 400 1vmax "Roboto";
  align-items: center;
  margin: 2vmax 0;
}

.orderDetailsCartItemsContainer > div > img {
  width: 3vmax;
}

.orderDetailsCartItemsContainer > div > a {
  color: #575757;
  margin: 0 2vmax;
  width: 60%;
  text-decoration: none;
}

.orderDetailsCartItemsContainer > div > span {
  font: 100 1vmax "Roboto";
  color: #5e5e5e;
}

@media screen and (max-width: 600px) {
  .orderDetailsContainer > p {
    font: 400 6vw "Roboto";
  }

  .orderDetailsContainerBox > div {
    margin: 6vw 0;
  }

  .orderDetailsContainerBox > div > p {
    font: 400 4vw "Roboto";
  }
  .orderDetailsContainerBox > div > span {
    font: 100 4vw "Roboto";
  }

  .orderDetailsCartItems > p {
    font: 400 6vw "Roboto";
  }

  .orderDetailsCartItemsContainer > div {
    font: 400 4vw "Roboto";
    margin: 4vw 0;
  }

  .orderDetailsCartItemsContainer > div > img {
    width: 10vw;
  }

  .orderDetailsCartItemsContainer > div > a {
    margin: 2vw;
    width: 30%;
  }

  .orderDetailsCartItemsContainer > div > span {
    font: 100 4vw "Roboto";
  }
}
`;