import { Link } from "react-router-dom";
import Layout from "../Layout/Layout";
import { useCart, useCartActions } from "../providers/CartProvider";
import "./cartPage.css";

const CartPage = () => {
  const { cart, total } = useCart();
  const dispatch = useCartActions();

  const incHandler = (cartItem) => {
    dispatch({ type: "ADD_TO_CART", payload: cartItem });
  };

  const decHandler = (cartItem) => {
    dispatch({ type: "REMOVE_PRODUCT", payload: cartItem });
  };

  if (!cart.length)
    return (
      <Layout>
        <main>
          <h2>No item in cart!</h2>
        </main>
      </Layout>
    );

  return (
    <Layout>
      <main className="container">
        <section className="cart-center">
          <section className="cart-item-list">
            {cart.map((item) => {
              return (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-img">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div>{item.name}</div>
                  <div>{item.offPrice * item.quantity}</div>
                  <div className="btn-group">
                    <button onClick={() => decHandler(item)}>-</button>
                    <button>{item.quantity}</button>
                    <button onClick={() => incHandler(item)}>+</button>
                  </div>
                </div>
              );
            })}
          </section>
          <CartSummary total={total} cart={cart} />
        </section>
      </main>
    </Layout>
  );
};

export default CartPage;

const CartSummary = ({ total, cart }) => {
  const originalTotalPrice = cart.length
    ? cart.reduce((acc, curr) => acc + curr.quantity * curr.price, 0)
    : 0;

  return (
    <section className="cart-summary">
      <h2 style={{ marginBottom: "10px" }}>Cart summary</h2>
      <div className="summary-item">
        <p>Original total price</p>
        <p>{originalTotalPrice} $</p>
      </div>
      <div className="summary-item">
        <p>Cart discount</p>
        <p>{originalTotalPrice - total} $</p>
      </div>
      <div className="summary-item net-price">
        <p>Net price</p>
        <p>{total} $</p>
      </div>
      <Link to="/signup?redirect=checkout">
        <button
          className="btn primary"
          style={{ marginTop: "20px", width: "100%" }}
        >
          Go to checkout
        </button>
      </Link>
    </section>
  );
};
