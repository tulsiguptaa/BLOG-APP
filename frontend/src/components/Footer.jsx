import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-left">
                    <span>&copy; {new Date().getFullYear()} DevDiary. All rights reserved.</span>
                    <div className="footer-social">
                        <a href="https://github.com/" className="footer-social-icon" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.203 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .267.18.579.688.481C19.138 20.203 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" /></svg>
                        </a>
                        <a href="https://twitter.com/" className="footer-social-icon" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 5.924c-.793.352-1.645.59-2.54.698a4.48 4.48 0 0 0 1.963-2.475 8.94 8.94 0 0 1-2.828 1.082A4.48 4.48 0 0 0 16.11 4c-2.488 0-4.507 2.02-4.507 4.51 0 .353.04.697.116 1.026-3.747-.188-7.07-1.983-9.293-4.713a4.49 4.49 0 0 0-.61 2.27c0 1.566.797 2.948 2.01 3.758-.74-.023-1.436-.227-2.045-.567v.057c0 2.188 1.556 4.014 3.624 4.43-.38.104-.78.16-1.194.16-.292 0-.573-.028-.849-.08.574 1.792 2.24 3.096 4.213 3.13A8.98 8.98 0 0 1 2 19.54a12.67 12.67 0 0 0 6.86 2.01c8.233 0 12.747-6.823 12.747-12.747 0-.194-.004-.388-.013-.58A9.14 9.14 0 0 0 24 4.59a8.98 8.98 0 0 1-2.54.698z" /></svg>
                        </a>
                        <a href="https://linkedin.com/" className="footer-social-icon" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595z" /></svg>
                        </a>
                    </div>
                </div>
                <div className="footer-links">
                    <Link to="/" className="footer-link">Home</Link>
                    <Link to="/blog" className="footer-link">Blog</Link>
                    <Link to="/about" className="footer-link">About</Link>
                    <a href="mailto:contact@devdiary.com" className="footer-link">Contact</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
