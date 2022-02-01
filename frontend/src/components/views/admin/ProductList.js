import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";

import { Link, useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { deleteProduct, getAdminProduct } from "../../../store/actions/product";
import { clearErrors } from "../../../store/actions/product";
import { DELETE_PRODUCT_RESET } from "../../../store/constants/product";
import Container from './Container';
import DashboardLayout from '../../common/DashboardLayout';

const ProductList = ({ history }) => {
  const dispatch = useDispatch();
  const navigate = useHistory()

  const { products, error } = useSelector((state) => state.products);

  const { error: deleteError, isDeleted, loading } = useSelector(
    (state) => state.productDetails
  );

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }

    if (deleteError) {
      dispatch(clearErrors());
    }

    if (isDeleted) {
      navigate.push("/dashboard");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProduct());
  }, [dispatch, deleteError, isDeleted]);
  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 270,
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
          <Fragment>
            <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteProductHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.stock,
        price: item.price,
        name: item.name,
      });
    });

  return (
    <Container>
      <DashboardLayout selectedNav="Products" >
        <div className="dashboard">
          <div className="productListContainer">
            <h1 id="productListHeading">ALL PRODUCTS</h1>

            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
            />
          </div>
        </div>
      </DashboardLayout>
    </Container>
  );
};

export default ProductList;
