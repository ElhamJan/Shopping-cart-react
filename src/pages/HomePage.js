import Layout from "../Layout/Layout";
import { products } from "../data";
import { useCart, useCartActions } from "../providers/CartProvider";
import { checkInCart } from "../utils/checkInCart";
import { toast } from "react-toastify";

const HomePage = () => {
  const { cart } = useCart();
  const dispatch = useCartActions();

  const addProductHandler = (product) => {
    toast.success(`${product.name} is added to cart!`);
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  return (
    <Layout>
      <main className="container">
        <div className="product-list">
          {products.map((product) => {
            return (
              <section className="product" key={product.id}>
                <div className="product-img">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="product-desc">
                  <p>{product.name}</p>
                  <div>$ {product.price}</div>
                  <button
                    onClick={() => addProductHandler(product)}
                    className="btn primary"
                  >
                    {checkInCart(cart, product) ? "In Cart" : "Add to cart"}
                  </button>
                </div>
              </section>
            );
          })}
        </div>
      </main>
    </Layout>
  );
};

export default HomePage;
