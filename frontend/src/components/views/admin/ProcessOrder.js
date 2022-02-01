import React, { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";
import SideBar from "./Sidebar";

import { useSelector, useDispatch } from "react-redux";

import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { Button } from "@material-ui/core";
import styled from 'styled-components';
import { getOrderDetails, updateOrder } from "../../../store/actions/order";
import { clearErrors } from "../../../store/actions/order";
import { UPDATE_ORDER_REQUEST, UPDATE_ORDER_RESET } from "../../../store/constants/order";
import Container from './Container';
import DashboardLayout from '../../common/DashboardLayout';
import Loader from "../../common/Loader";
import { useSnackbar } from 'notistack';

const ProcessOrder = ({ history, match }) => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(updateOrder(id, { status }));
  };

  const dispatch = useDispatch();

  const [status, setStatus] = useState("");

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    if (updateError) {
      enqueueSnackbar(updateError, { variant: 'error' });
      dispatch(clearErrors());
    }
    if (isUpdated) {
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, id, isUpdated]);

  return (
    <Container>
      <DashboardLayout selectedNav="Orders" >

        <div className="dashboard">

          <div className="newProductContainer">
            {loading ? (
              <Loader />
            ) : (
              <div
                className="confirmOrderPage"
                style={{
                  display: order.orderStatus === "Delivered" ? "block" : "grid",
                }}
              >
                <div>
                  <div className="confirmshippingArea">
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
                  <div className="confirmCartItems">
                    <Typography>Your Cart Items:</Typography>
                    <div className="confirmCartItemsContainer">
                      {order.orderItems &&
                        order.orderItems.map((item) => (
                          <div key={item.productId}>
                            <img src={item.image} alt="Product" />
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
                {/*  */}
                <div
                  style={{
                    display: order.orderStatus === "Delivered" ? "none" : "block",
                  }}
                >
                  <form
                    className="updateOrderForm"
                    onSubmit={updateOrderSubmitHandler}
                  >
                    <h1>Process Order</h1>

                    <div>
                      <AccountTreeIcon />
                      <select onChange={(e) => setStatus(e.target.value)}>
                        <option value="">Choose Category</option>
                        {order.orderStatus === "Processing" && (
                          <option value="Shipped">Shipped</option>
                        )}

                        {order.orderStatus === "Shipped" && (
                          <option value="Delivered">Delivered</option>
                        )}
                      </select>
                    </div>

                    <Button
                      id="createProductBtn"
                      type="submit"
                      disabled={
                        loading ? true : false || status === "" ? true : false
                      }
                    >
                      Process
                  </Button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </DashboardLayout>
    </Container>
  );
};

export default ProcessOrder;
