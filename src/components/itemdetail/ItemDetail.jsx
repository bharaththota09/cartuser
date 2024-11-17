import React, { useContext } from "react";
import "./ItemDetail.css";
import CartContext from "../../context/CartContext";
import Cookies from "js-cookie";
function ItemDetail({ item, data }) {
  let { handleItem, fetchSavedItems } = useContext(CartContext);
  let userId = Cookies.get('userId')
  let token = Cookies.get('token')

  let handleSave = async (userId, productid) => {
    try {
      let data = { userId, productId: productid };
      let api = `https://cartbackend-nor8.onrender.com/savelater`;
      let response = await fetch(api, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        console.error("Failed to save the item. Status:", response.status);
        return;
      }
      else if (response.ok) {
        fetchSavedItems(userId);
      }


    } catch (error) {
      console.error("Error saving the item:", error);
    }
  };

  return (
    <div className="item-detail">
      <img src={item.image} alt={item.title} />
      <h1>{item.title}</h1>
      <p className="price">Price: ${item.price}</p>
      <div className="description">
        <p >{item.description}</p>
      </div>
      <div className="buttons">
        <button
          onClick={() => handleSave(userId, item.productid)}
          className={`heart ${data.includes(item.productid) ? "saved" : "unsaved"}`}
        >
          {
            data.includes(item.productid) ?
              <div className="save">
                <i className="fa-solid fa-heart"></i>
                <span>
                  Saved
                </span>
              </div> :
              <div>
                <i class="fa-solid fa-bookmark"></i>
                <span>
                  Save for later
                </span>
              </div>
          }
        </button>
        <button className="addtocart" onClick={() => handleItem(item)}>Add to Cart</button>
      </div>

    </div>
  );
}

export default ItemDetail;
