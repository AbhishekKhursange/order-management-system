import React from 'react';
function Cart({cart, placeOrder}) {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
    <div className="container mt-5">
  <h3>🛍 Cart</h3>

  <ul className="list-group mb-3">
    {cart.map((item, index) => (
      <li key={index} className="list-group-item d-flex justify-content-between">
        {item.name}
        <span>₹{item.price}</span>
      </li>
    ))}
  </ul>

  <h5>Total: ₹{total}</h5>

  <button className="btn btn-success" onClick={placeOrder}>
    Place Order
  </button>
</div>
  );
}

export default Cart;
