import React from "react";
import dataAddOn from "../dataAddOn";

export default function Basket(props) {
  const { cartItems, onAdd, onRemove, addOnIdsAvailable } = props;
  const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);
  const [addOns, setAddOns] = React.useState([]);
  const priceOfAddOn = addOns.reduce((a, c) => a + c.qty * c.price, 0);
  const taxPrice = (itemsPrice + priceOfAddOn) * 0.14;
  const [distance, setDistance] = React.useState(0);
  const totalPrice =
    itemsPrice + taxPrice + parseFloat(distance) + priceOfAddOn;
  // console.log(cartItems, Array.isArray(addOnIdsAvailable));
  const onAddOn = (product) => {
    // console.log(product, addOns);
    const existAddOn = addOns.find((x) => x.id === product.id);
    if (existAddOn) {
      setAddOns(
        addOns.map((x) =>
          x.id === product.id ? { ...existAddOn, qty: existAddOn.qty + 1 } : x
        )
      );
    } else {
      setAddOns([...addOns, { ...product, qty: 1 }]);
    }
  };
  const onRemoveAddOn = (product) => {
    const exist = addOns.find((x) => x.id === product.id);
    if (exist.qty === 1) {
      setAddOns(addOns.filter((x) => x.id !== product.id));
    } else {
      setAddOns(
        addOns.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };

  const findTheQuantityofAddOn = (product) => {
    const exist = addOns.find((x) => x.id === product.id);
    if (exist) {
      return exist.qty;
    } else {
      return 0;
    }
  };

  return (
    <aside className="block col-1">
      <h2>Cart Items</h2>
      <div>
        {cartItems.length === 0 && (
          <div className="keep-shopping">
            <span>Cart is empty</span> <br /> <br />
            <button
              className="go-shopping"
              onClick={() => {
                props.toggleOpenCart();
              }}
            >
              Keep Shopping
            </button>
          </div>
        )}
        {cartItems.map((item) => (
          <div key={item.id} className="row">
            <div className="col-2">{item.name}</div>
            <div className="col-2">
              <button onClick={() => onRemove(item)} className="remove">
                -
              </button>{" "}
              <button onClick={() => onAdd(item)} className="add">
                +
              </button>
            </div>

            <div className="col-2 text-right">
              {item.qty} x ₹{item.price.toFixed(2)}
            </div>
          </div>
        ))}

        {cartItems.length !== 0 && (
          <>
            <h3>Add Ons</h3>
            {dataAddOn.products.map((item) => (
              <div key={item.id} className="row">
                {addOnIdsAvailable.includes(parseInt(item.id)) ? (
                  <>
                    <div className="col-2">{item.name}</div>
                    <div className="col-2">
                      <button
                        onClick={() => onRemoveAddOn(item)}
                        disabled={findTheQuantityofAddOn(item) === 0}
                        className="remove"
                      >
                        -
                      </button>{" "}
                      <button onClick={() => onAddOn(item)} className="add">
                        +
                      </button>
                    </div>

                    <div className="col-2 text-right">
                      {findTheQuantityofAddOn(item)} x ₹{item.price.toFixed(2)}
                    </div>
                  </>
                ) : null}
              </div>
              // <>Hello</>
            ))}
            <hr></hr>
            <div className="row">
              <div className="col-2">
                <h3>Distance</h3>
              </div>
              <div className="col-2 text-right distance-dropdown">
                <select
                  value={distance}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setDistance(e.target.value);
                  }}
                >
                  <option value="0.00">Upto 5Km</option>
                  <option value="15.00">5-8Km</option>
                  <option value="25.00">9-15Km</option>
                  <option value="40.00">Above 15Km</option>
                </select>
              </div>
            </div>
            <hr></hr>
            <div className="row">
              <div className="col-2">Items Price</div>
              <div className="col-1 text-right">₹{itemsPrice.toFixed(2)}</div>
            </div>
            <div className="row">
              <div className="col-2">Add On Price</div>
              <div className="col-1 text-right">₹{priceOfAddOn.toFixed(2)}</div>
            </div>
            <div className="row">
              <div className="col-2">Tax Price</div>
              <div className="col-1 text-right">₹{taxPrice.toFixed(2)}</div>
            </div>
            <div className="row">
              <div className="col-2">Shipping Price</div>
              <div className="col-1 text-right">₹{distance}</div>
            </div>
            <hr></hr>
            <div className="row">
              <div className="col-2">
                <strong>Total Price</strong>
              </div>
              <div className="col-1 text-right">
                <strong>₹{totalPrice.toFixed(2)}</strong>
              </div>
            </div>
            <hr />
            <div className="row keep-shopping">
              <button
                className="go-shopping"
                onClick={() => {
                  props.toggleOpenCart();
                }}
              >
                Keep Shopping
              </button>
              <button onClick={() => alert("Implement Checkout!")}>
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
