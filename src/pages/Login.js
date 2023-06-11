import axios from "axios";
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { UserContext } from "../context/UserContext";



export default function Login() {
    const [user, setUser] = useState({
        username: "",
        password: "",
    });

    const { username, password } = user;
    const navigate = useNavigate();
    const { userRole, setUserRole } = useContext(UserContext);


    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const logIn = async (e) => {
        e.preventDefault();

        // faceți cererea POST către server pentru autentificare
        await axios
            .get(`http://localhost:8080/user/${username}`)
            .then((response) => {
                // obțineți rolul utilizatorului din răspunsul serverului (response)
                const userRole = response.data.role;

                // setați rolul utilizatorului în context
                setUserRole(userRole);

                // redirecționați utilizatorul în funcție de rolul acestuia
                if (userRole === "ABONAT") {
                    navigate(`/viewbooks?username=${username}`);
                } else if (userRole === "LIBRARIAN") {
                    navigate("/librarian");
                }

            })
            .catch((error) => {
                // gestionați eroarea în cazul în care autentificarea a eșuat
                console.error(error);
            });
    };


    return (
        <>
            <div style={{
                backgroundImage: `url("https://images.unsplash.com/photo-1493957988430-a5f2e15f39a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "100vh",
                backgroundRepeat: "no-repeat" 
            }}>
                <div className="container" style={{ display: 'left', top: '15%', position:"absolute", left:'20%'}}>
                    <div className="row">
                        <h2 className="left" style={{ color: "black", fontWeight: "bold", fontSize: 80, textAlign: 'left', top:"1000px" }}>LOGIN USER</h2>
                    </div>
                    <form onSubmit={logIn}>
                        <div className="mb-3" style={{ textAlign: "left" }}>
                            <label
                                htmlFor="Username"
                                className="form-label"
                                style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}
                            >
                                Username
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter your username"
                                name="username"
                                value={username}
                                onChange={onInputChange}
                                style={{ width: "500px", fontSize: 20 }}
                            />
                        </div>

                        <div className="mb-3" style={{ textAlign: "left" }}>
                            <label
                                htmlFor="Password"
                                className="form-label"
                                style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Enter your password"
                                name="password"
                                value={password}
                                onChange={onInputChange}
                                style={{ width: "500px", fontSize: 20 }}
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-outline-primary"
                            style={{
                                float: "left",
                                color: "black",
                                marginBottom: "5px",
                                display: "block",
                                marginTop: "10px",
                                fontWeight: "bold",
                                width: "110px",
                                height: "40px",
                            }}
                        >
                            LOG IN
                        </button>
                        <Link
                            className="btn btn-outline-primary mx-2"
                            style={{ float: "right" }}
                            to="/register"
                        >
                            Don't have an account? Register!
                        </Link>
                    </form>
                </div>
            </div>
        </>
    );
}


