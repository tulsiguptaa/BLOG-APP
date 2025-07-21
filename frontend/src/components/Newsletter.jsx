import React, { useState } from 'react';
import './Newsletter.css';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            setSubmitted(true);
            setEmail('');
            setTimeout(() => setSubmitted(false), 3000);
        }
    };

    return (
        <div className="newsletter-container">
            <h3 className="newsletter-title">Subscribe to our Newsletter</h3>
            <p className="newsletter-desc">Get the latest posts and updates delivered to your inbox.</p>
            <form className="newsletter-form" onSubmit={handleSubmit}>
                <input
                    type="email"
                    className="newsletter-input"
                    placeholder="Enter your email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <button className="newsletter-btn" type="submit">Subscribe</button>
            </form>
            {submitted && <div className="newsletter-success">Thank you for subscribing!</div>}
        </div>
    );
};

export default Newsletter;
