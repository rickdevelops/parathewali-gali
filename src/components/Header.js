import React from "react";

export default function Header(props) {
  return (
    <header className="block row center">
      <div>
        <a href="#/" onClick={props.toggleCloseCartFromHeader}>
          <h1>Parathewali Shopping Stop</h1>
        </a>
      </div>
      <div>
        <a
          href="#/cart"
          onClick={() => {
            props.toggleOpenCart();
          }}
        >
          Cart{" "}
          {props.countCartItems ? (
            <button className="badge">{props.countCartItems}</button>
          ) : (
            ""
          )}
        </a>{" "}
        {/* <a href="#/signin"> SignIn</a> */}
      </div>
    </header>
  );
}
