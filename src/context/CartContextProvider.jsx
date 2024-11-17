import React, { useState, useEffect } from "react";
import CartContext from "./CartContext";
import Cookies from "js-cookie";
const CartContextProvider = ({ children }) => {
  let [cartList, setCartList] = useState([]);
  let [itemsList, setItemsList] = useState([]);
  let [myOrder, setMyOrders] = useState([]);
  let [searchList, setSearchList] = useState([]);
  let [savedItems, setSavedItems] = useState([])
  let token = Cookies.get('token')
  const fetchSavedItems = async (userId) => {
    try {
      const response = await fetch(`https://cartbackend-nor8.onrender.com/savelater/${userId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.length === 0) {
          setSavedItems([])
        }
        else {
          setSavedItems(data)
        }
      } else {
        console.error('Failed to fetch saved items');
      }
    } catch (error) {
      console.error('Error fetching saved items:', error);
    }
  };
  const increaseQuantity = (productid) => {
    const updatedQuantity = cartList.map((each) => {
      if (each.e.productid === productid) {
        return {
          ...each,
          quantity: each.quantity + 1,
        };
      } else {
        return each;
      }
    });
    setCartList(updatedQuantity);
  };
  const deleteItem = (productid) => {
    const filteredData = cartList.filter(
      (each) => each.e.productid !== productid
    );
    setCartList(filteredData);
  };
  const decreaseQuantity = (productid) => {
    const updatedQuantity = cartList
      .map((each) => {
        if (each.e.productid === productid) {
          if (each.quantity > 1) {
            return {
              ...each,
              quantity: each.quantity - 1,
            };
          } else {
            deleteItem(productid);
            return null;
          }
        }
        return each;
      })
      .filter((item) => item !== null);
    setCartList(updatedQuantity);
  };
  const handleItem = (item) => {
    const isExist = cartList.some(
      (each) => each.e.productid === item.productid
    );
    if (isExist) {
      increaseQuantity(item.productid);
    } else {
      setCartList((prev) => [...prev, { e: item, quantity: 1 }]);
    }
  };
  useEffect(() => {
    let fetchData = async () => {
      let token = Cookies.get("token");
      if (token) {
        let response = await fetch("https://cartbackend-nor8.onrender.com/products", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        let data = await response.json();
        console.log(data)
        setItemsList(data.products);
        setSearchList(data.products);
      }
    };

    fetchData();
  }, []);
  return (
    <CartContext.Provider
      value={{
        cartList,
        setCartList,
        itemsList,
        setItemsList,
        increaseQuantity,
        decreaseQuantity,
        deleteItem,
        handleItem,
        setMyOrders,
        myOrder,
        searchList,
        setSearchList,
        fetchSavedItems, savedItems, setSavedItems
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
