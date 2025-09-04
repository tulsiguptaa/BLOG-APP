import React, { useState } from "react";
import "./Login.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            setError("Please enter both username and password.");
            return;
        }
        setError("");
        setSuccess("");
        setLoading(true);
        try {
            const res = await fetch("http://localhost:5000/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.error || "Login failed.");
            } else {
                localStorage.setItem("token", data.token);
                const decoded = jwtDecode(data.token);
                localStorage.setItem("user_id", decoded.sub);
                setSuccess("Login successful!");
                navigate("/");
            }
        } catch (err) {
            setError("Login failed. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="login-container">
                <h2 className="login-title">Login</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="login-field">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="login-input"
                            required
                        />
                    </div>
                    <div className="login-field">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="login-input"
                            required
                        />
                    </div>
                    {error && <div className="login-error">{error}</div>}
                    {success && <div className="login-success">{success}</div>}
                    <button type="submit" className="login-button" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default Login;
