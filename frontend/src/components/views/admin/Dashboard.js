import React, { memo, useEffect } from "react";
import { Paper, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from 'styled-components';
import { getAdminProduct } from "../../../store/actions/product.js";
import { getAllUsers } from "../../../store/actions/user.js";
import { getAllOrders } from "../../../store/actions/order.js";
import Container from './Container';
import DashboardLayout from '../../common/DashboardLayout';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
const Dashboard = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);

  const { orders } = useSelector((state) => state.allOrders);

  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalAmount;
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products?.length - outOfStock],
      },
    ],
  };

  return (
    <Container>
      <DashboardLayout selectedNav="Dashboard" >
        <div className="dashboard">

          <div className="dashboardContainer">
            <Typography component="h1">Dashboard</Typography>

            <SummaryContainer >
              <SummaryCard elevation={3} color="#0a9396">
                <div className="icon">
                  <AccountBalanceWalletIcon fontSize="large" />
                </div>
                <div className="detailes">
                  <span className="numberContent">₹{totalAmount}</span>
                  <span> Total Amount  </span>
                </div>
              </SummaryCard>
              <SummaryCard component={Link} to="/admin/products" color="#FFD23F">
                <div className="icon">
                  <AccountBalanceWalletIcon fontSize="large" />
                </div>
                <div className="detailes">
                  <span className="numberContent">{products && products.length}</span>
                  <span>Products</span>
                </div>
              </SummaryCard>
              <SummaryCard component={Link} to="/admin/orders" color="#f07167">
                <div className="icon">
                  <AccountBalanceWalletIcon fontSize="large" />
                </div>
                <div className="detailes">
                  <span className="numberContent">{orders && orders.length}</span>
                  <span>Orders</span>
                </div>
              </SummaryCard>
              <SummaryCard component={Link} to="/admin/users" color="#033F63">
                <div className="icon">
                  <AccountBalanceWalletIcon fontSize="large" />
                </div>
                <div className="detailes">
                  <span className="numberContent">{users && users.length}</span>
                  <span>Users</span>
                </div>
              </SummaryCard>
            </SummaryContainer>

          </div>
        </div>

      </DashboardLayout >
    </Container >
  );
};

export default memo(Dashboard);

const SummaryContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  @media only screen and (max-width: 600px) {
    flex-wrap: wrap;
    flex-direction: column;
  }
`;
const SummaryCard = styled(Paper)`

&.MuiPaper-root {
  width: 90%;
  padding: 10px;
  margin: 5px;
  display: flex;
  text-decoration: none;
  align-items: center;
  border-left: 7px solid ${props => props.color};
  border-radius: 5px;
  color: #495057;
  .icon {
    margin: 1vmax;
    color: ${props => props.color};
  }
  .details{
    padding: 1vmax;
    margin-left: 1vmax;
  }
  .numberContent {
    display: block;
    font-size: x-large;
    font-weight: bold;
  }

}
`;