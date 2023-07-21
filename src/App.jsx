import { useState } from 'react'
import React from 'react'
import ReactDOM from 'react-dom';
import './App.css'
import PostList from './components/PostList'
import NewPost from './components/NewPost'
import Header from './components/Header';
function App() {
    return (
      
        <div className='container'>
          <Header />
          <PostList />
          <NewPost />
        </div>
     
    );
  };
  
  export default App;