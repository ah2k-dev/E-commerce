import "./App.css";
import Header from "./components/layout/Header/Header.js";
import Footer from "./components/layout/Footer/Footer";
import Home from "./components/Home/Home.js";
import { BrowserRouter as Router, Route } from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
import ProductDetails from "./components/Product/ProductDetails";
import Products from "./components/Product/Products.js";
import Search from "./components/Product/Search.js";
import LoginSignUp from "./components/User/LoginSignUp";
import Profile from "./components/User/Profile.js";
import UpdateProfile from "./components/User/UpdateProfile.js";
import store from "./store";
import { loadUser } from "./actions/userActions";
import UserOptions from "./components/layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/Route/ProtectedRoute";
function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid-Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Route exact path="/" component={Home} />
      <Route exact path="/product/:id" component={ProductDetails} />
      <Route exact path="/products" component={Products} />
      <Route path="/products/:keyword" component={Products} />
      <Route exact path="/Search" component={Search} />
      <Route exact path="/login" component={LoginSignUp} />
      <ProtectedRoute exact path="/account" component={Profile} />
      <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
      <Footer />
    </Router>
  );
}

export default App;
