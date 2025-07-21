import React from 'react'
import { Link } from 'react-router-dom'
import './BlogList.css'

const Blogcard = ({ post }) => {
    return (
        <Link to={`/post/${post.id}`} className="bloglist-post">
            <h2 className="bloglist-title">{post.title}</h2>
            <p className="bloglist-excerpt">{post.excerpt || post.content.slice(0, 120) + '...'}</p>
            <div className="bloglist-meta">
                <span>By {post.author || 'Unknown'}</span>
                <span>{new Date(post.created_at).toLocaleDateString()}</span>
            </div>
        </Link>
    )
}

export default Blogcard
