import { useState } from "react";
import API from "./api";

function RegistrationForm() {

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        address: ""
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        API.post("/customer", user)
            .then(res => {
                alert("Registration Successful!");
                setUser({
                    name: "",
                    email: "",
                    password: "",
                    address: ""
                });
            })
            .catch(err => {
                console.error(err);
                alert("Registration Failed");
            });
    };

    return (

        <div className="container mt-5" style={{maxWidth:"500px"}}>

            <div className="card shadow">

                <div className="card-body">

                    <h3 className="text-center mb-4">User Registration</h3>

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <label className="form-label">Full Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={user.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={user.email}
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
                                value={user.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Address</label>
                            <textarea
                                className="form-control"
                                name="address"
                                value={user.address}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button className="btn btn-primary w-100">
                            Register
                        </button>

                    </form>

                </div>

            </div>

        </div>

    );
}

export default RegistrationForm;
