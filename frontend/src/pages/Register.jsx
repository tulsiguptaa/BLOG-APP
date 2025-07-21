import React, { useState } from "react";
import "./Login.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username || !email || !password || !confirmPassword) {
            setError("Please fill in all fields.");
            setSuccess("");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            setSuccess("");
            return;
        }
        setError("");
        setSuccess("");
        try {
            const res = await fetch("http://localhost:5000/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password })
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.error || "Registration failed.");
                setSuccess("");
            } else {
                setSuccess("Registration successful! You can now log in.");
                setError("");
            }
        } catch (err) {
            setError("Registration failed. Please try again later.");
            setSuccess("");
        }
    };

    return (
        <>
            <Navbar />
            <div className="login-container">
                <h2 className="login-title">Register</h2>
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
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                    <div className="login-field">
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="login-input"
                            required
                        />
                    </div>
                    {error && <div className="login-error">{error}</div>}
                    {success && <div className="login-error" style={{ color: '#61dafb', background: '#23283a', border: '1px solid #61dafb' }}>{success}</div>}
                    <button type="submit" className="login-button">Register</button>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default Register;
