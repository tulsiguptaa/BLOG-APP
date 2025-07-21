import React from 'react'
import Header from '../components/Header'
import BlogList from '../components/BlogList'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const Blog = () => {
  return (
    <>
    <Navbar/>
      <Header />
      <div style={{ minHeight: '60vh', padding: '2rem 0' }}>
        <BlogList />
        <Newsletter />
      </div>
      <Footer />
    </>
  )
}

export default Blog
