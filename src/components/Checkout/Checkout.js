import { Link } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import { useCart } from "../../providers/CartProvider";
import "./checkout.css";

const Checkout = () => {
  const auth = useAuth();
  const { cart, total } = useCart();

  if (!cart.length)
    return (
      <main className="container">
        <Link to="/">Go to shopping!</Link>
      </main>
    );

  return (
    <main className="container">
      <section className="checkout-center">
        {auth ? (
          <>
            <section className="checkout-user-data">
              <h3>User detail</h3>
              <p>Name: {auth.name}</p>
              <p>Email: {auth.email}</p>
              <p>Phone number: {auth.phoneNumber}</p>
            </section>
            <section className="checkout-product-list">
              <h3>Products detail</h3>
              {cart.length &&
                cart.map((c) => {
                  return (
                    <div key={c.id}>
                      {c.name} * {c.quantity}: {c.quantity} * {c.offPrice}
                    </div>
                  );
                })}
              <div>Total price: {total}</div>
            </section>
          </>
        ) : (
          <p>Please login!</p>
        )}
      </section>
    </main>
  );
};

export default Checkout;
