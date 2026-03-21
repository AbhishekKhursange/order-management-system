import { useState } from "react";
import API from "./api";

function LoginForm() {

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        API.post("/customer/login", loginData)
            .then(res => {
                alert("Login Successful!");

                // You can store user info
                localStorage.setItem("user", JSON.stringify(res.data));

            })
            .catch(err => {
                console.error(err);
                alert("Invalid Email or Password");
            });
    };

    return (

        <div className="container mt-5" style={{ maxWidth: "450px" }}>

            <div className="card shadow">

                <div className="card-body">

                    <h3 className="text-center mb-4">User Login</h3>

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={loginData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                value={loginData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button className="btn btn-success w-100">
                            Login
                        </button>

                    </form>

                </div>

            </div>

        </div>

    );
}

export default LoginForm;
