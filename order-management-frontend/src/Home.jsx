import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="container mt-5">

            {/* HERO SECTION */}
            <div className="p-5 mb-5 bg-primary bg-gradient text-white rounded-4 shadow">
                <div className="row justify-content-center">
                    <div className="col-lg-8 text-center">
                        <h1 className="display-3 fw-bold mb-4">
                            Order Management System
                        </h1>
                        <p className="lead fs-3 mb-5">
                            Manage products, customers and orders easily.
                        </p>

                        <div className="d-flex justify-content-center gap-3">
                            <Link to="/products" className="btn btn-light btn-lg px-5 py-3 fw-semibold">
                                <i className="bi bi-box-seam me-2"></i>
                                View Products
                            </Link>

                            <Link to="/cart" className="btn btn-outline-light btn-lg px-5 py-3 fw-semibold">
                                <i className="bi bi-cart me-2"></i>
                                View Cart
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* FEATURES SECTION */}
            <div className="row g-4 mb-5">
                <div className="col-md-4">
                    <div className="card h-100 border-0 shadow-sm">
                        <div className="card-body text-center p-5">
                            <div className="mb-4">
                                <div className="bg-primary bg-gradient text-white rounded-circle d-inline-flex align-items-center justify-content-center" 
                                     style={{ width: '80px', height: '80px' }}>
                                    <i className="bi bi-box-seam fs-1"></i>
                                </div>
                            </div>
                            <h4 className="fw-bold mb-3">Products</h4>
                            <p className="text-muted mb-0">
                                Browse all available products with price and stock.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card h-100 border-0 shadow-sm">
                        <div className="card-body text-center p-5">
                            <div className="mb-4">
                                <div className="bg-success bg-gradient text-white rounded-circle d-inline-flex align-items-center justify-content-center" 
                                     style={{ width: '80px', height: '80px' }}>
                                    <i className="bi bi-cart fs-1"></i>
                                </div>
                            </div>
                            <h4 className="fw-bold mb-3">Cart</h4>
                            <p className="text-muted mb-0">
                                Add products to cart and manage quantities.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card h-100 border-0 shadow-sm">
                        <div className="card-body text-center p-5">
                            <div className="mb-4">
                                <div className="bg-warning bg-gradient text-white rounded-circle d-inline-flex align-items-center justify-content-center" 
                                     style={{ width: '80px', height: '80px' }}>
                                    <i className="bi bi-truck fs-1"></i>
                                </div>
                            </div>
                            <h4 className="fw-bold mb-3">Orders</h4>
                            <p className="text-muted mb-0">
                                Place orders and track order history.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* STATS SECTION */}
            <div className="row g-4 mb-5">
                <div className="col-md-4">
                    <div className="bg-white p-4 rounded-4 shadow-sm text-center">
                        <div className="h2 text-primary mb-2">10K+</div>
                        <div className="text-secondary">Products Available</div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="bg-white p-4 rounded-4 shadow-sm text-center">
                        <div className="h2 text-success mb-2">5K+</div>
                        <div className="text-secondary">Happy Customers</div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="bg-white p-4 rounded-4 shadow-sm text-center">
                        <div className="h2 text-warning mb-2">15K+</div>
                        <div className="text-secondary">Orders Delivered</div>
                    </div>
                </div>
            </div>

            {/* CALL TO ACTION SECTION */}
            <div className="bg-light p-5 rounded-4 text-center mb-5">
                <h2 className="fw-bold mb-3">Ready to get started?</h2>
                <p className="lead text-secondary mb-4">Join thousands of satisfied customers today!</p>
                <Link to="/register" className="btn btn-primary btn-lg px-5 py-3">
                    Sign Up Now
                    <i className="bi bi-arrow-right ms-2"></i>
                </Link>
            </div>

            {/* FOOTER */}
            <div className="text-center pt-4 pb-3 border-top">
                <p className="text-secondary mb-2">© 2026 Order Management System. All rights reserved.</p>
                <div className="d-flex justify-content-center gap-3">
                    <a href="#" className="text-decoration-none text-secondary">Privacy Policy</a>
                    <span className="text-secondary">•</span>
                    <a href="#" className="text-decoration-none text-secondary">Terms of Service</a>
                    <span className="text-secondary">•</span>
                    <a href="#" className="text-decoration-none text-secondary">Contact Us</a>
                </div>
            </div>

            {/* Bootstrap Icons CDN */}
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"/>
        </div>
    );
}

export default Home;
