import React, { useContext, useEffect } from "react";
import ItemDetail from "../itemdetail/ItemDetail";
import CartContext from "../../context/CartContext";
import Search from '../search/Search'
import Cookies from "js-cookie";
import './Home.css'
import { useNavigate } from "react-router-dom";
function Home() {

  let navigate = useNavigate()
  let { searchList, fetchSavedItems, cartList, savedItems } = useContext(CartContext);
  useEffect(() => {
    let userId = Cookies.get('userId')
    let userCookie = Cookies.get('token')
    if (!userCookie) {
      navigate('/login')
    }
    else {
      fetchSavedItems(userId)
    }
  }, [cartList])
  let data = savedItems.map((each) => {
    return each.productId
  })

  return (
    <>
      <Search />
      <div className="allItems">
        {searchList.length > 0 ? searchList.map((each) => (
          <ItemDetail item={each} key={each.productid} data={data} />
        )) :
          <img src="https://tse1.mm.bing.net/th?id=OIP.m8tM7kkXA0uutSdDMEoPYwAAAA&pid=Api&rs=1&c=1&qlt=95&w=90&h=119" alt="No Products" className="noproducts" />}
      </div>
    </>
  );
}

export default Home;
