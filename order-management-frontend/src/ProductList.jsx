import { useEffect, useState } from "react";
import API from "./api";

function ProductList({ addToCart }) {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get("/products/bulk")
      .then(res => {
        setProducts(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mt-5">

      <h2 className="text-center mb-5 fw-bold">
        🛒 Our Products
      </h2>

      <div className="row g-4">

        {products.map(product => (

          <div className="col-lg-4 col-md-6" key={product.id}>

            <div className="card h-100 shadow-sm border rounded-4">

              {/* Product Image */}
              <div className="bg-light d-flex align-items-center justify-content-center border-bottom rounded-top-4"
                style={{ height: "230px" }}>

                <img
                  src={`https://order-management-system-9b64.onrender.com/images/${product.imageName}`}
                  className="img-fluid"
                  alt={product.name}
                  style={{ maxHeight: "100%", objectFit: "contain" }}
                />

              </div>

              <div className="card-body d-flex flex-column">

                {/* Product Name */}
                <h5 className="card-title fw-bold">
                  {product.name}
                </h5>

                {/* Brand */}
                <p className="text-muted mb-1">
                  Brand: {product.brand}
                </p>

                {/* Category */}
                <p className="text-muted mb-1">
                  Category: {product.category}
                </p>

                {/* Price */}
                <p className="fw-bold text-primary fs-5 mb-1">
                  ₹{product.price}
                </p>

                {/* Discount */}
                <p className="text-success mb-1">
                  {product.discount}% OFF
                </p>

                {/* Rating */}
                <p className="mb-2">
                  ⭐ {product.rating}
                </p>

                {/* Stock */}
                {product.stock > 0 ? (
                  <p className="text-success small">
                    In Stock: {product.stock}
                  </p>
                ) : (
                  <p className="text-danger small">
                    Out of Stock
                  </p>
                )}

                {/* Description */}
                <p className="text-secondary small">
                  {product.description}
                </p>

                {/* Add to Cart */}
                <button
                  className="btn btn-warning w-100 fw-semibold shadow-sm rounded-pill py-2"
                  disabled={product.stock === 0}
                  onClick={() => addToCart(product)}
                >
                  <i className="bi bi-cart3 me-2"></i>
                  Add to Cart
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default ProductList;
