import Header from "./components/Header";
import Main from "./components/Main";
import Basket from "./components/Basket";
import data from "./data";
import { useState } from "react";
function App() {
  const { products } = data;
  const [cartItems, setCartItems] = useState([]);
  const [closeCart, setCloseCart] = useState(true);
  const [addOnIdsAvailable, setAddOnIdsAvailable] = useState([]);

  const addToAvailableAddOns = (product) => {
    product.addOnIds.forEach((addOn) => {
      // console.log(addOn, addOnIdsAvailable);
      addOnIdsAvailable.push(addOn);
      // }
    });
  };

  const removeFromAvailableAddOns = (product) => {
    product.addOnIds.forEach((addOn) => {
      setAddOnIdsAvailable(addOnIdsAvailable.filter((x) => x !== addOn));
    });
  };

  const onAdd = (product) => {
    // console.log(cartItems);
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
      addToAvailableAddOns(product);
    }
  };
  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x.id !== product.id));
      removeFromAvailableAddOns(product);
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };
  const toggleOpenCart = () => {
    setCloseCart(!closeCart);
  };
  const toggleCloseCartFromHeader = () => {
    setCloseCart(true);
  };
  return (
    <div className="App">
      <Header
        countCartItems={cartItems.length}
        toggleCloseCartFromHeader={toggleCloseCartFromHeader}
        toggleOpenCart={toggleOpenCart}
      ></Header>
      <div className="row">
        {closeCart ? (
          <Main products={products} onAdd={onAdd}></Main>
        ) : (
          <Basket
            toggleOpenCart={toggleOpenCart}
            cartItems={cartItems}
            onAdd={onAdd}
            onRemove={onRemove}
            addOnIdsAvailable={addOnIdsAvailable}
          ></Basket>
        )}
      </div>
    </div>
  );
}

export default App;
