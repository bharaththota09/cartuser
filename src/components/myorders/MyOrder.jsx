import React, { useEffect, useState } from "react";
import "./MyOrder.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
function MyOrder() {
  let userId = Cookies.get('userId')
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/login");
    } else {
      if (token) {
        try {
          let api = `https://cartbackend-nor8.onrender.com/orders/${userId}`
          fetch(api, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          })
            .then((response) => response.json())
            .then((data) => {
              if (data && data.length > 0) {
                const sortedOrders = data.sort(
                  (a, b) => new Date(b.orderTime) - new Date(a.orderTime)
                );
                setOrders(sortedOrders);
              } else {
                setOrders([]);
              }
            })
            .catch((error) => {
              console.error("Error fetching orders:", error);
            });
        } catch (error) {
          console.error(error);
        }
      }

    }
  }, [navigate]);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    const formattedHours = String(hours).padStart(2, "0");

    return `${day}/${month}/${year} ${formattedHours}:${minutes}:${seconds} ${ampm}`;
  };


  const calculateTotal = (cartList) => {
    return cartList.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  return (
    <div className="orders-container">
      <h1 className="orders-heading">My Orders</h1>
      {orders.length === 0 ? (
        <p className="no-orders-message">No orders placed yet.</p>
      ) : (
        orders.map((each, index) => {
          const formattedOrderTime = formatDate(each.orderTime);
          const totalBill = calculateTotal(each.cartList);
          return (
            <div key={index} className="order-card">
              <div className="order-time">
                <p>Order Placed:  {formattedOrderTime}</p>
              </div>
              <div className="order-items">
                {each.cartList.map((item, idx) => (
                  <div key={idx} className="order-item">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="order-item-image"
                    />
                    <p className="order-item-title">{item.title}</p>
                    <p className="order-item-price">${item.price}</p>
                    <p className="order-item-quantity">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                ))}
              </div>
              <div className="order-total">
                <p>Total Bill: ${totalBill + 5}</p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default MyOrder;
