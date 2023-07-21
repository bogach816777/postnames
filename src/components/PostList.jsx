// components/PostList.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPosts, deletePost } from '../reducer/store';


const PostList = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const handleDelete = (postId) => {
    dispatch(deletePost(postId));
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
      
    </div>
  );
};

export default PostList;
