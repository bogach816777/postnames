import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewPost from './NewPost';
const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    try {
      const response = await axios.get('https://rest-api-production-fc73.up.railway.app/api/v1/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`https://rest-api-production-fc73.up.railway.app/api/v1/posts/${postId}`);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handlePostAdded = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  return (
    <div className='post'>
      <h1 className='main-title'>Posts</h1>
      {posts.map((post) => (
        <div className='post-content' key={post.id}>
          <h3 className='post-title'>{post.title}</h3>
          <p className='post-description'>{post.description}</p>
          <p className='post-text'>{post.text}</p>
          <button className='post-button' onClick={() => handleDelete(post.id)}>Remove</button>
        </div>
      ))}
      <NewPost onPostAdded={handlePostAdded} />
    </div>
  );
};

export default PostList;