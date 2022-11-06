import { NavLink } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import { useCart } from "../../providers/CartProvider";
import "./Navigation.css";

const Navigation = () => {
  const { cart } = useCart();
  const userData = useAuth();

  return (
    <header className="main-navigation">
      <nav>
        <ul>
          <li>
            <NavLink to="/" exact>
              Elham shopping
            </NavLink>
          </li>
        </ul>
        <ul>
          <li className="cart-link">
            <NavLink to="/cart" activeClassName="active-link">
              Cart
            </NavLink>
            <span>{cart.length}</span>
          </li>
          <li>
            <NavLink
              to={userData ? "/profile" : "/login"}
              activeClassName="active-link"
            >
              {userData ? "Profile" : "Login / Sign up"}
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
