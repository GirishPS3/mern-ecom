import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO, CLEAR_CART, CLEAR_ERROR
} from "../constants/cart";
import axios from "../../utils/service";

// Add to Cart
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/products/${id}`);

  dispatch({
    type: ADD_TO_CART,
    payload: {
      productId: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.stock,
      quantity,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// REMOVE FROM CART
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// SAVE SHIPPING INFO
export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });

  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
//Clear cart after succesful payment
export const clearCart = (data) => async (dispatch) => {
  dispatch({
    type: CLEAR_CART,
  });

  localStorage.removeItem("cartItems");
};
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};