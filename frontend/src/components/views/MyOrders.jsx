import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import LaunchIcon from "@material-ui/icons/Launch";
import { myOrders } from "../../store/actions/order";
import styled from 'styled-components';
import Loader from "../common/Loader";
const MyOrders = () => {
  const dispatch = useDispatch();


  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 100,
      flex: 0.3,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 200,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.getValue(params.id, "id")}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalAmount,
      });
    });

  useEffect(() => {
    
    dispatch(myOrders());
  }, [dispatch, error]);

  return (
    <Container>

      {loading ? (
        <Loader/>
      ) : (
        <div className="myOrdersPage">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="myOrdersTable"
            autoHeight
          />

          <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
        </div>
      )}
    </Container>
  );
};

export default MyOrders;
const Container = styled.div`
.myOrdersPage {
  margin-top: 100px;
  width: 100vw;
  max-width: 100%;
  padding: 0 7vmax;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  min-height: 50vh;
  display: flex;
  flex-direction: column;
}

#myOrdersHeading {
  text-align: center;
  font: 400 1.2vmax "Roboto";
  padding: 0.5vmax;
  box-sizing: border-box;
  color: rgb(255, 255, 255);
  transition: all 0.5s;
  background-color: rgb(44, 44, 44);
}

.myOrdersTable {
  background-color: white;
}

.myOrdersTable div {
  font: 300 1vmax "Roboto";
  color: rgba(0, 0, 0, 0.678);
  border: none;
}

.myOrdersTable a {
  color: rgba(0, 0, 0, 0.527);
  transition: all 0.5s;
}

.myOrdersTable a:hover {
  color: tomato;
}

.MuiDataGrid-columnHeader {
  background-color: tomato;
  padding: 1vmax !important;
}

.MuiDataGrid-columnHeader div {
  color: rgb(255, 255, 255);
  font: 500 1.1vmax "Roboto" !important;
}

.MuiDataGrid-iconSeparator {
  display: none !important;
}

@media screen and (max-width: 600px) {
  .myOrdersPage {
    padding: 0;
    height: 93vh;
  }

  #myOrdersHeading {
    font: 400 2.2vmax "Roboto";
    padding: 4vw;
  }

  .myOrdersTable div {
    font: 300 4vw "Roboto";
  }

  .MuiDataGrid-columnHeader {
    padding: 20px !important;
  }

  .MuiDataGrid-columnHeader div {
    font: 500 5vw "Roboto" !important;
  }
}
`;