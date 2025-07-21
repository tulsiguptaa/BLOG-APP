import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './BlogList.css'
import Blogcard from './Blogcard';

const BlogList = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('http://localhost:5000/posts') // Adjust URL as needed
        if (!res.ok) throw new Error('Failed to fetch posts')
        const data = await res.json()
        setPosts(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  if (loading) return <div className="bloglist-loading">Loading posts...</div>
  if (error) return <div className="bloglist-error">{error}</div>

  return (
    <div className="bloglist-container">
      {posts.length === 0 ? (
        <div className="bloglist-empty">No posts yet.</div>
      ) : (
        posts.map(post => <Blogcard key={post.id} post={post} />)
      )}
    </div>
  )
}

export default BlogList
