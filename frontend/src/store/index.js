import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import { newProductReducer, newReviewReducer, productDetailReducer, productReducer, productReviewsReducer, productsReducer, reviewReducer } from './reducers/productReducer';
import { userReducer, profileReducer, forgotPasswordReducer, allUsersReducer, userDetailsReducer } from './reducers/userReducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { cartReducer } from './reducers/cartReducer';
import { newOrderReducer, myOrdersReducer, orderDetailsReducer, allOrdersReducer, orderReducer } from './reducers/order';

const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
  allOrders: allOrdersReducer,
  order: orderReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  productReviews: productReviewsReducer,
  review: reviewReducer,
  product: productReducer,
  newProduct: newProductReducer
});
const persistConfig = { key: 'root', storage };

const persistedReducer = persistReducer(persistConfig, reducer);

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') return composeWithDevTools(applyMiddleware(...middleware));
  return applyMiddleware(...middleware);
};
const initialState = {
  cart: {
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
  }
}
const middlewares = [thunk];
const store = createStore(persistedReducer, initialState, bindMiddleware(middlewares));
export const persistor = persistStore(store);

export default store;


