import './App.css';
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { PersistGate } from 'redux-persist/integration/react';
import Header from './components/layout/Header.js';
import Footer from './components/layout/Footer';

import Products from './components/views/product/Products';
import { Provider } from 'react-redux';
import store, { persistor } from './store';
import ProductDetails from './components/views/product/ProductDetails';
import Signup from './components/views/Signup';
import Profile from './components/views/Profile';
import PrivateRoute from './components/Auth/PrivateRoute';
import UpdateProfile from './components/views/UpdateProfile';
import UpdatePassword from './components/views/UpdatePassword';
import ForgotPassword from './components/views/ForgotPassword';
import ResetPassword from './components/views/ResetPassword';
import Cart from './components/views/Cart';
import Shipping from './components/views/Shipping';
import ConfirmOrder from './components/views/ConfirmOrder';
import axios from './utils/service';
import Payment from './components/views/Payment';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from './components/views/OrderSuccess';
import MyOrders from './components/views/MyOrders';
import OrderDetails from './components/views/OrderDetails';
import Dashboard from './components/views/admin/Dashboard';
import UsersList from './components/views/admin/UsersList';
import Loader from './components/common/Loader';
import { SnackbarProvider, useSnackbar } from 'notistack';
import PageNotFound from './components/views/PageNotFound';

const Home = lazy(() => import("./components/views/Home"));
const UpdateProduct = lazy(() => import("./components/views/admin/UpdateProduct"));
const ProductReview = lazy(() => import("./components/views/admin/ProductReview"));
const ProductList = lazy(() => import("./components/views/admin/ProductList"));
const ProcessOrder = lazy(() => import("./components/views/admin/ProcessOrder"));
const NewProduct = lazy(() => import("./components/views/admin/NewProduct"));
const OrdersList = lazy(() => import("./components/views/admin/OrdersList"));
const UpdateUser = lazy(() => import("./components/views/admin/UpdateUser"));
function App() {

  const [stripeApiKey, setstripeApiKey] = useState('');
  async function getStripeApiKey() {
    const { data } = await axios.get('/api/v1/payment/stripeApiKey');
    setstripeApiKey(data.stripeApiKey);
  }
  useEffect(() => {
    getStripeApiKey()
  }, [])
  return <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Suspense fallback={<Loader />}>
        <SnackbarProvider maxSnack={3} anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}>
          <Router>
            <Header />
            {stripeApiKey && (
              <Elements stripe={loadStripe(stripeApiKey)}>
                <PrivateRoute exact path="/process/payment" component={Payment} />
              </Elements>
            )}
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/products' component={Products} />
              <Route exact path='/products/:keyword' component={Products} />
              <Route exact path='/product/:id' component={ProductDetails} />
              <Route exact path='/signin' component={Signup} />
              {/*<Route exact path='/' component={PrivateRoute} >*/}
              <PrivateRoute exact path='/account' component={Profile} />
              <PrivateRoute exact path='/update/profile' component={UpdateProfile} />
              <PrivateRoute exact path='/update/password' component={UpdatePassword} />
              <PrivateRoute exact path='/cart' component={Cart} />
              <PrivateRoute exact path='/shipping' component={Shipping} />
              <PrivateRoute exact path='/order/confirm' component={ConfirmOrder} />
              <PrivateRoute exact path='/order/success' component={OrderSuccess} />
              <PrivateRoute exact path='/orders' component={MyOrders} />
              <PrivateRoute exact path='/order/:id' component={OrderDetails} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} isAdmin />
              <PrivateRoute exact
                isAdmin
                path="/admin/products"
                component={ProductList}
              />
              <PrivateRoute isAdmin exact
                path="/admin/product"
                component={NewProduct}
              />

              <PrivateRoute isAdmin exact
                path="/admin/product/:id"
                component={UpdateProduct}
              />
              <PrivateRoute isAdmin exact
                path="/admin/orders"
                component={OrdersList}
              />

              <PrivateRoute isAdmin exact
                path="/admin/order/:id"
                component={ProcessOrder}
              />
              <PrivateRoute isAdmin exact
                path="/admin/users"
                component={UsersList}
              />

              <PrivateRoute isAdmin exact
                path="/admin/user/:id"
                component={UpdateUser}
              />

              <PrivateRoute isAdmin exact
                path="/admin/reviews"
                component={ProductReview}
              />
              <Route
                component={
                  window.location.pathname === "/process/payment" && null
                }
              />
              <Route exact path='/forgot-password' component={ForgotPassword} />
              <Route exact path='/reset-password/:token' component={ResetPassword} />

              <Route path='*' component={PageNotFound} />
            </Switch>
          </Router>
          <Footer />
        </SnackbarProvider>
      </Suspense>
    </PersistGate>
  </Provider >
}

export default App;
