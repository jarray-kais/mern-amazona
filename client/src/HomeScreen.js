import React, { useEffect, useReducer} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logger from "use-reducer-logger";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH REQUEST":
      return { ...state, loading: true };
    case "FETCH SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const HomeScreen = () => {
  //const [products , stProducts]=useState([])
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH REQUEST" });
      try {
        const result = await axios.get("/api/products");
        dispatch({ type: "FETCH SUCCESS", payload: result.data });
      } catch (error) {
        dispatch({ type: "FETCH FAIL", payload: error.message });
      }

      //setProducts(result.data)
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1>Featured products</h1>
      <div className="products">
        {loading ? (
          <div> loading ...</div>
        ) : error ? (
          <div>{error} </div>
        ) : (
          products.map((product) => (
            <div className="product" key={product.slug}>
              <Link to={`/product/${product.slug}`}>
                <img src={product.image} alt={product.name} />
              </Link>
              <div className="product-info">
                <Link to={`/product/${product.slug}`}>
                  <p>{product.name}</p>
                </Link>

                <p>
                  <strong>$ {product.price}</strong>{" "}
                </p>
                <button>Add to cart</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
