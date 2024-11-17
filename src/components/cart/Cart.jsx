import React, { useContext, useState, useEffect } from "react";
import "./Cart.css";
import CartContext from "../../context/CartContext";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
function Cart() {
  let userId = parseInt(Cookies.get('userId'))
  let navigate = useNavigate();
  useEffect(() => {
    let userCookies = Cookies.get("token");
    if (!userCookies) {
      navigate("/login");
    }
  });
  let {
    cartList,
    deleteItem,
    decreaseQuantity,
    increaseQuantity,
    setCartList,
  } = useContext(CartContext);
  const productSubtotal = cartList.reduce(
    (acc, each) => acc + each.e.price * each.quantity,
    0
  );
  const platformCharges = 5.0;
  const finalTotal = (productSubtotal + platformCharges).toFixed(2);
  const handleOrder = async () => {
    const userCookies = Cookies.get("token");
    if (!userCookies) {
      navigate("/login");
      return;
    }
    const orderTime = new Date().toISOString();
    const order = {
      userId,
      orderTime,
      cartList: cartList.map((item) => ({
        e: item.e,
        quantity: item.quantity,
      })),
    };
    const token = Cookies.get("token");
    try {
      let api = 'https://cartbackend-nor8.onrender.com/orders'
      const response = await fetch(api, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });
      if (response.ok) {
        toast.success("Order placed successfully!", {
          position: "top-center",
          autoClose: 1000,
        });
        setCartList([]);
        navigate("/myorders");
      } else {
        toast.error("Something went wrong, please try again.", {
          position: "top-center",
          autoClose: 1000, 
        });
      }
    } catch (error) {
      console.error("Error posting order:", error);
      toast.error("Something went wrong, please try again.", {
        position: "top-center",
        autoClose: 1000, 
      });
    }
  };
  
  
  return (
    <div className="cart-container">
      {cartList.map((each) => (
        <div key={each.e.productid} className="cart-item">
          <img
            src={each.e.image}
            alt={each.e.title}
            className="cart-item-image"
          />
          <div className="exceptImage">
            <div className="desc">
              <p className="cart-item-title">{each.e.title}</p>
              <p className="cart-item-price">$ {each.e.price}</p>
            </div>
            <div className="cart-item-actions">
              <button onClick={() => increaseQuantity(each.e.productid)} className="increase">
                +
              </button>
              <p className="cart-item-quantity">{each.quantity}</p>
              <button onClick={() => decreaseQuantity(each.e.productid)} className="decrease">
                -
              </button>
              <button onClick={() => deleteItem(each.e.productid)} className="delete">
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}

      {cartList.length > 0 ? (
        <div className="cart-summary">
          <p>
            Product Subtotal:{" "}
            <span className="cart-subtotal-amount">
              ${productSubtotal.toFixed(2)}
            </span>
          </p>
          <p>
            Platform Charges:{" "}
            <span className="platform-charges-amount">
              ${platformCharges.toFixed(2)}
            </span>
          </p>
          <p>
            Total Bill: <span className="cart-total-amount">${finalTotal}</span>
          </p>
          <button onClick={handleOrder}>Confirm Order</button>
        </div>
      ) : (
        <>
          <img
            src="https://tse1.mm.bing.net/th?id=OIP.2w41FXkcdT8IXTRqtQT7ZQHaHa&pid=Api&rs=1&c=1&qlt=95&w=110&h=110"
            alt="no-products"
            className="emptyCart"
          />
          <h1>Your Cart is Empty</h1>
          <p>
            Looks like you have not added to your cart. Go ahead & explore
            products.
          </p>
        </>
      )}

    </div>
  );
}

export default Cart;