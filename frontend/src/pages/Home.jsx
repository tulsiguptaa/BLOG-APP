import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import './Home.css'

const Home = () => {
  return (
    <>
      <Navbar />
      <section className="home-hero-section">
        <div className="home-hero-content">
          <h1 className="home-hero-title">Welcome to DevDiary!</h1>
          <p className="home-hero-desc">
            Your space to share stories, tutorials, and ideas with a vibrant developer community.
          </p>
          <Link to="/blog" className="home-hero-btn">Explore Blog</Link>
        </div>
      </section>
      <div className="home-divider" aria-hidden="true"></div>
      
      <section className="home-welcome-section">
        <h2 className="home-welcome-title">Why DevDiary?</h2>
        <div className="home-feature-list">
          <div className="home-feature-card">
            <span className="home-feature-icon" role="img" aria-label="Easy Posting">📝</span>
            <h3>Easy Posting</h3>
            <p>Write and share your thoughts in seconds.</p>
          </div>
          <div className="home-feature-card">
            <span className="home-feature-icon" role="img" aria-label="Community">🌐</span>
            <h3>Community</h3>
            <p>Connect with developers and get feedback.</p>
          </div>
          <div className="home-feature-card">
            <span className="home-feature-icon" role="img" aria-label="Secure">🔒</span>
            <h3>Secure</h3>
            <p>Your posts and data are safe and private.</p>
          </div>
        </div>
      </section>
      <section className="home-how-section">
        <h2 className="home-how-title">How it Works</h2>
        <div className="home-how-steps">
          <div className="home-how-step">
            <span className="home-how-icon" role="img" aria-label="Register">🧑‍💻</span>
            <h4>1. Register</h4>
            <p>Create your free account in seconds.</p>
          </div>
          <div className="home-how-step">
            <span className="home-how-icon" role="img" aria-label="Write">✍️</span>
            <h4>2. Write</h4>
            <p>Compose your post with our simple editor.</p>
          </div>
          <div className="home-how-step">
            <span className="home-how-icon" role="img" aria-label="Share">🚀</span>
            <h4>3. Share</h4>
            <p>Publish and reach the community instantly.</p>
          </div>
        </div>
      </section>
      <Newsletter />
      <Footer />
    </>
  )
}

export default Home
