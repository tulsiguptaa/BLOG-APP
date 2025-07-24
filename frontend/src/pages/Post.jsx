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
    const [comments, setComments] = useState([]);
    const [commentsLoading, setCommentsLoading] = useState(false);
    const [commentsError, setCommentsError] = useState("");
    const [commentUsername, setCommentUsername] = useState("");
    const [commentContent, setCommentContent] = useState("");
    const [commentSubmitting, setCommentSubmitting] = useState(false);
    const [commentSuccess, setCommentSuccess] = useState("");

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
          
            setCommentsLoading(true);
            fetch(`http://localhost:5000/posts/${id}/comments`)
                .then(res => res.json())
                .then(data => setComments(data))
                .catch(() => setCommentsError("Failed to load comments."))
                .finally(() => setCommentsLoading(false));
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

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        setCommentsError("");
        setCommentSuccess("");
        if (!commentContent) {
            setCommentsError("Please enter a comment.");
            return;
        }
        setCommentSubmitting(true);
        try {
            const res = await fetch(`http://localhost:5000/posts/${id}/comments`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: commentUsername, content: commentContent })
            });
            const data = await res.json();
            if (!res.ok) {
                setCommentsError(data.error || "Failed to add comment.");
                setCommentSubmitting(false);
                return;
            }
            setCommentSuccess("Comment added!");
            setCommentUsername("");
            setCommentContent("");
     
            setCommentsLoading(true);
            fetch(`http://localhost:5000/posts/${id}/comments`)
                .then(res => res.json())
                .then(data => setComments(data))
                .catch(() => setCommentsError("Failed to load comments."))
                .finally(() => setCommentsLoading(false));
        } catch (err) {
            setCommentsError(err.message);
        } finally {
            setCommentSubmitting(false);
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
            {id && (
                <div className="login-container comments-section">
                    <h3 style={{ marginBottom: 12 }}>Comments</h3>
                    {commentsLoading ? (
                        <div>Loading comments...</div>
                    ) : commentsError ? (
                        <div className="login-error">{commentsError}</div>
                    ) : comments.length === 0 ? (
                        <div>No comments yet.</div>
                    ) : (
                        <ul style={{ padding: 0, listStyle: "none" }}>
                            {comments.map(c => (
                                <li key={c.id} className="comment-item">
                                    <div className="comment-username">{c.username || "Anonymous"}</div>
                                    <div className="comment-content">{c.content}</div>
                                    <div className="comment-date">{new Date(c.created_at).toLocaleString()}</div>
                                </li>
                            ))}
                        </ul>
                    )}
                    <hr className="comments-divider" />
                    <form className="login-form comment-form" onSubmit={handleCommentSubmit}>
                        <div className="comment-form-title">Add a Comment</div>
                        <div className="login-field">
                            <label htmlFor="comment-username">Name (optional):</label>
                            <input
                                type="text"
                                id="comment-username"
                                value={commentUsername}
                                onChange={e => setCommentUsername(e.target.value)}
                                className="login-input"
                                placeholder="Your name (optional)"
                            />
                        </div>
                        <div className="login-field">
                            <label htmlFor="comment-content" className="login-comment">Comment:</label>
                            <textarea
                                id="comment-content"
                                value={commentContent}
                                onChange={e => setCommentContent(e.target.value)}
                                className="login-input"
                                rows={3}
                                required
                                style={{ resize: "vertical", minHeight: 60 }}
                            />
                        </div>
                        {commentsError && <div className="login-error">{commentsError}</div>}
                        {commentSuccess && <div className="login-error">{commentSuccess}</div>}
                        <button type="submit" className="login-button" disabled={commentSubmitting}>
                            {commentSubmitting ? "Posting..." : "Add Comment"}
                        </button>
                    </form>
                </div>
            )}
        </>
    );
};

export default Post;
