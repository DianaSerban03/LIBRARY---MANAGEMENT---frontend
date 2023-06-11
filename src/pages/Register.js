import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
    let navigate = useNavigate();

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        phoneNumber: "",
        password:""
    });

    const { firstName,
        lastName,
        username,
        email,
        phoneNumber,
        password } = user;

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const signUp = async (e) => {
        e.preventDefault();
        const newUser = { ...user, role: "ABONAT" };
        await axios.post("http://localhost:8080/user", newUser);
        navigate("/");
    };


    return (
        <>
            <div style={{
                backgroundImage: `url("https://img.freepik.com/premium-photo/book-background-open-book-table-university-home-desk-school-library_90380-2789.jpg?size=626&ext=jpg")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "100vh",
                backgroundRepeat: "no-repeat"
            }}>
                <div className="container" style={{ display: 'left', top: '5%', position: "absolute", left: '35%' }}>
                    <div className="row">
                        <h2 className="left" style={{ color: "black", fontWeight: "bold", fontSize: 80, textAlign: 'left', top: "1000px" }}>SIGN UP</h2>
                    </div>
                    <form onSubmit={signUp}>

                        <div className="mb-3" style={{ textAlign: 'left' }}>
                            <label htmlFor="firstName" className="form-label" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                                First Name
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your first name"
                                name="firstName"
                                value={firstName}
                                onChange={(e) => onInputChange(e)}
                                style={{ width: "500px", fontSize: 20 }}
                            />
                        </div>


                        <div className="mb-3" style={{ textAlign: 'left' }}>
                            <label htmlFor="lastName" className="form-label" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                                Last Name
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your password"
                                name="lastName"
                                value={lastName}
                                onChange={(e) => onInputChange(e)}
                                style={{ width: "500px", fontSize: 20 }} // Adjust the width value as needed
                            />
                        </div>
                        <div className="mb-3" style={{ textAlign: 'left' }}>
                            <label htmlFor="email" className="form-label" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                                Email
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your email"
                                name="email"
                                value={email}
                                onChange={(e) => onInputChange(e)}
                                style={{ width: "500px", fontSize: 20 }} // Adjust the width value as needed
                            />
                        </div>
                        <div className="mb-3" style={{ textAlign: 'left' }}>
                            <label htmlFor="phoneNumber" className="form-label" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                                Phone Number
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your email"
                                name="phoneNumber"
                                value={phoneNumber}
                                onChange={(e) => onInputChange(e)}
                                style={{ width: "500px", fontSize: 20 }} // Adjust the width value as needed
                            />
                        </div>
                        <div className="mb-3" style={{ textAlign: 'left' }}>
                            <label htmlFor="Username" className="form-label" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                                Username
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your username"
                                name="username"
                                value={username}
                                onChange={(e) => onInputChange(e)}
                                style={{ width: "500px", fontSize: 20 }}
                            />
                        </div>


                        <div className="mb-3" style={{ textAlign: 'left' }}>
                            <label htmlFor="Password" className="form-label" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                                Password
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your password"
                                name="password"
                                value={password}
                                onChange={(e) => onInputChange(e)}
                                style={{ width: "500px", fontSize: 20 }} // Adjust the width value as needed
                            />
                        </div>

                        <button type="signup" className="btn btn-outline-primary" style={{
                            float: 'left', color: 'black', marginBottom: '5px', display: 'block', marginTop: '10px', fontWeight: 'bold', width: '110px', height: '40px'}}>
                            SIGN UP!
                        </button>
                        <Link
                            className="btn btn-outline-primary mx-2" style={{ float: 'right' }}
                            to="/login">
                            Back to login!
                        </Link>
                    </form>
                </div>
            </div>
        </>
    );
}