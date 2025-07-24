import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Login.css";

const Post = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        if (id) {
            setLoading(true);
            fetch(`http://localhost:5000/posts/${id}`)
                .then(res => res.json())
                .then(data => {
                    setTitle(data.title || "");
                    setContent(data.content || "");
                })
                .catch(() => setError("Failed to load post."))
                .finally(() => setLoading(false));
        }
    }, [id]);

    const getToken = () => localStorage.getItem('token');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        if (!title || !content) {
            setError("Please fill in all fields.");
            return;
        }
        const token = getToken();
        if (!token) {
            setError("You must be logged in to post.");
            return;
        }
        setLoading(true);
        try {
            const method = id ? "PUT" : "POST";
            const url = id
                ? `http://localhost:5000/posts/${id}`
                : "http://localhost:5000/posts/";
            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ title, content })
            });
            const data = await res.json().catch(() => ({}));
            console.log("Response status:", res.status);
            console.log("Response data:", data);

            if (!res.ok) {
                if (res.status === 401) {
                    setError("Session expired. Please log in again.");
                    localStorage.removeItem('token'); 
                    setTimeout(() => navigate("/login"), 1500);
                } else {
                    setError(data.error || "Failed to save post.");
                }
                setLoading(false);
                return;
            }
            setSuccess(id ? "Post updated!" : "Post created!");
            setTimeout(() => navigate("/blog"), 1200);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!id) return;
        if (!window.confirm("Are you sure you want to delete this post?")) return;
        const token = getToken();
        if (!token) {
            setError("You must be logged in to delete posts.");
            return;
        }
        setLoading(true);
        setError("");
        setSuccess("");
        try {
            const res = await fetch(`http://localhost:5000/posts/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (!res.ok) throw new Error("Failed to delete post.");
            setSuccess("Post deleted.");
            setTimeout(() => navigate("/blog"), 1200);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="login-container">
                <h2 className="login-title">{id ? "Edit Post" : "Create Post"}</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="login-field">
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            className="login-input"
                            required
                        />
                    </div>
                    <div className="login-field">
                        <label htmlFor="content">Content:</label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={e => setContent(e.target.value)}
                            className="login-input"
                            rows={8}
                            required
                            style={{ resize: "vertical", minHeight: 120 }}
                        />
                    </div>
                    {error && <div className="login-error">{error}</div>}
                    {success && <div className="login-error" style={{ color: '#61dafb', background: '#23283a', border: '1px solid #61dafb' }}>{success}</div>}
                    <button type="submit" className="login-button" disabled={loading}>
                        {loading ? (id ? "Saving..." : "Posting...") : (id ? "Save Changes" : "Post")}
                    </button>
                    {id && (
                        <button
                            type="button"
                            className="login-button"
                            style={{ marginTop: 12, background: '#e74c3c', color: '#fff' }}
                            onClick={handleDelete}
                            disabled={loading}
                        >
                            {loading ? "Deleting..." : "Delete Post"}
                        </button>
                    )}
                </form>
            </div>
            <Footer />
        </>
    );
};

export default Post;
