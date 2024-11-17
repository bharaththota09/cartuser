import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "./components/Header/Header";
import MyOrder from "./components/myorders/MyOrder";
import Home from './components/home/Home'
import Cart from "./components/cart/Cart"
import Signup from './components/signup/Signup'
import Login from './components/login/Login'
import { ToastContainer} from "react-toastify";
function App() {
 
  

  return (
    <BrowserRouter>
      <Header />

<ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/myorders" element={<MyOrder />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
