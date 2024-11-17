import React, { useContext } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { Link } from "react-router-dom";
import CartContext from "../../context/CartContext";
function Header() {
  let { cartList } = useContext(CartContext);
  let navigate = useNavigate()
  let userCookies = Cookies.get('token')
  let handleLogout = () => {
    Cookies.remove('token')
    Cookies.remove('userId')
    navigate('/login')
  }

  return (
    <div className="main">
      <img
        src="https://tse4.mm.bing.net/th?id=OIP.-0lkw6WsZuTvMn0wmtd36gHaHa&pid=Api&P=0&h=180"
        className="image"
        alt=""
      />
      {
        userCookies ? <div>
          <Link to="/">
            Home
          </Link>
          <Link to="/cart">
            Cart
            {cartList.length > 0 && <p className="badge">{cartList.length}</p>}

          </Link>
          <Link to="/myorders">
            My Orders
          </Link>
          <button onClick={handleLogout} className="logout">
            Logout
          </button>
        </div> : <Link to='/login'>Welcome User Please Login</Link>
      }

    </div>
  );
}

export default Header;
