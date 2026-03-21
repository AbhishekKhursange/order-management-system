import { useState } from "react";
import API from "./api";

function UploadProduct() {

  const [product, setProduct] = useState({
    name: "",
    brand: "",
    price: "",
    discount: "",
    stock: "",
    category: "",
    description: "",
    rating: ""
  });

  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // ✅ ASYNC FUNCTION
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(product).forEach(key => {
      formData.append(key, product[key]);
    });
    formData.append("file", file);

    try {

      await API.post("/products/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      alert("Product Uploaded Successfully");

      // reset form
      setProduct({
        name: "",
        brand: "",
        price: "",
        discount: "",
        stock: "",
        category: "",
        description: "",
        rating: ""
      });

      setFile(null);

    } catch (err) {
      console.error(err);
      alert("Upload Failed");
    }

  };

  return (

    <div className="container mt-5">

      <div className="row justify-content-center">

        <div className="col-lg-8 col-md-10">

          <div className="card shadow-lg border-0">

            <div className="card-header bg-primary text-white text-center">
              <h3>Add New Product</h3>
              <small>Fill product details below</small>
            </div>

            <div className="card-body p-4">

              <form onSubmit={handleSubmit}>

                <div className="row">

                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Product Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={product.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Brand</label>
                    <input
                      type="text"
                      className="form-control"
                      name="brand"
                      value={product.brand}
                      onChange={handleChange}
                      required
                    />
                  </div>

                </div>

                <div className="row">

                  <div className="col-md-4 mb-3">
                    <label className="form-label fw-bold">Price</label>
                    <input
                      type="number"
                      className="form-control"
                      name="price"
                      value={product.price}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label fw-bold">Discount %</label>
                    <input
                      type="number"
                      className="form-control"
                      name="discount"
                      value={product.discount}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label fw-bold">Stock</label>
                    <input
                      type="number"
                      className="form-control"
                      name="stock"
                      value={product.stock}
                      onChange={handleChange}
                      required
                    />
                  </div>

                </div>

                <div className="row">

                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Category</label>
                    <input
                      type="text"
                      className="form-control"
                      name="category"
                      value={product.category}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Rating</label>
                    <input
                      type="number"
                      step="0.1"
                      className="form-control"
                      name="rating"
                      value={product.rating}
                      onChange={handleChange}
                    />
                  </div>

                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Product Description</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold">Product Image</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={handleFileChange}
                    required
                  />
                </div>

                <button className="btn btn-success w-100 fw-bold">
                  Upload Product
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}

export default UploadProduct;
